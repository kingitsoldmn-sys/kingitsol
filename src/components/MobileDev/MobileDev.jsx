import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Row, Col, Image } from 'react-bootstrap';
import mobileImage from "../../assets/img/mobile.png";
import appImage from "../../assets/img/appdevelopment.png";
import android from "../../assets/img/android.png";
import ios from "../../assets/img/appstore.png";
import flutter  from "../../assets/img/flutter.png";
import reactnative from "../../assets/img/reactnative.png";
function MobileDevelopment() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out'
    });
  }, []);

  return (
    <Row data-aos="fade-up" data-aos-delay="100" style={{ marginTop: '10%',paddingLeft:'10%',paddingRight:'10%' }}>
      <Col lg={6} md={6} sm={6} xl={6}>
        <Image src={mobileImage} fluid style={{ display: 'block', marginRight: 'auto', width: '70%', height: '90%' }} />
      </Col>

      <Col lg={6} md={6} sm={6} xl={6}>
        <Image src={appImage} fluid style={{ marginLeft: 'auto' }} />
        <h3 style={{ marginTop: '20px' }}>Mobile Application Development</h3>
        <p style={{ textAlign: 'justify' }}>If you are looking to hire mobile app developers to handle your project, large or small, we can help! Kingitsol has offered reliable software design and mobile app development services to our clients. You have access to our enterprise-grade solutions and our team of engineers working with leading-edge software development technologies.</p>
        <ul style={{listStyleType:"none"}}>
          <li>
            <Row>
              <Col xs={1}>
                <Image src={android} fluid alt="Android App Development" />
              </Col>
              <Col xs={6}>
                <h5 style={{ padding: '3px' }}>Android App Development</h5>
              </Col>
            </Row>
          </li>
          <li>
            <Row>
              <Col xs={1}>
                <Image src={ios} fluid alt="IOS App Development" />
              </Col>
              <Col xs={6}>
                <h5 style={{ padding: '3px' }}>IOS App Development</h5>
              </Col>
            </Row>
          </li>
          <li>
            <Row>
              <Col xs={1}>
                <Image src={flutter} fluid alt="Flutter App Development" />
              </Col>
              <Col xs={6}>
                <h5 style={{ padding: '3px' }}>Flutter App Development</h5>
              </Col>
            </Row>
          </li>
          <li>
            <Row>
              <Col xs={1}>
                <Image src={reactnative} fluid alt="ReactNative App Development" />
              </Col>
              <Col xs={6}>
                <h5 style={{ padding: '3px' }}>ReactNative App Development</h5>
              </Col>
            </Row>
          </li>
        </ul>
      </Col>
    </Row>
  );
}

export default MobileDevelopment;
