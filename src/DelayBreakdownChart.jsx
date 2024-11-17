import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './App.css';


const DelayBreakdownChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loader state

    useEffect(() => {
        axios.get('http://localhost:5000/flight_delay_by_reason')
            .then(response => {
                setData(response.data);
                setLoading(false); // Stop loading once data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Function to format Y-axis values
  const formatYAxisValue = (value) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M'; // For millions
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K'; // For thousands
    }
    return value; // For smaller values
  };


    return (
        <div className="chart-container">
            {loading ? (
                <div className="loader"></div>  // Loader animation
            ) : (
                <BarChart width={550} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="reason" />
                    <YAxis tickFormatter={formatYAxisValue} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Reason" barSize={50}/>
                </BarChart>
            )}
        </div>
    );
};

export default DelayBreakdownChart;
