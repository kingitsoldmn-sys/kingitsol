import React from "react";
import { Row, Col } from "react-bootstrap";
import aiImage from "../../assets/img/ai.png";
import webfrontImage from "../../assets/img/webfront.png";
import backendImage from "../../assets/img/backend.png";

const ArtificialIntelligence = () => {
  return (
    <Row style={{ marginTop: "10%", marginLeft: "10%" }}>
      <Col lg={6} md={6} sm={6}>
        <h3 style={{ marginTop: "20px" }}>Artificial intelligence</h3>
        <p style={{ textAlign: "justify" }}>
          Kingitsol provides website development services that are on the cutting
          edge of today’s technologies. Our Web developers are versed in all Web
          technologies such as WordPress, Magento, Shopify. We even custom
          develop websites and web applications in Python Django, NodeJS, Ruby
          on Rails, and .NET
        </p>
        <Row>
          <Col xs={1}>
            <img src={webfrontImage} className="img-fluid" alt="Front End" />
          </Col>
          <Col xs={6}>
            <h5 style={{ padding: "3px" }}>Front End</h5>
          </Col>
        </Row>
        <Row>
          <Col xs={1}>
            <img src={backendImage} className="img-fluid" alt="Back End" />
          </Col>
          <Col xs={6}>
            <h5 style={{ padding: "3px" }}>Back End</h5>
          </Col>
        </Row>
      </Col>
      <Col lg={6} md={6} sm={6}>
        <img src={aiImage} width="80%" style={{ float: "right", marginRight: "10%" }} alt="Artificial Intelligence" />
      </Col>
    </Row>
  );
};

export default ArtificialIntelligence;
