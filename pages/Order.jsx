import React, { useEffect, useState } from "react";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import "./Order.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Alerts from "../src/components/Alerts/Alerts";
const Order = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [category, setCategory] = useState("");
  const [attachment, setAttachment] = useState();
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cellError, setCellError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
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
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      setEmailError(false);
    }
  }, [email]);

  useEffect(() => {
    if (cell && cellError) {
      setCellError(false);
    }
  }, [cell]);

  useEffect(() => {
    if (category && categoryError) {
      setCategoryError(false);
    }
  }, [category]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !cell || !category) {
      toast.error("All fields except attachment are required");
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
    } else if (!category) {
      setCategoryError(true);
      return;
    }
    setIsModalOpen(true);
  };

  const createOrder = async () => {
    setIsModalOpen(false);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("cell", cell);
    formData.append("category", category);
    formData.append("attachment", attachment);
    formData.append("description", description);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/orders/add",
        formData,
        config
      );
      console.log(res);
      toast.success("Your order has been placed!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Header />
      <main data-aos="fade-up">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1 style={{ color: "black" }}>Orders</h1>
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
                  <a href="#">Order</a>
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
                          onChange={(event) => setName(event.target.value)}
                          className="form-control"
                          name="name"
                          placeholder="Full Name"
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
                          type="Email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          style={{ border: emailError && "2px solid deeppink" }}
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
                        onChange={(event) => setCell(event.target.value)}
                        className="form-control"
                        name="phone"
                        placeholder="Contact No."
                        style={{ border: cellError && "2px solid deeppink" }}
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
                      <label htmlFor="formGroupExampleInput">Category:</label>
                      <br />
                      <select
                        className="select-menu_style form-control"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        name="category"
                        style={{
                          border: categoryError && "2px solid deeppink",
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
                        <option value="App Store  Optimization">
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
                      {categoryError && (
                        <p style={{ color: "deeppink", paddingTop: "5px" }}>
                          Select a category
                        </p>
                      )}
                    </div>
                    <div
                      className="form-group main_input"
                      style={{ marginTop: "10px" }}
                    >
                      <label htmlFor="formGroupExampleInput2">
                        Attachment (optional) :{" "}
                        <span>(upload only PDF File)</span>
                      </label>
                      <input
                        type="file"
                        onChange={(event) =>
                          setAttachment(event.target.files[0])
                        }
                        name="cv"
                        className="form-control"
                      />
                    </div>
                    <div
                      className="col-md-6 form-group main_input prn"
                      style={{ marginTop: "10px" }}
                    >
                      <label htmlFor="formGroupExampleInput2">
                        Project Description
                      </label>
                      <div className="form-group">
                        <textarea
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                          className="col-md-12 form-control form-group main_input prn"
                          style={{ width: "100%" }}
                          name="description"
                          rows="5"
                          cols="40"
                          maxLength="1000"
                          placeholder="Message"
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
                        <FaPhone />
                      </strong>{" "}
                      +92 320 7545617
                    </li>
                    <li>
                      <strong>
                        <FaPhone />
                      </strong>{" "}
                      +92 300 6521781
                    </li>
                    <li>
                      <strong>
                        <FaEnvelope />
                      </strong>{" "}
                      info@kingitsol.com
                    </li>
                    <li>
                      <strong>
                        <FaEnvelope />
                      </strong>{" "}
                      order@kingitsol.com
                    </li>
                    <li>
                      <strong>
                        <FaEnvelope />
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
        <p>Are you sure you want to submit the order?</p>
        <button onClick={createOrder} className="btn btn-primary">
          Yes
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="btn btn-secondary"
        >
          No
        </button>
      </Modal>
    </>
  );
};

export default Order;
