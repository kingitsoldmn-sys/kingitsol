import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UIweb from "../../assets/img/uiweb.png";
import { FaPlayCircle } from 'react-icons/fa';
import "glightbox/dist/css/glightbox.min.css";
function HeroSection() {
return (
<section id="" className="align-items-center" style={{ marginBottom: '-80px' }}>
<Container data-aos="zoom-out" data-aos-delay="100">
<Row>
<Col lg={6} md={6} sm={6}>
<h1>TECHNOLOGY</h1>
<h2 style={{ marginTop: '6px' }}>BUILD YOUR OWN BUSINESS</h2>
<p style={{ textAlign: 'justify' }}>
Kingitsol turns your business idea into a launched product by guiding your journey through mobile app,
website, graphic arts and software development customized to meet your goals. We design and build
platforms and digital experiences that cut to the heart of what your organization needs to grow to the
next level. Whether you require a SaaS platform, social networking mobile application, an internal
dashboard, or a sleek digital experience to engage with your audience — we’ve got you covered.
</p>
<div className="d-flex" style={{ marginTop: '10px', padding: '10px',justifyContent:'center',alignItems:'center',columnGap:'5px' }}>
<Button href="#contact" className="btn-get-started scrollto">
Get Started
</Button>
<a
href="https://www.youtube.com/watch?v=jDDaplaOz7Q"
className="glightbox btn-watch-video">
<i className="bi bi-play-circle"><FaPlayCircle/></i>
<span>Watch Video</span>
</a>
</div>
</Col>
<Col lg={6} md={6} sm={6}>
<img src={UIweb} width="80%" style={{ display: 'block', margin: 'auto' }} />
</Col>
</Row>
</Container>
</section>
);
}

export default HeroSection;