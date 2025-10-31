import React from "react";
import { FaFacebook, FaGooglePlus, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const AdminFooter = () =>{
    return(
        <footer id="footer" style={{marginTop:'10px'}}>
        <div className="footer-top">
            <div className="container">
                <div className="row">

                    <div className="col-lg-4 col-md-6 footer-contact ">
                        <h3>King IT Sols<span>.</span></h3>
                        <ul>
                            M9F Block A Military Accounts Society College Road <br/> Lahore<br/> Pakistan <br/><br/>
                            <strong><i className="fas fa-phone-alt"></i></strong> +92 320 7545617<br/>
                            <strong><i className="fas fa-phone-alt"></i></strong> +92 300 6521781<br/>
                            <strong><i className="fas fa-envelope"></i></strong> info@kingitsol.com<br/>
                            <strong><i className="fas fa-envelope"></i></strong> order@kingitsol.com<br/>
                            <strong><i className="fas fa-envelope"></i></strong> career@kingitsol.com<br/>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-6 footer-links ">
                        <h3>Our Services</h3>
                        <ul>
                            <li><i className="bx bx-chevron-right "></i> <a href="#">Game Development</a></li>
                            <li><i className="bx bx-chevron-right "></i> <a href="#">Web Development</a></li>
                            <li><i className="bx bx-chevron-right "></i> <a href="#">App Development</a></li>
                            <li><i className="bx bx-chevron-right "></i> <a href="#">Graphic Design</a></li>
                        </ul>
                    </div>



                    <div className="col-lg-3 col-md-6 footer-links">
                        <h3>Our Social Networks</h3>
                        <div className="social-links mt-3">
                            <a href="#" className="twitter"><i className="bx bxl-twitter"><FaTwitter/></i></a>
                            <a href="#" className="facebook"><i className="bx bxl-facebook"><FaFacebook/></i></a>
                            <a href="#" className="instagram"><i className="bx bxl-instagram"><FaInstagram/></i></a>
                            <a href="#" className="google-plus"><i className="bx bxl-skype"><FaGooglePlus/></i></a>
                            <a href="#" className="linkedin"><i className="bx bxl-linkedin"><FaLinkedinIn/></i></a>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </footer>
    )
}

export default AdminFooter;