import React,{useEffect} from "react";
import { Col, Row, Image } from 'react-bootstrap';
import alter from "../../assets/img/alter.png";
import ui from '../../assets/img/ui.png';
import xd from "../../assets/img/xd.png";
import wireframe from "../../assets/img/wireframe.png";
import AOS from "aos";
import "aos/dist/aos.css";

const UIUXDesign = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out'
    });
  }, []);

  return (
    <Row className="mt-5" data-aos="fade-up" data-aos-delay="100" style={{paddingLeft:'10%',paddingRight:'10%'}}>
      <Col lg={6} md={6} sm={6} xl={6}>
        <Image src={alter} width="70%" height="80%" fluid />
      </Col>
      <Col lg={6} md={6} sm={6} xl={6}>
        <Image src={ui} height="58px" width="58px" className="ml-auto mb-3" fluid />
        <h3 className="mt-4">Mobile &amp; Web UI/UX Design</h3>
        <p className="text-justify">To provide stylish and interaction design we focus on a custom
          approach. No matter how complex the technological aspect of the product, it will be easy and
          intuitive to navigate. We are capable of producing clickable prototypes
          to provide a comprehensive vision of the final result</p>
        <Row>
          <Col xs={1}>
            <Image src={xd} className="img-fluid" alt="Adobe XD" fluid />
          </Col>
          <Col xs={6}>
            <h5 className="p-3">Adobe XD</h5>
          </Col>
        </Row>
        <Row>
          <Col xs={1}>
            <Image src={wireframe} className="img-fluid" alt="Figma" fluid />
          </Col>
          <Col xs={6}>
            <h5 className="p-3">Figma</h5>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={1}>
            <Image src={wireframe} className="img-fluid" alt="Wireframe/Prototype" fluid />
          </Col>
          <Col xs={6}>
            <h5 className="p-3">Wireframe/Prototype</h5>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default UIUXDesign;
