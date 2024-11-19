import React, { useEffect, useState } from "react";
import FlightDataTable from "./FlightDataTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import './AirlineData.css'

const airlineImages = {
    "GoAir": "/images/GoAir.png",
    "IndiGo": "https://via.placeholder.com/150?text=IndiGo", // Example URL
    "AirIndia": "https://via.placeholder.com/150?text=AirIndia", // Example URL
  };


const AirlineData = () => {
  const { airline } = useParams(); // Get the airline from the URL parameter
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setLoading(true); // Start loading when the API call is triggered
    axios
      .get(`http://localhost:5000/get_delay_flight_data/${airline}`)
      .then((response) => {
        setData(response.data);
        setLoading(false); // Set loading to false once data is received
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [airline]);

  if (loading) {
    return <div>Loading flight data...</div>; // Show loading message while fetching data
  }

  // If no data is received, display a "No data to display" message
  if (data.length === 0) {
    return <div>No data to display for airline: {airline}</div>;
  }

  return (
    <div>
      {/* Slab with Image */}
      <div className="slab-container">
        <div className="image-container">
          <img src={imageUrl} alt={airline} className="airline-image" />
        </div>
        <div className="right-content">
          <h3>Visual</h3>
          <p>Data for Year: 2023, 2024</p>
        </div>
      </div>
      <FlightDataTable data={data} />
    </div>
  );
};

export default AirlineData;
