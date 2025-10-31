import React, { useState,useEffect } from "react";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
const AdminHeader = () => {
  let navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('Careers'); // Initialize active link

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName); // Update active link on click
  };


  useEffect(() => {
    // Update active link based on current route
    const currentPath = window.location.pathname;
    if (currentPath === '/Careers') {
      setActiveLink('Careers');
    } else if (currentPath === '/enrolls') {
      setActiveLink('Enroll');
    } else if (currentPath === '/contacts') {
      setActiveLink('Contacts');
    } else if (currentPath === '/orders') {
      setActiveLink('Orders');
    } else if (currentPath === '/alerts') {
      setActiveLink('Alerts');
    }
  }, []);
  return (
    <>
      {/*<!-- ======= Header ======= */}
      <header id="header" className="d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <a href="#" className="">
            <img src={logo} width="125px" height="70px" alt="" />
          </a>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === 'Careers' ? 'active' : ''}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick('Careers');
                    navigate('/career');
                  }}
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === 'Enroll' ? 'active' : ''}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick('Enroll');
                    navigate('/enrolls');
                  }}
                >
                  Enroll
                </a>
              </li>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === 'Contacts' ? 'active' : ''}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick('Contacts');
                    navigate('/contacts');
                  }}
                >
                  Contacts
                </a>
              </li>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === 'Orders' ? 'active' : ''}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick('Order');
                    navigate('/orders');
                  }}
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === 'Alerts' ? 'active' : ''}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick('Alert');
                    navigate('/alerts');
                  }}
                >
                  Alerts
                </a>
              </li>
              <li>
                <a
                  className={`nav-link scrollto ${activeLink === 'Logout' ? 'active' : ''}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick('Logout');
                    logout();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
