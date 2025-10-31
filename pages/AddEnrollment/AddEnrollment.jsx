import React, { useEffect, useState } from "react";
import Header from "../../src/components/Header/Header";
import "./AddEnrollment.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Footer from "../../src/components/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import ProfileImageUpload from "../../src/components/ProfileImageUpload/ProfileImageUpload";
import { setSeconds } from "date-fns";
import { subYears } from "date-fns"; // Import subYears for date calculations
import Alerts from "../../src/components/Alerts/Alerts";

const AddEnrollment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [cell, setCell] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianCell, setGuardianCell] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [classType, setClassType] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cnicError, setCnicError] = useState(false);
  const [cellError, setCellError] = useState(false);
  const [guardianNameError, setGuardianNameError] = useState(false);
  const [guardianCellError, setGuardianCellError] = useState(false);
  const [educationError, setEducationError] = useState(false);
  const [classTypeError, setClassTypeError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dobError, setDobError] = useState(false); // State for DOB error
  const [imagePath, setImagePath] = useState(null);
  const [detailsModel, setDetailsModelOpen] = useState(false);
  const [showAlerts, setShowAlerts ] = useState(false);
  const [reset,setReset] = useState(false);
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  useEffect(() =>{
    if(name && nameError) {
      setNameError(false);
    }
  },[name]);

  useEffect(() =>{
    if(email && emailError) {
      setEmailError(false);
    }
  },[email]);

  useEffect(() =>{
    if(cnic && cnicError) {
      setCnicError(false);
    }
  },[cnic]);

  useEffect(() =>{
    if(cell && cellError) {
      setCellError(false);
    }
  },[cell]);

  useEffect(() =>{
    if(guardianName && guardianNameError) {
      setGuardianNameError(false);
    }
  },[guardianName]);

  useEffect(() =>{
    if(guardianCell && guardianCellError) {
      setGuardianCellError(false);
    }
  },[guardianCell]);

  useEffect(() =>{
    if(education && educationError){
      setEducationError(false);
    }
  },[educationError]);

  useEffect(() =>{
    if(classType && classTypeError) {
      setClassTypeError(false);
    }
  },[classType]);

  useEffect(() =>{
    if(address && addressError) {
      setAddressError(false);
    }
  },[address]);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      toast.error("All fields are required!");
      return;
    }
    setDetailsModelOpen(true);
  };

  const validateForm = () => {
    if (
      !name ||
      !email ||
      !cnic ||
      !cell ||
      !guardianName ||
      !guardianCell ||
      !dob ||
      !gender ||
      !education ||
      !classType ||
      !address
    ) {
     if(!name) {
      setNameError(true);
      return false;
     } else if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      return false;
     } else if(!cnic || !/^\d{13}$/.test(cnic)) {
      setCnicError(true);
      return false;
     } else if(!cell || !/^\d{10,11}$/.test(cell)) {
      setCellError(true);
      return false;
     } else if(!guardianName) {
      setGuardianNameError(true);
      return false;
     }else if(!guardianCell  || !/^\d{10,11}$/.test(cell)) {
      setGuardianCellError(true);
      return false;
     } else if(!education) {
      setEducationError(true);
      return false;
     } else if(!classType) {
      setClassTypeError(true);
      return false;
     } else if(!address) {
      setAddressError(true);
      return false;
     }
    }
    // DOB validation (must be at least 15 years ago)
    const fifteenYearsAgo = subYears(new Date(), 15);
    if (new Date(dob) > fifteenYearsAgo) {
      setDobError(true);
      toast.error("Date of birth must be at least 15 years ago.");
      return false;
    } else {
      setDobError(false);
    }
    return true;
  };

  const resetData = () => {
    setName("");
    setEmail("");
    setCnic("");
    setCell("");
    setGuardianName("");
    setGuardianCell("");
    setDob("");
    setGender("");
    setEducation("");
    setClassType("");
    setAddress("");
    setDobError(false); // Reset DOB error state
    setReset(true);
  };

  const enroll = async () => {
    setDetailsModelOpen(false);
    try {
      let formData = new FormData();
      formData.append("profileImage", image);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("cell", cell);
      formData.append("cnic", cnic);
      formData.append("guardianName", guardianName);
      formData.append("guardianCell", guardianCell);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("education", education);
      formData.append("address", address);
      formData.append("classType", classType);
      formData.append("course", location.state.course);
      let response = await axios.post(
        "http://localhost:3000/enrolls/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        toast.success("Congratulations, you are enrolled in this course!");
        resetData(); // Reset form fields after successful submission
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSetImage = (img) => {
    setImage(img);
  };

  return (
    <>
      <Header />
      <main id="main" data-aos="fade-up">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1 style={{ color: "black" }}>Enrollment</h1>
              <ol>
                <li>
                  <a
                    onClick={(event) => {
                      event.preventDefault();
                      navigate("/");
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    onClick={(event) => {
                      event.preventDefault();
                      navigate("/enroll");
                    }}
                  >
                    Enroll Now
                  </a>
                </li>
                <li>
                  <a href="#">{location.state.course}</a>
                </li>
              </ol>
            </div>
          </div>
          <button style={{marginLeft:'20px'}} onClick={() => setShowAlerts(!showAlerts)}>Alerts</button>
          {
            showAlerts && <Alerts />
          }
        </section>

        <section id="portfolio-details" className="portfolio-details">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-8">
                <div className="col-md-8">
                  <form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <ProfileImageUpload onImageSelect={handleSetImage} setImagePath={setImagePath} reset={reset} setReset={setReset}/>
                      <div className="col-md-6 form-group main_input pln">
                        <label htmlFor="formGroupExampleInput">Name</label>
                        <input
                          type="text"
                          onChange={(event) => {
                            event.preventDefault();
                            setName(event.target.value);
                          }}
                          className="form-control"
                          value={name}
                          name="name"
                          placeholder="Full Name"
                          style={{border: nameError && '2px solid deeppink'}}
                        />
                        {
                          nameError && <p style={{color:'deeppink',paddingTop:'5px'}}>Enter your full name</p>
                        }
                      </div>

                      <div className="col-md-6 form-group main_input prn">
                        <label htmlFor="formGroupExampleInput2">Email</label>
                        <input
                          type="Email"
                          onChange={(event) => {
                            event.preventDefault();
                            setEmail(event.target.value);
                          }}
                          value={email}
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          style={{border: emailError &&  '2px solid deeppink'}}
                        />
                        {
                          emailError && <p style={{color:'deeppink',paddingTop:'5px'}}>Enter a valid email address</p>
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-md-6 form-group main_input pln"
                        style={{ marginTop: "18px" }}
                      >
                        <label htmlFor="formGroupExampleInput2">
                          CNIC. (without dashes)
                        </label>
                        <input
                          type="text"
                          onChange={(event) => {
                            event.preventDefault();
                            setCnic(event.target.value);
                          }}
                          value={cnic}
                          maxLength="13"
                          className="form-control"
                          name="cnic"
                          placeholder="3310012345670"
                          style={{border: cnicError && '2px solid deeppink'}}
                        />
                        {
                          cnicError && <p style={{color:'deeppink',paddingTop:'5px'}}>Enter a valid CNIC number</p>
                        }
                      </div>
                      <div
                        className="col-md-6 form-group main_input pln"
                        style={{ marginTop: "18px" }}
                      >
                        <label htmlFor="formGroupExampleInput2">
                          Contact No.
                        </label>
                        <input
                          type="text"
                          onChange={(event) => {
                            event.preventDefault();
                            setCell(event.target.value);
                          }}
                          value={cell}
                          className="form-control"
                          name="phone"
                          placeholder="Contact No."
                          style={{border: cellError && '2px solid deeppink'}}
                        />
                        {
                          cellError && <p style={{color:'deeppink',paddingTop:'5px'}}></p>
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group main_input pln mt-3">
                        <label htmlFor="formGroupExampleInput">
                          Guardian Name
                        </label>
                        <input
                          type="text"
                          onChange={(event) => {
                            event.preventDefault();
                            setGuardianName(event.target.value);
                          }}
                          value={guardianName}
                          className="form-control"
                          name="guardian_name"
                          placeholder="Full Name"
                          style={{border: cellError && '2px solid deeppink'}}
                        />
                        {
                          cellError && <p style={{color:'deeppink',paddingTop:'5px'}}>Enter a valid cell number</p>
                        }
                      </div>

                      <div className="col-md-6 form-group main_input prn mt-3">
                        <label htmlFor="formGroupExampleInput2">
                          Guardian Phone No.
                        </label>
                        <input
                          type="text"
                          onChange={(event) => {
                            event.preventDefault();
                            setGuardianCell(event.target.value);
                          }}
                          value={guardianCell}
                          className="form-control"
                          name="guardian_phone"
                          placeholder="Father Phone No."
                          style={{border: cellError && '2px solid deeppink'}}
                        />
                        {
                          guardianCellError && <p style={{color:'deeppink',paddingTop:'5px'}}>Enter a valid cell number</p>
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group main_input pln mt-3">
                        <label htmlFor="formGroupExampleInput">
                          Date of Birth
                        </label>
                        <input
                          onChange={(event) => {
                            event.preventDefault();
                            setDob(event.target.value);
                          }}
                          value={dob}
                          type="date"
                          className={`form-control ${dobError ? "is-invalid" : ""}`}
                          name="dob"
                          placeholder="date of birth"
                          style={{border: dobError && '2px solid deeppink'}}
                        />
                        {dobError && <p style={{color: dobError && 'deeppink'}}>Enter a valid date of birth</p>}
                      </div>

                      <div className="col-md-6 form-group main_input prn mt-3">
                        <label htmlFor="formGroupExampleInput2">Gender.</label>
                        <div>
                          <input
                            className="form-check-input"
                            onChange={(event) => {
                              event.preventDefault();
                              setGender("male");
                            }}
                            type="radio"
                            name="gender"
                            id="male"
                            style={{
                              marginTop: "12px",
                              marginRight: "5px",
                            }}
                            value="male"
                          />
                          <label
                            className="form-check-label mt-2"
                            htmlFor="male"
                          >
                            Male
                          </label>
                          <input
                            className="form-check-input"
                            onChange={(event) => {
                              event.preventDefault();
                              setGender("female");
                            }}
                            type="radio"
                            name="gender"
                            id="female"
                            style={{
                              margin: "12px",
                              marginRight: "5px",
                            }}
                            value="Female"
                          />
                          <label
                            className="form-check-label mt-2"
                            htmlFor="female"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-12 form-group main_input pln"
                      style={{ marginTop: "18px" }}
                    >
                      <label htmlFor="formGroupExampleInput2">Education.</label>
                      <input
                        type="text"
                        value={education}
                        onChange={(event) => {
                          event.preventDefault();
                          setEducation(event.target.value);
                        }}
                        className="form-control"
                        name="education"
                        placeholder="Your Education."
                        style={{border: educationError && '2px solid deeppink'}}
                      />
                    </div>

                    <div
                      className="col-md-12 form-group main_input prn"
                      style={{ marginTop: "10px" }}
                    >
                      <label htmlFor="formGroupExampleInput">Class Type:</label>
                      <br />
                      <select
                        className="select-menu_style form-control"
                        onChange={(event) => {
                          event.preventDefault();
                          setClassType(event.target.value);
                        }}
                        name="course_type"
                        id=""
                        value={classType}
                        style={{marginLeft:'0px',border: classTypeError && '2px solid deeppink'}}
                      >
                        <option value="">Select One</option>
                        <option value="Online">Online</option>
                        <option value="Physical">Physical</option>
                      </select>
                      {
                        classTypeError && <p style={{color:'deeppink'}}>Select a class type</p>
                      }
                    </div>
                    <div
                      className="col-md-6 form-group main_input prn"
                      style={{ marginTop: "10px" }}
                    ></div>
                    <label htmlFor="formGroupExampleInput2">
                      Complete Address
                    </label>
                    <div className="form-group" style={{paddingTop:'2px'}}>
                      <textarea
                        value={address}
                        onChange={(event) => {
                          event.preventDefault();
                          setAddress(event.target.value);
                        }}
                        className="col-md-12 form-control main_input prn"
                        style={{ width: "100%" ,border: addressError && '2px solid deeppink'}}
                        name="address"
                        rows="3"
                        cols="40"
                        placeholder="Address"
          
                      ></textarea>
                      {
                        addressError && <p style={{color: addressError && 'deeppink',paddingTop:'5px'}}>Enter your permanent address <address></address></p>
                      }
                    </div>
                    <div
                      className="col-md-12 mt-20"
                      style={{ marginTop: "20px" }}
                    >
                      <div
                        className="mb10 g-recaptcha mtb"
                        data-sitekey="6LczYccUAAAAAOk9FLu8n5AWkzpLiJwtP15F5pwS"
                      ></div>
                      <button className="btn btn-primary" onClick={() =>{
                        handleSubmit();
                      }}>Continue</button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="portfolio-info">
                  <h3>Contact information</h3>
                  <p>
                    M9F Block A Miitary Accouts Society College Road Lahore,
                    Pakistan <br />
                    <br />
                  </p>
                  <ul>
                    <strong>
                      <i className="fas fa-phone-alt">
                        <FaPhoneAlt />
                      </i>
                    </strong>{" "}
                    +92 320 7545617
                    <br />
                    <strong>
                      <i className="fas fa-phone-alt">
                        <FaPhoneAlt />
                      </i>
                    </strong>{" "}
                    +92 300 6521781
                    <br />
                    <strong>
                      <i className="fas fa-envelope">
                        <FaEnvelope />
                      </i>
                    </strong>{" "}
                    info@kingitsol.com
                    <br />
                    <strong>
                      <i className="fas fa-envelope">
                        <FaEnvelope />
                      </i>
                    </strong>{" "}
                    order@kingitsol.com
                    <br />
                    <strong>
                      <i className="fas fa-envelope">
                        <FaEnvelope />
                      </i>
                    </strong>{" "}
                    career@kingitsol.com
                    <br />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer />
      <Modal
        isOpen={detailsModel}
        onRequestClose={() => setDetailsModelOpen(false)}
        contentLabel="Confirm Submission"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        {/* <h1>hola</h1> */}
        <div style={{height:'100vh',width:'100vw',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
          <img src={imagePath}  style={{height:120,width:120, objectFit:'fill', borderRadius:'100px'}} />
          <div>
          <h3 style={{paddingTop:'10px',textAlign:'center'}}>Personal Details</h3>
          <p> <span style={{fontWeight:'bold'}}>Name</span> : {name}</p>
          <p> <span style={{fontWeight:'bold'}}>Email</span> : {email}</p>
          <p> <span style={{fontWeight:'bold'}}>CNIC</span> : {cnic}</p>
          <p> <span style={{fontWeight:'bold'}}>Phone Number</span> : {cell}</p>
          <p> <span style={{fontWeight:'bold'}}>Guardian Name</span> : {guardianName}</p>
          <p> <span style={{fontWeight:'bold'}}>Guardian Phone Number</span> : {guardianCell}</p>
          <p> <span style={{fontWeight:'bold'}}>Date of Birth</span> : {dob}</p>
          <p> <span style={{fontWeight:'bold'}}>Gender</span> : {gender}</p>
          <p> <span style={{fontWeight:'bold'}}>Education</span> : {education}</p>
          <p> <span style={{fontWeight:'bold'}}>Class Type</span> : {classType}</p>
          <p> <span style={{fontWeight:'bold'}}>Address</span> : {address}</p>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <button className=" btn" style={{backgroundColor:'red', color:'white'}} onClick={() =>{
              setDetailsModelOpen(false);
            }}>Cancel</button>
            <button className="btn btn-primary" onClick={() =>{
              enroll();
            }}>Submit</button>
          </div>
          </div>
          
        </div>
       </Modal>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Submission"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2>Confirm Submission</h2>
        <p>Are you sure you want to submit the application?</p>
        <div style={{display:'flex',justifyContent:'space-around'}}>
        <button onClick={enroll} className="btn btn-primary">
          Yes
        </button>
        <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
           No
         </button>
        </div>
        
       </Modal>
       <Footer />
     </>
   );
 };

 export default AddEnrollment
