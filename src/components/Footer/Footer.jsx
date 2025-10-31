import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronRight, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import Map from '../Map/Map'
function Footer() {
  return (
    <footer id="footer">
      <Map/>
      <div className="footer-top">
        <Container>
          <Row>
            <Col lg={4} md={6} className="footer-contact">
              <h3>King IT Sols<span>.</span></h3>
              <p>
                M9F Block A Military Accounts Society College Road <br />
                Lahore<br /> Pakistan <br />
                <br />
                <strong>
                  <i className="fas fa-phone-alt"><FaPhoneAlt/></i>
                </strong>{' '}
                +92 320 7545617<br />
                <strong>
                  <i className="fas fa-phone-alt"><FaPhoneAlt/></i>
                </strong>{' '}
                +92 300 6521781<br />
                <strong>
                  <i className="fas fa-envelope"><FaEnvelope/></i>
                </strong>{' '}
                info@kingitsol.com<br />
                <strong>
                  <i className="fas fa-envelope"><FaEnvelope/></i>
                </strong>{' '}
                order@kingitsol.com<br />
                <strong>
                  <i className="fas fa-envelope"><FaEnvelope/></i>
                </strong>{' '}
                career@kingitsol.com<br />
              </p>
            </Col>

            <Col lg={4} md={6} className="footer-links">
              <h3>Our Services</h3>
              <ul>
                <li>
                  <i className="bx bx-chevron-right "><FaChevronRight/></i>{' '}
                  <a href="#">Game Development</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right "><FaChevronRight/></i>{' '}
                  <a href="#">Web Development</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right "><FaChevronRight/></i>{' '}
                  <a href="#">App Development</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right "><FaChevronRight/></i>{' '}
                  <a href="#">Graphic Design</a>
                </li>
              </ul>
            </Col>

            <Col lg={3} md={6} className="footer-links">
              <h3>Our Social Networks</h3>
              <div className="social-links mt-3">
                <a
                  href="https://twitter.com/kingitsol"
                  target="_blank"
                  rel="noreferrer"
                  className="twitter"
                >
                  <FaTwitter/>
                </a>
                <a
                  href="https://www.facebook.com/kingitsols/"
                  target="_blank"
                  rel="noreferrer"
                  className="facebook"
                >
                  <FaFacebook/>
                </a>
                <a
                  href="https://www.instagram.com/kingitsols/"
                  target="_blank"
                  rel="noreferrer"
                  className="instagram"
                >
                  <FaInstagram/>
                </a>

                <a
                  href="https://www.linkedin.com/in/kingitsol-t-1a2966202/"
                  target="_blank"
                  rel="noreferrer"
                  className="linkedin"
                >
                  <FaLinkedin/>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
