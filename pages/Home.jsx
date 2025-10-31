import React,{useEffect} from "react";
import Header from "../src/components/Header/Header";
import HeroSection from "../src/components/HeroSection/Hero";
import MobileDevelopment from "../src/components/MobileDev/MobileDev";
import Services from "../src/components/Services/Services";
import WebsiteDev from "../src/components/WebDev/WebDev";
import UIUXDesign from "../src/components/UIUX/UIUX";
import AI from "../src/components/AI/AI";
import BoardOfDirectors from "../src/components/Team/Team";
import ContactUs from "../src/components/ContactUs/ContactUs";
import Testimonials from "../src/components/Slider/Slider";
import Footer from "../src/components/Footer/Footer";
import Map from "../src/components/Map/Map";
const Home = () =>{
    
    return  <>
       <Header/>
       <HeroSection/>
       <Services/>
        <MobileDevelopment/>
        <WebsiteDev/>
        <UIUXDesign/>
        <AI/>
        <BoardOfDirectors/>
        <ContactUs/>
        <Testimonials/>
        <Footer/>
    </>
}

export default Home;