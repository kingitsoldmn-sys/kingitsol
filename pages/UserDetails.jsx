import React, { useState, useEffect } from "react";
import Header from "../src/components/Header/Header";
import "./UserDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Footer from "../src/components/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import ProfileImageUpload from "../src/components/ProfileImageUpload/ProfileImageUpload";

const UserDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(location.state.name || "");
  const [email, setEmail] = useState(location.state.email || "");
  const [cnic, setCnic] = useState(location.state.cnic || "");
  const [cell, setCell] = useState(location.state.cell || "");
  const [guardianName, setGuardianName] = useState(location.state.guardianName || "");
  const [guardianCell, setGuardianCell] = useState(location.state.guardianCell || "");
  const [dob, setDob] = useState(location.state.dob || "");
  const [gender, setGender] = useState(location.state.gender || "");
  const [education, setEducation] = useState(location.state.education || "");
  const [classType, setClassType] = useState(location.state.classType || "");
  const [address, setAddress] = useState(location.state.address || "");
  const [profileImage, setProfileImage] = useState(location.state.profileImage || null);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out",
    });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [location.pathname]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsModalOpen(true);
  };

  const validateForm = () => {
    alert("hello")
    if (!name || !email || !cnic || !cell || !guardianName || !guardianCell || !dob || !gender || !education || !classType || !address) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const enrollStudent = async () => {
    setIsModalOpen(false);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("cnic", cnic);
    formData.append("cell", cell);
    formData.append("guardianName", guardianName);
    formData.append("guardianCell", guardianCell);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("education", education);
    formData.append("classType", classType);
    formData.append("address", address);
    formData.append("course", location.state.course);
    formData.append("profileImage", profileImage);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.post("http://localhost:3000/enrolls/add", formData, config);
      console.log(res);
      toast.success("You have successfully enrolled!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleImageSelect = (profileImage) => {
    setProfileImage(profileImage);
  };

  return (
    <>
      <Header />
      <main id="main" data-aos="fade-up">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1 style={{ color: "black" }}>User Details</h1>
              <ol>
                <li>
                  <a href="/" onClick={(event) => { event.preventDefault(); navigate("/"); }}>Home</a>
                </li>
                <li>
                  <a href="/enroll" onClick={(event) => { event.preventDefault(); navigate("/enroll"); }}>Enroll Now</a>
                </li>
                <li>
                  <a href="#">{location.state.course}</a>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section id="portfolio-details" className="portfolio-details">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-8">
                <div className="col-md-8">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row">
                      <image src={profileImage} />
                      <ProfileImageUpload onImageSelect={handleImageSelect} />
                      <div className="col-md-6 form-group main_input pln">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          name="name"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                      <div className="col-md-6 form-group main_input prn">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group main_input pln">
                        <label htmlFor="cnic">CNIC (without dashes)</label>
                        <input
                          type="text"
                          value={cnic}
                          onChange={(e) => setCnic(e.target.value)}
                          className="form-control"
                          name="cnic"
                          maxLength="13"
                          placeholder="3310012345670"
                          required
                        />
                      </div>
                      <div className="col-md-6 form-group main_input prn">
                        <label htmlFor="cell">Contact No.</label>
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => setCell(e.target.value)}
                          className="form-control"
                          name="cell"
                          placeholder="Contact No."
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group main_input pln">
                        <label htmlFor="guardianName">Guardian Name</label>
                        <input
                          type="text"
                          value={guardianName}
                          onChange={(e) => setGuardianName(e.target.value)}
                          className="form-control"
                          name="guardianName"
                          placeholder="Guardian Name"
                          required
                        />
                      </div>
                      <div className="col-md-6 form-group main_input prn">
                        <label htmlFor="guardianCell">Guardian Phone No.</label>
                        <input
                          type="text"
                          value={guardianCell}
                          onChange={(e) => setGuardianCell(e.target.value)}
                          className="form-control"
                          name="guardianCell"
                          placeholder="Guardian Phone No."
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group main_input pln">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="form-control"
                          name="dob"
                          placeholder="Date of Birth"
                          required
                        />
                      </div>
                      <div className="col-md-6 form-group main_input prn">
                        <label htmlFor="gender">Gender</label>
                        <div className="d-flex align-items-center" style={{ 
                          display:'flex', columnGap:'10px'
                        }}>
                          <div>
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label htmlFor="male" className="ml-2 p-2">Male</label>
                          </div>
                          <div>
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                            className="ml-3"
                          />
                          <label htmlFor="female" className="ml-2 p-2">Female</label>
                          </div>
                       
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group main_input pln">
                        <label htmlFor="education">Education</label>
                        <input
                          type="text"
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          className="form-control"
                          name="education"
                          placeholder="Education"
                          required
                        />
                      </div>
                      <div className="col-md-6 form-group main_input prn">
                        <label htmlFor="classType">Class Type</label>
                        <select
                          className="form-control"
                          value={classType}
                          onChange={(e) => setClassType(e.target.value)}
                          name="classType"
                          required
                        >
                          <option value="">Select Class Type</option>
                          <option value="Online">Online</option>
                          <option value="Physical">Physical</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group main_input">
                      <label htmlFor="address">Complete Address</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        name="address"
                        rows="3"
                        placeholder="Complete Address"
                      ></textarea>
                    </div>
                    <div className="col-md-12 mt-20">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="portfolio-info">
                  <h3>Contact information</h3>
                  <p>
                    M9F Block A Miitary Accouts Society College Road Lahore,
                    Pakistan
                  </p>
                  <ul>
                    <li>
                      <strong>
                        <i className="fas fa-phone-alt">
                          <FaPhoneAlt />
                        </i>
                      </strong>{" "}
                      +92 320 7545617
                    </li>
                    <li>
                      <strong>
                        <i className="fas fa-phone-alt">
                          <FaPhoneAlt />
                        </i>
                      </strong>{" "}
                      +92 300 6521781
                    </li>
                    <li>
                      <strong>
                        <i className="fas fa-envelope">
                          <FaEnvelope />
                        </i>
                      </strong>{" "}
                      info@kingitsol.com
                    </li>
                    <li>
                      <strong>
                        <i className="fas fa-envelope">
                          <FaEnvelope />
                        </i>
                      </strong>{" "}
                      order@kingitsol.com
                    </li>
                    <li>
                      <strong>
                        <i className="fas fa-envelope">
                          <FaEnvelope />
                        </i>
                      </strong>{" "}
                      career@kingitsol.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ToastContainer />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Enrollment"
        className="modal"
      >
        <h2>Confirm Enrollment</h2>
        <p>Are you sure you want to enroll?</p>
        <div className="buttons">
          <button onClick={enrollStudent} className="btn btn-success">
            Confirm
          </button>
          <button onClick={() => setIsModalOpen(false)} className="btn btn-danger">
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UserDetails;
