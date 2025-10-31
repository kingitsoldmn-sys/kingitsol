import React, { useState, useEffect } from "react";
import AdminHeader from "../src/components/AdminHeader/AdminHeader";
import AdminFooter from "../src/components/AdminFooter/AdminFooter";
import { FaFileDownload, FaTrash } from "react-icons/fa";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [deleteModal, setDeleteModalOpen] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [add, setAdd] = useState(false);
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/alerts/all").then((res) => {
      console.log(res.data);
      setAlerts(res.data.alerts);
    });
  }, []);

  useEffect(() => {
    if (title && titleError) {
      setTitleError(false);
    }
  }, [title]);

  useEffect(() => {
    if (description && descriptionError) {
      setDescriptionError(false);
    }
  }, [description]);

  useEffect(() => {
    if (category && categoryError) {
      setCategoryError(false);
    }
  }, [category]);
  const removeAlert = (alertId) => {
    setAlertToDelete(alertId);
    setDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    axios
      .delete("http://localhost:3000/alerts/remove/" + alertToDelete)
      .then((res) => {
        let filteredAlerts = alerts.filter((alert) => {
          return alert._id != alertToDelete;
        });
        setAlerts(filteredAlerts);
        console.log("career has been removed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    try {
      if (!title) {
        setTitleError(true);
        return;
      } else if (!description) {
        setDescriptionError(true);
        return;
      } else if (!category) {
        setCategoryError(true);
        return;
      }
      let res = await axios.post(
        "http://localhost:3000/alerts/add",
        {
          title,
          description,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        alerts.unshift(res.data.alert);
        toast.success("Alert has been added!");
        setAdd(false);
        setTitle("");
        setDescription("");
        setCategory("");
      }
    } catch (error) {
      toast.error(error.message);
    }
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
              <h1 style={{ color: "black" }}>Alerts</h1>
              <ol>
                <li>
                  <a href="#">Admin</a>
                </li>
                <li>
                  <a href="#">Alerts</a>
                </li>
              </ol>
            </div>
            {!add && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setAdd(true);
                }}
              >
                Add Alert
              </button>
            )}
          </div>
        </section>
        {/*<!-- Breadcrumbs Section -->*/}

        {/*<!-- Start Table -->*/}
        {!add && (
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
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {alerts &&
                  alerts.map((alert, index) => {
                    return (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{alert.title}</td>
                        <td>{alert.description}</td>
                        <td>{alert.category}</td>
                        <td>
                          {new Date(alert.createdAt).toLocaleDateString()}
                        </td>
                        <td className="text-center">
                          <a className="text-danger">
                            <i className="fas fa-trash">
                              <FaTrash
                                onClick={(event, alertId = alert._id) => {
                                  event.preventDefault();
                                  removeAlert(alert._id);
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
        )}
        {add && (
          <div
            className="col-md-8"
            style={{ marginRight: "auto", marginLeft: "auto" }}
          >
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row">
                <div className="col-md-6 form-group main_input pln">
                  <label htmlFor="formGroupExampleInput">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="form-control"
                    name="title"
                    placeholder="Enter a title"
                    style={{ border: titleError && "2px solid deeppink" }}
                  />
                  {titleError && (
                    <p style={{ color: "deeppink", paddingTop: "5px" }}>
                      Enter a title
                    </p>
                  )}
                </div>
              </div>
              <div
                className="col-md-6 form-group main_input prn"
                style={{ marginTop: "10px" }}
              >
                <label htmlFor="formGroupExampleInput2">Description</label>
                <div className="form-group">
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="col-md-12 form-control form-group main_input prn"
                    style={{
                      width: "100%",
                      border: descriptionError && "2px solid deeppink",
                    }}
                    name="description"
                    rows="5"
                    cols="40"
                    maxLength="1000"
                    placeholder="Description"
                  ></textarea>
                  {descriptionError && (
                    <p style={{ color: "deeppink" }}>Enter a description</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group main_input pln">
                  <label htmlFor="formGroupExampleInput">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="form-control"
                    name="title"
                    placeholder="Enter a title"
                    style={{ border: categoryError && "2px solid deeppink" }}
                  />
                  {categoryError && (
                    <p style={{ color: "deeppink", paddingTop: "5px" }}>
                      Enter a category
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-12 mt-20" style={{ marginTop: "20px" }}>
                <div
                  className="mb10 g-recaptcha mtb"
                  data-sitekey="6LczYccUAAAAAOk9FLu8n5AWkzpLiJwtP15F5pwS"
                ></div>
                <button
                  type="button"
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        <ToastContainer />

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

export default Alerts;
