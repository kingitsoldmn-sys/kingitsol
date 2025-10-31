import React from "react";
import MobileDevelopment from "../MobileDev/MobileDev";
import WebsiteDevelopment from "../WebDev/WebDev";
import UIUXDesign from "../UIUX/UIUX";
import AI from "../AI/AI";
import Team from "../Team/Team";
import ContactUs from "../ContactUs/ContactUs";
import "./Main.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Services from "../Services/Services";
const Main = () =>{
    useEffect(() => {
        AOS.init({
          once: true,
          duration: 600,
          easing: 'ease-out'
        });
      }, []);
    return(
        <section  class="services">
            <Services/>
            <MobileDevelopment/>
            <WebsiteDevelopment/>
            <UIUXDesign/>
            <AI/>
            <Team/>
            <ContactUs/>
            
         </section>);

}

export default Main;