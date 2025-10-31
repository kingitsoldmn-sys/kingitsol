import React, { useEffect, useState } from "react";
import Header from "../src/components/Header/Header";
import "./Enroll.css";
import graphics from "../src/assets/img/enrollment/graphics.png";
import androidandios from "../src/assets/img/enrollment/androidandios.jpg";
import html from "../src/assets/img/enrollment/html.jpg";
import amazon from "../src/assets/img/enrollment/amazon.jpg";
import msOffice from "../src/assets/img/enrollment/ms-office.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../src/components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Alerts from "../src/components/Alerts/Alerts";
const Enroll = () => {
  const [showAlerts, setShowAlerts] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out",
    });
  }, []);
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

        <div className="container mt-3">
          <div className="row">
            <div className="card-wrapper col-lg-4 col-md-6 col-xs-12">
              <div className="card">
                <div className="card-img-wrapper">
                  <img
                    className="card-img-top"
                    src={html}
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">WEB DEVELOPMENT</h5>
                  <div className="card-content">
                    <div className="card-text">
                      <ul>
                        <li>Basic of Web Development</li>
                        <li>Basic and Advance Level HTML or CSS</li>
                        <li>Basic and Advace MySql and PHP</li>
                        <li>Angular JS for Web Development</li>
                        <li>Laravel Web Freamwork</li>
                        <li>Domain and Hosting</li>
                      </ul>
                    </div>
                    <a
                      onClick={(event) => {
                        event.preventDefault();
                        navigate("/add-enrollment", {
                          state: { course: "Web Development" },
                        });
                      }}
                      className="btn btn-primary"
                    >
                      Enroll Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-wrapper col-lg-4 col-md-6 col-xs-12">
              <div className="card">
                <div className="card-img-wrapper">
                  <img
                    className="card-img-top"
                    src={androidandios}
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">ANDROID / IOS DEVELOPMENT</h5>
                  <div className="card-text">
                    <ul className="">
                      <li>Overview of Java & OOP Concepts</li>
                      <li>App GUI designing</li>
                      <li>Integrate Data Storage Database</li>
                      <li>Usage of networking in Apps</li>
                      <li>Upload Apps to playstore, marketing</li>
                      <li>Generating Money from App</li>
                    </ul>
                  </div>
                  <a
                    onClick={(event) => {
                      event.preventDefault();
                      navigate("/add-enrollment", {
                        state: { course: "Android/IOS developement" },
                      });
                    }}
                    className="btn btn-primary"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>

            <div className="card-wrapper col-lg-4 col-md-6 col-xs-12">
              <div className="card">
                <div className="card-img-wrapper">
                  <img
                    className="card-img-top"
                    src={graphics}
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">GRAPHIC DESIGNING</h5>
                  <div className="card-text">
                    <ul className="">
                      <li>
                        WorkFlow and Usage of Adobe Photoshop & Illustrator
                      </li>
                      <li>
                        Principles of Design Elements of design and colors.
                      </li>
                      <li>
                        Branding, Brand identity, Layout grid system
                        TypoGraphichy
                      </li>
                      <li>All type of Logos and Illustratar Design Ideas</li>
                    </ul>
                  </div>
                  <a
                    onClick={(event) => {
                      event.preventDefault();
                      navigate("/add-enrollment", {
                        state: { course: "Graphic Designing" },
                      });
                    }}
                    className="btn btn-primary"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>

            <div className="card-wrapper col-lg-4 col-md-6 col-xs-12">
              <div className="card">
                <div className="card-img-wrapper">
                  <img
                    className="card-img-top"
                    src={amazon}
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">AMAZON VIRTUAL ASSISTANT</h5>
                  <div className="card-text">
                    <ul className="">
                      <li>Product hunting</li>
                      <li>Product sourcing</li>
                      <li>Listing optimization</li>
                      <li>Ranking & Launching</li>
                      <li>PPC Advertisement management</li>
                      <li>Seller central management</li>
                    </ul>
                  </div>
                  <a
                    onClick={(event) => {
                      event.preventDefault();
                      navigate("/add-enrollment", {
                        state: { course: "Amazon Virtual Assistant" },
                      });
                    }}
                    className="btn btn-primary"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
            <div className="card-wrapper col-lg-4 col-md-6 col-xs-12">
              <div className="card">
                <div className="card-img-wrapper">
                  <img
                    className="card-img-top"
                    src={msOffice}
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">MICROSOFT OFFICE</h5>
                  <div className="card-text">
                    <ul className="">
                      <li>Master MS word-powerfull word processing Software</li>
                      <li>
                        Learn to creat Automated Spreadsheet using Ms Excel
                      </li>
                      <li>Creat Presentation using Ms PowerPoint</li>
                    </ul>
                  </div>
                  <a
                    onClick={(event) => {
                      event.preventDefault();
                      navigate("/add-enrollment", {
                        state: { course: "Web Development" },
                      });
                    }}
                    className="btn btn-primary"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Enroll;
