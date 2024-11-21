import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';


const AirportDelayChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loader state
    const navigate = useNavigate();
    const {setAirlineMap} = useData();
    

    useEffect(() => {
        axios.get('http://localhost:5000/flight_delay_by_airline')
            .then(response => {
                setData(response.data);
                setLoading(false); // Stop loading once data is fetched
                setAirlineMap(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const fetchAirlineData = (bar) => {
        const airline = bar.Airline;
        navigate(`/AirlineData/${airline}`);
    }

    return (
        <div className="chart-container">
            {loading ? (
                <div className="loader"></div>  // Loader animation
            ) : (
                <BarChart width={550} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Airline" />
                    {/* <YAxis label={{ value: 'Average Delay (minutes)', angle: -90, position: 'insideLeft' }} /> */}
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ttl_delay" 
                    fill="#8884d8" 
                    name="Average Flight Delay (In Mintues)"
                    onClick={(bar) => fetchAirlineData(bar)}
                    barSize={50}/>
                </BarChart>
            )}
        </div>
    );
};

export default AirportDelayChart;

// return (
//   <Canvas style={{ height: "500px" }}>
//     <ambientLight intensity={0.5} />
//     <pointLight position={[10, 10, 10]} />
//     <OrbitControls />
//     {data.map((item, index) => (
//       <Box
//         key={index}
//         position={[(index % 5) * 3, Math.random() * 5, 0]} // Position boxes in 3D space
//         args={[2, 2, item.ttl_delay / 500]} // Dimensions based on ttl_delay
//         onClick={() => console.log(item.airport_name)}
//       >
//         <meshStandardMaterial color={new THREE.Color(`hsl(${(item.arr_delay / 20) % 360}, 100%, 50%)`)} />
//       </Box>
//     ))}
//   </Canvas>
// );
// };