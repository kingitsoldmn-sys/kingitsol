import AOS from "aos";
import "aos/dist/aos.css";
import { FaQrcode, FaQuoteLeft,FaQuoteRight } from 'react-icons/fa';
import ceo from "../../assets/img/team/ceo.png";
import directors from "../../assets/img/team/directors.jpeg";
import unknown from "../../assets/img/testimonials/unknown.jpg";
import gd from "../../assets/img/testimonials/gd.png";
import testimonials5 from "../../assets/img/testimonials/testimonials-5.jpg";
import "swiper/swiper-bundle.min.css";
import React,{useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import developer from '../../assets/img/team/developer.png'

SwiperCore.use([Pagination, Autoplay]);

const Testimonials = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out'
    });
  }, []);
  return (
    <section id="testimonials" className="testimonials">
      <Container data-aos="zoom-in">
        <Swiper
          className="testimonials-slider"
          data-aos="fade-up"
          data-aos-delay="100"
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1000, // Adjust delay as needed
            disableOnInteraction: false, // Keep autoplay even after user interaction
          }}
          speed={400}
        >
          <SwiperSlide>
            <div className="testimonial-item">
              <img
                src={ceo}
                className="testimonial-img"
                alt=""
              />
              <h3>M. Faisal</h3>
              <h4>Ceo &amp; Founder</h4>
              <p>
                <i className="bx bxs-quote-alt-left"><FaQuoteLeft/></i> We see a
                lot of feature-driven product design in which the cost of features
                is not properly accounted. Features can have a negative value to
                customers because they make the products more difficult to
                understand and use. We are finding that people like products that
                just work. It turns out that designs that just work are much
                harder to produce that designs that assemble long lists of
                features.
                <i className="bx bxs-quote-alt-right"><FaQuoteRight/></i>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-item">
              <img
                src={developer}
                className="testimonial-img"
                alt=""
              />
              <h3>Shoaib Ur Rehman</h3>
              <h4>Software Engineer</h4>
              <p>
                <i className="bx bxs-quote-alt-left"><FaQuoteLeft/></i> 
                Software engineering is the art of transforming complex ideas into elegant solutions, building bridges between imagination and reality through the power of code.
                <i className="bx bxs-quote-alt-right"><FaQuoteRight/></i>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial-item">
              <img
                src={directors}
                height="100px"
                className="testimonial-img"
                alt=""
              />
              <h3>Ali Raza</h3>
              <h4>Project &amp; Manager</h4>
              <p>
                <i className="bx bxs-quote-alt-left"><FaQuoteLeft/></i> Any
                software project must have a technical leader, who is responsible
                for all technical decisions made by the team and have enough
                authority to make them. Responsibility and authority are two
                mandatory components that must be present in order to make it
                possible to call such a person an architect.
                <i className="bx bxs-quote-alt-right"><FaQuoteRight/></i>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="testimonial-item">
            <img
              src={unknown}
              height="100px"
              className="testimonial-img"
              alt=""
            />
            <h3>Saqib Jutt</h3>
            <h4>Developer</h4>
            <p>
              <i className="bx bxs-quote-alt-left"><FaQuoteLeft/></i> 
              Programming is about managing complexity: the complexity of the problem, laid upon the complexity of
              the machine. Because of this complexity, most of our programming projects fail.
              <i className="bx bxs-quote-alt-right"><FaQuoteRight/></i>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="testimonial-item">
            <img
              src={gd}
              height="100px"
              className="testimonial-img"
              alt=""
            />
            <h3>Shoaib Saeed</h3>
            <h4>Developer</h4>
            <p>
              <i className="bx bxs-quote-alt-left"><FaQuoteLeft/></i> 
              There are three responses to a piece of design – yes, no, and WOW! <br/>Wow is the one to aim for.
              <i className="bx bxs-quote-alt-right"><FaQuoteRight/></i>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="testimonial-item">
          <img
            src={testimonials5}
            height="100px"
            className="testimonial-img"
            alt=""
          />
          <h3>John Larson</h3>
          <h4>Enterpreneur</h4>
          <p>
            <i className="bx bxs-quote-alt-left"><FaQuoteLeft/></i> 
            We must not blame programmers for their bugs. They belong to them only until the code is merged to
            the repository. After that, all bugs are ours!
            <i className="bx bxs-quote-alt-right"><FaQuoteRight/></i>
          </p>
        </div>
      </SwiperSlide>

        </Swiper>
      </Container>
    </section>
  );
};

export default Testimonials;

