import React, { useEffect, useState } from "react";
import AdminHeader from "../src/components/AdminHeader/AdminHeader";
import AdminFooter from "../src/components/AdminFooter/AdminFooter";
import { FaFileDownload, FaTrash } from "react-icons/fa";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import fileDownload from "js-file-download";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

const OrderDetails = () =>{
    let navigate = useNavigate();

    const [orders,setOrders] =useState([]);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [deleteModal,setDeleteModalOpen] = useState(false);
    useEffect(() => {
        AOS.init({
          once: true,
          duration: 600,
          easing: 'ease-out'
        });
    
      }, []);
      
    useEffect(()=>{
        axios.get('http://localhost:3000/orders/all').then((res)=>{
            console.log(res.data.orders);
            setOrders(res.data.orders);
        }).catch((err)=>{
            alert('got an error');
        });
    },[]);
    const removeOrder = (orderId) =>{
        setOrderToDelete(orderId);
        setDeleteModalOpen(true);
    }
    const confirmDelete = () => {
      setDeleteModalOpen(false);
        axios.delete('http://localhost:3000/orders/remove',{orderId:orderToDelete}).then((res)=>{
            let filteredOrders = orders.filter((order)=>{
                return order._id != orderToDelete;
            });
            setOrders(filteredOrders);
            console.log('order has been removed');
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
    {/*<!-- End Header -->*/}
    <main id="main" data-aos="fade-up">

    {/*<!-- ======= Breadcrumbs Section ======= -->*/}
    <section className="breadcrumbs">
        <div className="container">

            <div className="d-flex justify-content-between align-items-center">
                <h1 style={{color: "black"}}>Orders</h1>
                <ol>
                    <li><a onClick={(event)=>{
                        event.preventDefault();
                        navigate('/career');
                    }}>Admin</a></li>
                    <li><a href="#">Orders</a></li>
                </ol>
            </div>
        </div>
    </section>
    {/*<!-- Breadcrumbs Section -->*/}
    {/*<!-- Start Table -->*/}

                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Sr.#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact No.</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Attachment</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                orders && orders.map((order,index) =>{
                               return  <tr key={index}>
                                <td>{index}</td>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.cell}</td>
                                <td>{order.category}</td>
                                <td>{order.description}</td>
                                <td className="text-center"><a className="text-warning"><i class="fas fa-file-download"><FaFileDownload onClick={(event,attachment=order.attachment)=>{
                                    event.preventDefault();
                                    handleDownload(attachment);
                                }}/></i></a></td>
                                <td className="text-center"><a className="text-danger"><i className="fas fa-trash"><FaTrash onClick={(event,orderId=order._id) =>{
                                    event.preventDefault();
                                    removeOrder(orderId);
                                }}  /></i></a></td>
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
          <p>Are you sure you want to delete this Order?</p>
          <div style={{display:'flex', justifyContent:'space-between',height:'50px'}}>
          <button onClick={() =>{
            confirmDelete();
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

export default OrderDetails;