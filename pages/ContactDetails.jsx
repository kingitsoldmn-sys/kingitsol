import React, { useEffect, useState } from "react";
import { FaFileDownload, FaTrash } from "react-icons/fa";
import AdminHeader from "../src/components/AdminHeader/AdminHeader";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import AdminFooter from "../src/components/AdminFooter/AdminFooter";
import fileDownload from "js-file-download";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
const ContactDetails = () =>{
    let navigate = useNavigate();

    const [contacts,setContacts] = useState([]);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [deleteModal,setDeleteModalOpen] = useState(false);
    useEffect(() => {
        AOS.init({
          once: true,
          duration: 600,
          easing: 'ease-out'
        });
    
      }, []);

    useEffect(()=>{
        axios.get('http://localhost:3000/contacts/all').then((res)=>{
            console.log(res.data);
            setContacts(res.data.contacts);
        }).catch((err)=>{
            console.log(err)
            alert('got an error');
        })
    },[]);
    const removeContact= (contactId) =>{
        setContactToDelete(contactId);
        setDeleteModalOpen(true);
    }
    const confirmDelete = () => {
        axios.delete('http://localhost:3000/contacts/remove',{contactId:contactToDelete}).then((res)=>{
            let filteredContacts = contacts.filter((contact)=>{
                return contact._id != contactToDelete;
            });
            setContacts(filteredContacts);
            console.log('contact has been removed');
        }).catch((err)=>{
            console.log(err);
        })
    }
    const handleDownload = (filename) => {
        axios.get("http://localhost:3000/cvs/"+filename, {
          responseType: 'blob',
        })
        .then((res) => {
          fileDownload(res.data, filename)
        });
      }

    return(
        <>
        <AdminHeader/>
        <main id="main" data-aos="fade-up">

    {/*<!-- ======= Breadcrumbs Section ======= -->*/}
        <section className="breadcrumbs">
            <div className="container">

                <div className="d-flex justify-content-between align-items-center">
                    <h1 style={{color: "black}"}}>Contacts</h1>
                    <ol>
                        <li><a onClick={(event)=>{
                            event.preventDefault();
                            navigate('/career');
                        }}>Admin</a></li>
                        <li><a href="#">Contact</a></li>

                    </ol>
                </div>

            </div>
        </section>
        {/*<!-- Breadcrumbs Section -->*/}
        {/*<!-- Start Table -->*/}
       {/* <div className="card shadow m-4 "> */}
                        {/*<div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Contact Information</h6>
                        </div>
    <div className="card-body">*/}
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" style={{backgroundColor:'white'}}>
                                    <thead>
                                        <tr>
                                            <th>Sr.#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Subject</th>
                                            <th>Message</th>
                                            <th>time</th>
                                            <th>Cv</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                  
                                    <tbody>

                                  {
                                   contacts &&  contacts.map((contact,index) =>{
                                        return <tr key={index}>
                                            <td>{index}</td>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.subject}</td>
                                            <td>{contact.message}</td>
                                            <td>{contact.date +' '+ contact.time}</td>
                                            <td className="text-center"><a className="text-warning" ><i className="fas fa-file-download"><FaFileDownload onClick={(event,cv=contact.cv) =>{
                                                //download cv logic
                                                handleDownload(cv);
                                            }} /></i></a></td>
                                            <td className="text-center"><a className="text-danger"><i className="fas fa-trash"><FaTrash onClick={(event,contactId=contact._id)=>{
                                                event.preventDefault();
                                                removeContact(contactId);
                                            }}/></i></a></td>
                                        </tr>
                                    })    
                                }
                                    </tbody>
                                </table>
                            </div>

    </main><Modal
          isOpen={deleteModal}
          onRequestClose={() => setDeleteModalOpen(false)}
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
          <p>Are you sure you want to delete this contact?</p>
          <div style={{display:'flex', justifyContent:'space-between',height:'50px'}}>
          <button onClick={() =>{
            confirmDelete();
            setDeleteModalOpen(true);
            }} className="btn" style={{backgroundColor:'red',color:'white'}}>
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
    <AdminFooter/>
        </>
    )
}

export default ContactDetails;