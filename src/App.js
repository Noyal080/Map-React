import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import { Icon } from "leaflet";

function App() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch(
      "https://nominatim.openstreetmap.org/search?q=schools+in+kathmandu&format=json"
    )
      .then((response) => response.json())
      .then((data) => setSchools(data));
  }, []);
const setIcon = new Icon ({
  iconUrl:'https://cdn-icons-png.flaticon.com/512/1183/1183106.png',
  iconSize : [30,30]
});
  return (
    <div className="Map">
      <MapContainer center={[27.7172, 85.324]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {schools.map((school) => (
          <Marker key={school.place_id} position={[school.lat, school.lon]} icon ={setIcon}>
            <Popup>{school.display_name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
