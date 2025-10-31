import React,{useEffect} from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import ceo from "../../assets/img/team/ceo.png";
import AOS from "aos";
import "aos/dist/aos.css";

const BoardOfDirectors = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out'
    });
  }, []);

  return (
    <section className="team section-bg" data-aos="fade-up" id="team">
      <Container>
        <Row>
          <div className="section-title">
            <h3>Board of Directors</h3>
          </div>
        </Row>

        <Row style={{ width: "100%" }}>
          <Col lg={3} md={2} className="mt-10 mx-auto"></Col>
          <Col lg={3} md={3} className="mt-10 mx-auto">
            <div className="member">
              <Image
                src={ceo}
                width="200px"
                height="200px"
                className="rounded mx-auto d-block"
                alt="M.Faisal"
                style={{ margin: "20px" }}
              />
              <h4 className="text-center">M.Faisal</h4>
              <p className="text-center">
                CEO, KingItSol
              </p>
            </div>
          </Col>
          <Col lg={3} md={3} className="mt-10 mx-auto"></Col>
        </Row>
      </Container>
    </section>
  );
};

export default BoardOfDirectors;
