import React, { useState, useEffect } from "react";
import AdminHeader from "../src/components/AdminHeader/AdminHeader";
import AdminFooter from "../src/components/AdminFooter/AdminFooter";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; // Import Modal component

const EnrollDetails = () => {
  let navigate = useNavigate();
  const [enrolls, setEnrolls] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [enrollToDelete, setEnrollToDelete] = useState(null); // State for the enroll to delete

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/enrolls/all")
      .then((res) => {
        console.log(res.data);
        setEnrolls(res.data.enrollments);
      });
  }, []);

  const removeEnroll = (enrollId) => {
    // Set the enroll to delete and open the modal
    setEnrollToDelete(enrollId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Close the modal
    setIsDeleteModalOpen(false);

    // Perform the actual delete operation
    axios
      .delete("http://localhost:3000/enrolls/remove", { enrollId: enrollToDelete })
      .then((res) => {
        let filteredEnrolls = enrolls.filter((enroll) => {
          return enroll._id !== enrollToDelete;
        });
        setEnrolls(filteredEnrolls);
        console.log("enrollment has been removed");
      })
      .catch((err) => {
        console.log(err);
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
              <h1 style={{ color: "black" }}>Enrolls</h1>
              <ol>
                <li>
                  <a
                    onClick={(event) => {
                      event.preventDefault();
                      navigate("/career");
                    }}
                  >
                    Admin
                  </a>
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
                <th>Profile Image</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Guardian Name</th>
                <th>Guardian Phone</th>
                <th>CNIC</th>
                <th>EMAIl</th>
                <th>Course Title</th>
                <th>DOB</th>
                <th>Education</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {enrolls &&
                enrolls.map((enroll, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>
                        <img src={`http://localhost:3000/images/${enroll.profileImage}`} alt="user image" style={{height:'50px',width:'50px',objectFit:'fill'}}/>
                      </td>
                      <td>{enroll.name}</td>
                      <td>{enroll.cell}</td>
                      <td>{enroll.guardianName}</td>
                      <td>{enroll.guardianCell}</td>
                      <td>{enroll.cnic}</td>
                      <td>{enroll.email}</td>
                      <td>{enroll.course}</td>
                      <td>{enroll.dob}</td>
                      <td>{enroll.education}</td>
                      <td>{enroll.gender}</td>
                      <td>{enroll.address}</td>
                      <td>{new Date(enroll.date).toDateString()}</td>
                      <td>{enroll.time}</td>
                      <td className="text-center">
                        <a className="text-danger">
                          <i
                            className="fas fa-trash"
                            onClick={(event) => {
                              removeEnroll(enroll._id);
                            }}
                          >
                            <FaTrash />
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
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          contentLabel="Confirm Delete"
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
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this enrollment?</p>
          <div style={{display:'flex', alignItems:'center',justifyContent:'space-between',height:'50px'}}>
          <button onClick={() =>{
            confirmDelete();
            setDeleteModalOpen(true);
            }} className="btn" style={{backgroundColor:'red',color:'white'}}>
            Yes
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
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

export default EnrollDetails;



 