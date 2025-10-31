import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import webimg from "../../assets/img/web.png";
import webfront from "../../assets/img/webfront.png";
import backend from "../../assets/img/backend.png";
import weblaptop from "../../assets/img/weblaptop.png";
function WebsiteDevelopment() {
 
  return (
  <div className="row " style={{marginTop: "10%", paddingLeft: "10%",paddingRight:"10%"}}>
    <div className="col-lg-6 col-md-6 col-sm-6">
        <img src={webimg}/>
        <h3 style={{marginTop: "20px"}}>Website Development</h3>
        <p style={{textAlign: "justify"}}>Kingitsol provides website development services that are on the
            cutting edge of today’s technologies. Our Web developers are versed in all Web technologies
            such as WordPress, Magento, Shopify. We even custom develop websites and
            web applications in Python Django, NodeJS, Ruby on Rails, and .NET</p>
        <div className="row">
            <div className="col-1">
                <img src={webfront} className="img-fluid" alt="Sheep 2" />
            </div>
            <div className="col-6">
                <h5 style={{padding: "3px"}}>Front End</h5>
            </div>
        </div>
        <div className="row">
            <div className="col-1">
                <img src={backend} className="img-fluid" alt="Sheep 2" />
            </div>
            <div className="col-6">
                <h5 style={{padding: "3px"}}>Back End</h5>
            </div>
        </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-6">
        <img src={weblaptop} width="70%" height="90%" style={{marginLeft: "25%"}} />
    </div>
</div>

  );
}

export default WebsiteDevelopment;
