import React,{useEffect, useState} from "react";
import Header from "../src/components/Header/Header";
import "./Portfolio.css";
import lohariFood from "../src/assets/img/portfolio/lahori food.jpg";
import web1 from "../src/assets/img/portfolio/web1.jpg";
import iphone from "../src/assets/img/portfolio/iphone.jpg";
import pizza from "../src/assets/img/portfolio/pizzaa.jpg";
import mobiStylers from "../src/assets/img/portfolio/mobi_stylers.jpg";
import portfolio from "../src/assets/img/portfolio/portfolio.jpg";
import mantoMart from "../src/assets/img/portfolio/manto mart.jpg";
import pink from "../src/assets/img/portfolio/pink.jpeg";
import mobimovers from "../src/assets/img/portfolio/mobi_movers.jpg";
import xota from "../src/assets/img/portfolio/96xota.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { event } from "jquery";
import Footer from "../src/components/Footer/Footer";
import { useNavigate } from "react-router-dom";

let projects = [

    {   id:1,
        name:"Lohari Food",
        productType:"App",
        src:lohariFood,
    },
    {   id:2,
        name:"Technology Website",
        productType:"Web",
        src:web1
    },
    ,
    {   id:5,
        name:"Mobi Stylers",
        productType:"Web",
        src:mobiStylers
    },
    {   id:3,
        name:"Weather App",
        productType:"App",
        src:iphone
    },
    {   id:4,
        name:"Flyer",
        productType:"UIUX",
        src:pizza
    },
   
    {   id:6,
        name:"Beautician",
        productType:"App",
        src:portfolio
    },
    {   id:7,
        name:"Manto Mart",
        productType:"UIUX",
        src:mantoMart
    },
    {   id:8,
        name:"King Dairy",
        productType:"UIUX",
        src:pink
    },
    {   id:9,
        name:"Mobi Movers",
        productType:"Logo Design",
        src:mobimovers
    },
    {   id:10,
        name:"96 Xota",
        productType:"Logo Design",
        src:xota
    }
];

const Portfolio = () =>{
    let navigate = useNavigate();
    let [currentProjects,setCurrentProjects] = useState([]);
    useEffect(() => {
        AOS.init({
          once: true,
          duration: 600,
          easing: 'ease-out'
        });
        setCurrentProjects(projects);
      }, []);

      function filterApp() {
        // event.preventdefault();
        let apps = projects.filter((project) =>{
            return project.productType === "App";
        });
        setCurrentProjects(apps);
      }

      function filterWeb() {
        // event.preventdefault();
        let webs = projects.filter((project) =>{
            return project.productType === "Web"
        });
        setCurrentProjects(webs);
      }

      function filterUIUX() {
        // event.preventdefault();
        let uis = projects.filter((project) =>{
            return project.productType === "UIUX";
        })  
        setCurrentProjects(uis);
      }

      function setToAllProjects() {
        // event.preventdefault();
        setCurrentProjects(projects);
      }

    return(
        <>
        <Header/>
        <main id="main" data-aos="fade-up">
        <section className="breadcrumbs">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 style={{color: "black"}}>Portfolio</h1>
                    <ol>
                        <li><a onClick={(event)=>{
                            event.preventDefault();
                            navigate('/');
                        }}>Home</a></li>
                        <li><a onClick={(event)=>{
                            event.preventDefault();
                            navigate('/portfolio');
                        }}>Portfolio</a></li>
                    </ol>
                </div>
            </div>
        </section>

        <section id="portfolio" className="portfolio">
        <div className="container" data-aos="fade-up">
            <div className="row">
            <div className="section-title ">
                <h3>Portfolio</h3>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay="100">
                <div className="col-lg-12 d-flex justify-content-center">
                    <ul id="portfolio-flters">
                        <li data-filter="*"   onClick={(e) =>{
                            e.preventDefault();
                            setToAllProjects(event)}} className="filter-active">All</li>
                        <li data-filter=".filter-app" onClick={(e) =>{
                            e.preventDefault();
                            filterApp(event)}}>App</li>
                        <li data-filter=".filter-card" onClick={(e) =>{
                            e.preventDefault();
                            filterUIUX(event)}}>Graphic Design</li>
                        <li data-filter=".filter-web" onClick={(e) =>{
                            e.preventDefault();
                            filterWeb(event)}}>Web</li>
                    </ul>
                </div>
            </div>

            <div className="row">
                <div className="">
                <div className="row portfolio-container d-flex " data-aos="fade-up" data-aos-delay="200" style={{justifyContent:'center'}}>
                {
                     currentProjects.map((project) => {
                        return <div key={project.id} className="col-md-7 portfolio-item">
                        <img src={project.src} className="img-fluid" alt=" "/>
                        <div className="portfolio-info">
                            <h4>{project.name}</h4>
                            <p>{project.productType}</p>
                            <a href={project.src} data-gallery="portfolioGallery "
                             className="portfolio-lightbox preview-link "><i className="bx bx-plus "></i></a>
                        </div>
                        </div>
                    })
                }
                </div>  
            </div>

        </div>
        </div>
        </div>
    </section>
        </main>
        <Footer/>
        </>

    )
}

export default Portfolio;
