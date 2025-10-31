import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


const App = () => {


  return (
    <div style={{height:'300px', width:'100%'}}>
   <iframe
   src="../../leaf.html"
   style={{ width: "100%", height: "300px", border: "none" }}
   title="External HTML"
   />
   </div>
  );
};

export default App;

