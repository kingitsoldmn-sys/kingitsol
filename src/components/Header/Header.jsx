import React, { useState, useEffect } from 'react';
import logo from '../../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { scroller } from 'react-scroll';

const Header = () => {
  let navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('Home'); // Initialize active link

  const handleScrollToComponent = (component) => {
    scroller.scrollTo(component, {
      smooth: true,
      offset: -50, 
    });
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName); // Update active link on click
  };

  useEffect(() => {
    // Update active link based on current route
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      setActiveLink('Home');
    } else if (currentPath === '/portfolio') {
      setActiveLink('Portfolio');
    } else if (currentPath === '/careers') {
      setActiveLink('Careers');
    } else if (currentPath === '/order') {
      setActiveLink('Order Now');
    } else if (currentPath === '/enroll') {
      setActiveLink('Enroll Now');
    } else if(currentPath === '/add-enrollment') {
      setActiveLink('Enroll Now');
    }
  }, []); // Run only once on component mount

  return (
    <header id="header" className="d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <a onClick={(event) => {
          event.preventDefault();
          navigate('/');
        }} className=""><img src={logo} height="70px" width="125px" alt="" /></a>
        <nav id="navbar" className="navbar" style={{cursor:'pointer'}}>
          <ul>
            <li><a className={`nav-link ${activeLink === 'Home' ? 'active' : ''}`} onClick={(event) => {
              event.preventDefault();
              handleLinkClick('Home');
              navigate('/');
            }}>Home</a></li>
            <li><a className={`nav-link ${activeLink === 'Services' ? 'active' : ''}`} onClick={(event) => {
              event.preventDefault();
              handleLinkClick('Services');
              handleScrollToComponent('services');
            }}>Services</a></li>
            <li><a className={`nav-link ${activeLink === 'Team' ? 'active' : ''}`} onClick={(event) => {
              event.preventDefault();
              handleLinkClick('Team');
              handleScrollToComponent('team');
            }}>Team</a></li>
            <li><a className={`nav-link ${activeLink === 'Contact Us' ? 'active' : ''}`} onClick={(event) => {
              handleLinkClick('Contact Us');
              handleScrollToComponent('contact');
            }}>Contact Us</a></li>
            <li><a className={`nav-link ${activeLink === 'Portfolio' ? 'active' : ''}`} onClick={(event) => {
              event.preventDefault();
              handleLinkClick('Portfolio');
              navigate('/portfolio');
            }}>Portfolio</a></li>
            <li><a className={`nav-link ${activeLink === 'Careers' ? 'active' : ''}`} onClick={(event) => {
              event.preventDefault();
              handleLinkClick('Careers');
              navigate('/careers');
            }}>Careers</a></li>
            <li><a className={`nav-link ${activeLink === 'Order Now' ? 'active' : ''}`} onClick={(event) => {
              event.preventDefault();
              handleLinkClick('Order Now');
              navigate('/order');
            }}>Order Now</a></li>
            <li><a className={`nav-link ${activeLink === 'Enroll Now' ? 'active' : ''}`} onClick={(event) => {
              event.preventDefault();
              handleLinkClick('Enroll Now');
              navigate('/enroll');
            }}>Enroll Now</a></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};

export default Header;
