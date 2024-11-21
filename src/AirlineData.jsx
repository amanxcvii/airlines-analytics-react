import React, { useEffect, useState } from "react";
import FlightDataTable from "./FlightDataTable";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './AirlineData.css'
import { airlineImages } from "./airlineImages";
import { useData } from "./DataContext";
import ColorThief from 'colorthief';

const AirlineData = () => {
    const { airline } = useParams(); // Get the airline from the URL parameter
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    const [selectedAirline, setSelectedAirline] = useState("");
    const [dominantColor, setDominantColor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                // Fetch flight data
                const response = await axios.get(`http://localhost:5000/get_delay_flight_data/${airline}`);
                setData(response.data);
                
                // Set image and airline
                const currentImageUrl = airlineImages[airline];
                setImageUrl(currentImageUrl);
                setSelectedAirline(airline);

                // Extract dominant color
                const color = await extractDominantColor(currentImageUrl);
                setDominantColor(color);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [airline]);

    // Function to extract dominant color from image
    const extractDominantColor = (imageSrc) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                try {
                    const colorThief = new ColorThief();
                    const color = colorThief.getColor(img);
                    resolve(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
                } catch (error) {
                    reject(error);
                }
            };
            img.onerror = reject;
            img.src = imageSrc;
        });
    };

    // Generate a tinted style with the dominant color
    const generateTintedStyle = (color, opacity = 0.1) => {
        return {
            backgroundColor: color ? `${color.replace('rgb', 'rgba').replace(')', `, ${opacity})}`)} : 'transparent',
            borderColor: color ? ${color.replace('rgb', 'rgba').replace(')', `, 0.3)`)}` : 'transparent',
            transition: 'all 0.5s ease'
        };
    };


    const airlineNames = [
        "GoAir", "IndiGo", "Vistara", "SpiceJet",
        "Air India", "Air India Express", "AirAsia India"
    ];

    const handleAirlineChange = (e) => {
        const selectedAirline = e.target.value;
        setSelectedAirline(selectedAirline);
        navigate(`/AirlineData/${selectedAirline}`)
    };

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
            <div className="slab-container"
                style={{
                    ...generateTintedStyle(dominantColor, 0.2),
                    animation: 'fadeIn 0.5s ease-out',
                    borderLeft: `5px solid ${dominantColor || 'transparent'}`,
                    boxShadow: dominantColor ? `0 4px 6px ${dominantColor.replace('rgb', 'rgba').replace(')', ', 0.2)')}` : 'none'
                }}>
                <div className="image-container">
                    <img src={imageUrl} alt={airline}
                        className="airline-image"
                        style={{
                            boxShadow: dominantColor ? `0 10px 20px ${dominantColor.replace('rgb', 'rgba').replace(')', ', 0.3)')}` : 'none',
                            transition: 'all 0.5s ease'
                        }}
                    />
                </div>
                <div className="right-content">
                    <h3>{airline}</h3>
                    <select value={selectedAirline} onChange={handleAirlineChange}
                        style={{
                            ...generateTintedStyle(dominantColor, 0.1),
                            borderColor: dominantColor || 'initial'
                        }}>
                        <option value="">Select an airline...</option>
                        {airlineNames.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <FlightDataTable data={data} />
        </div>
    );
};

export default AirlineData;
