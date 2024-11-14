import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './App.css';


const AirportDelayChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loader state

    useEffect(() => {
        axios.get('http://localhost:5000/get_cleaned_data')
            .then(response => {
                setData(response.data);
                setLoading(false); // Stop loading once data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="chart-container">
            {loading ? (
                <div className="loader"></div>  // Loader animation
            ) : (
                <BarChart width={800} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="airport_name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="arr_delay" fill="#8884d8" name="Arrival Delay" />
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