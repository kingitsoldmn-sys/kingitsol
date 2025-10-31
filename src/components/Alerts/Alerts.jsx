import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Alerts.css"; // Import CSS for animations

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/alerts/all").then((res) => {
      console.log(res.data);
      setAlerts(res.data.alerts);
    });
  }, []);

  useEffect(() => {
    if (alerts.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % alerts.length);
      }, 3000); // Change alert every 3 seconds
      return () => clearInterval(interval);
    }
  }, [alerts]);

  return (
    <div className="alerts-container">
      <div
        className="alerts-slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {alerts.map((alert) => (
          <div className="alert-slide" key={alert._id}>
            <p>{alert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
