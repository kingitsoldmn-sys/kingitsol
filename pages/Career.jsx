import React, { useEffect, useState, useRef } from "react";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Alerts from "../src/components/Alerts/Alerts";
const Career = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [cv, setCV] = useState();
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cellError, setCellError] = useState(false);
  const [specializationError, setSpecializationError] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const fileInputRef = useRef(null);
  let navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out",
    });
  }, []);
  useEffect(() => {
    if (name && nameError) {
      setNameError(false);
    }
  }, [name]);
  useEffect(() => {
    if (email && emailError) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(email).toLowerCase())) {
        setEmailError(false);
      }
    }
  }, [email]);
  useEffect(() => {
    if (cell && cellError) {
      setCellError(false);
    }
  }, [cell]);
  useEffect(() => {
    if (specialization && specializationError) {
      setSpecializationError(false);
    }
  }, [specialization]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !cell || !specialization) {
      toast.error("All fields are required");
    }
    if (!name) {
      setNameError(true);
      return;
    } else if (!email) {
      setEmailError(true);
      return;
    } else if (!cell || !/^\d{10,11}$/.test(cell)) {
      setCellError(true);
      return;
    } else if (!specialization) {
      setSpecializationError(true);
      return;
    } else {
      setIsModalOpen(true);
    }
  };

  const addCareer = async () => {
    setIsModalOpen(false);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("cell", cell);
    formData.append("specialization", specialization);
    formData.append("cv", cv);
    formData.append("description", description);
    formData.append("filename", cv.name);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      if (cv) {
        const res = await axios.post(
          "http://localhost:3000/careers/add",
          formData,
          config
        );
        console.log(res);
        toast.success("Congratulations, your application has been sent!");
        setName("");
        setEmail("");
        setCell("");
        setSpecialization("");
        setDescription("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Header />
      <main id="main" data-aos="fade-up">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1 style={{ color: "black" }}>Careers</h1>
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
                      navigate("/career");
                    }}
                  >
                    Career
                  </a>
                </li>
              </ol>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ marginLeft: "20px" }}
            onClick={() => setShowAlerts(!showAlerts)}
          >
            Alerts
          </button>
          {showAlerts && <Alerts />}
        </section>

        <section id="portfolio-details" className="portfolio-details">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-8">
                <div className="col-md-8">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row">
                      <div className="col-md-6 form-group main_input pln">
                        <label htmlFor="formGroupExampleInput">Name</label>
                        <input
                          type="text"
                          value={name}
                          className="form-control"
                          name="name"
                          placeholder="Full Name"
                          onChange={(event) => {
                            setName(event.target.value);
                          }}
                          // required
                          style={{ border: nameError && "2px solid deeppink" }}
                        />
                        {nameError && (
                          <p style={{ color: "deeppink", paddingTop: "5px" }}>
                            Enter your full name
                          </p>
                        )}
                      </div>

                      <div className="col-md-6 form-group main_input prn">
                        <label htmlFor="formGroupExampleInput2">Email</label>
                        <input
                          type="email"
                          value={email}
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                          // required
                          style={{ border: emailError && "1px solid deeppink" }}
                        />
                        {emailError && (
                          <p style={{ color: "deeppink", paddingTop: "5px" }}>
                            Enter a valid email address
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      className="col-md-12 form-group main_input pln"
                      style={{ marginTop: "18px" }}
                    >
                      <label htmlFor="formGroupExampleInput2">
                        Contact No.
                      </label>
                      <input
                        type="text"
                        value={cell}
                        className="form-control"
                        name="phone"
                        placeholder="Contact No."
                        onChange={(event) => {
                          setCell(event.target.value);
                        }}
                        // required
                        style={{ border: cellError && "1px solid deeppink" }}
                      />
                      {cellError && (
                        <p style={{ color: "deeppink", paddingTop: "5px" }}>
                          Enter a valid phone number
                        </p>
                      )}
                    </div>

                    <div
                      className="col-md-12 form-group main_input prn"
                      style={{ marginTop: "10px" }}
                    >
                      <label htmlFor="formGroupExampleInput">
                        Specialization:
                      </label>
                      <br />
                      <select
                        className="select-menu_style form-control"
                        value={specialization}
                        onChange={(event) => {
                          setSpecialization(event.target.value);
                        }}
                        name="specialization"
                        // required
                        style={{
                          border: specializationError && "1px solid deeppink",
                        }}
                      >
                        <option value="">Select One</option>
                        <option value="Web Development">
                          Web Development (MERN Stack)
                        </option>
                        <option value="Android Development">
                          Android Development
                        </option>
                        <option value="iOS Development">iOS Development</option>
                        <option value="Flutter Development">
                          Flutter Development
                        </option>
                        <option value="React Development">
                          React Development
                        </option>
                        <option value="React Native Development">
                          React Native Development
                        </option>
                        <option value="NodeJs Development">
                          NodeJs Development
                        </option>
                        <option value="Game Developement">
                          Game Developement
                        </option>
                        <option value="Digital Marketing">
                          Digital Marketing
                        </option>
                        <option value="Search Engine Optimization">
                          Search Engine Optimization
                        </option>
                        <option value="App Store Optimization">
                          App Store Optimization
                        </option>
                        <option value="Creative Writing">
                          Creative Writing
                        </option>
                        <option value="Graphic Designer">
                          Graphic Designer
                        </option>
                        <option value="Video Editor">Video Editor</option>
                        <option value="Youtube Studio Expert">
                          Youtube Studio Expert
                        </option>
                        <option value="Quality Assurance">
                          Quality Assurance
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {specializationError && (
                      <p style={{ color: "deeppink" }}>
                        Select your specialization
                      </p>
                    )}
                    <div
                      className="form-group main_input"
                      style={{ marginTop: "10px" }}
                    >
                      <label htmlFor="formGroupExampleInput2">
                        Upload CV : <span>(upload only PDF File)</span>
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(event) => {
                          event.preventDefault();
                          if (event.target.files.length > 0) {
                            setCV(event.target.files[0]);
                          }
                        }}
                        name="cv"
                        accept="application/pdf"
                        className="form-control"
                      />
                    </div>

                    <div
                      className="col-md-6 form-group main_input prn"
                      style={{ marginTop: "10px" }}
                    >
                      <label htmlFor="formGroupExampleInput2">
                        Description
                      </label>
                      <div className="form-group">
                        <textarea
                          value={description}
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                          className="col-md-12 form-control main_input prn"
                          style={{ width: "100%" }}
                          name="description"
                          rows="5"
                          placeholder="Message"
                          // required
                        ></textarea>
                      </div>
                    </div>

                    <div
                      className="col-md-12 mt-20"
                      style={{ marginTop: "20px" }}
                    >
                      <div
                        className="mb10 g-recaptcha mtb"
                        data-sitekey="6LczYccUAAAAAOk9FLu8n5AWkzpLiJwtP15F5pwS"
                      ></div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="portfolio-info">
                  <h3>Contact information</h3>
                  <ul>
                    <li>
                      M9F Block A Miitary Accouts Society College Road Lahore,
                      Pakistan
                    </li>
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

        <Footer />
      </main>
      <ToastContainer />
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={addCareer} className="btn btn-primary">
            Yes
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn btn-secondary"
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Career;
