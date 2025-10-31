import React,{useEffect} from "react";
import "./Services.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out'
    });
    // setCurrentProjects(projects);
  }, []);
return <>
<div className="container" id="services" data-aos="fade-up">
            <div className="section-title">
            <h3>Our Services</h3>
            <p>We have expertise in web development, mobile app, digital marketing, graphic arts and custom
                software development.We are a custom built team who share a common desire to solve your toughest
                business problems and build creative IT solutions.
                We’ve helped clients digitally transform in multiple industries.</p>
        </div>
        </div>
</>
}

export default Services;