import React, { useState, useEffect } from "react";
import AdminHeader from "../src/components/AdminHeader/AdminHeader";
import AdminFooter from "../src/components/AdminFooter/AdminFooter";
import { FaFileDownload, FaTrash } from "react-icons/fa";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import fileDownload from "js-file-download";
import Modal from "react-modal";
const CareerDetails = () => {
  const [careers, setCareers] = useState([]);
  const [deleteModal, setDeleteModalOpen] = useState(false);
  const [careerToDelete, setCareerToDelete] = useState(null);
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/careers/all").then((res) => {
      console.log(res.data);
      setCareers(res.data.careers);
    });
  }, []);

  const removeCareer = (careerId) => {
    setCareerToDelete(careerId);
    setDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    axios
      .delete("http://localhost:3000/careers/remove", {
        careerId: careerToDelete,
      })
      .then((res) => {
        let filteredCareers = careers.filter((career) => {
          return career._id != careerToDelete;
        });
        setCareers(filteredCareers);
        console.log("career has been removed");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDownload = (filename) => {
    axios
      .get("http://localhost:3000/cvs/" + filename, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <>
      <AdminHeader />
      {/*<!-- End Header -->*/}
      <main id="main" data-aos="fade-up">
        {/*<!-- ======= Breadcrumbs Section ======= -->*/}
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1 style={{ color: "black" }}>Careers</h1>
              <ol>
                <li>
                  <a href="#">Admin</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
              </ol>
            </div>
          </div>
        </section>
        {/*<!-- Breadcrumbs Section -->*/}

        {/*<!-- Start Table -->*/}
        <div className="table-responsive">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing="0"
            style={{ backgroundColor: "white" }}
          >
            <thead>
              <tr>
                <th>Sr.#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialization</th>
                <th>Description</th>
                <th>time</th>
                <th>Cv</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {careers &&
                careers.map((career, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{career.name}</td>
                      <td>{career.email}</td>
                      <td>{career.cell}</td>
                      <td>{career.specialization}</td>
                      <td>{career.description}</td>
                      <td>{career.date + " " + career.time}</td>
                      <td className="text-center">
                        <a className="text-warning">
                          <i className="fas fa-file-download">
                            <FaFileDownload
                              onClick={(event, cv = career.cv) => {
                                console.log(career.cv);
                                event.preventDefault();
                                handleDownload(cv);
                              }}
                            />
                          </i>
                        </a>
                      </td>
                      <td className="text-center">
                        <a className="text-danger">
                          <i className="fas fa-trash">
                            <FaTrash
                              onClick={(event, careerId = career._id) => {
                                event.preventDefault();
                                removeCareer(career._id);
                              }}
                            />
                          </i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={deleteModal}
          onRequestClose={() => setDeleteModalOpen(false)}
          contentLabel="Confirm Delete"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-150%",
              transform: "translate(-50%,-50%)",
            },
          }}
        >
          <h1>Confirm Delete</h1>
          <p>Are you sure you want to delete this application?</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "50px",
            }}
          >
            <button
              onClick={() => {
                confirmDelete();
                setDeleteModalOpen(false);
              }}
              className="btn"
              style={{ backgroundColor: "red", color: "white" }}
            >
              Yes
            </button>
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="btn btn-secondary"
            >
              No
            </button>
          </div>
        </Modal>
      </main>
      <AdminFooter />
    </>
  );
};

export default CareerDetails;
