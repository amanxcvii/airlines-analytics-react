import React, { useEffect, useState } from 'react';
import Visualisation from './VisualisationChart'
import './Analytics.css'; 
import DelayBreakdownChart from './DelayBreakdownChart';


const Analytics = () => {

    const [insights, setInsights] = useState({
        totalFlights: 'Loading...',
        totalDelays: 'Loading...',
        cancelledFlights: 'Loading...',
        averageDelay: 'Loading...'
      });

      useEffect(() => {
        fetch('http://localhost:5000/get_insights')
          .then(response => response.json())
          .then(insights => {
            setInsights({
              totalFlights: insights.total_flights,
              totalDelays: insights.total_delays,
              cancelledFlights: insights.cancelled_flights,
              averageDelay: insights.average_delay
            });
          });
      }, []);

    return (
        <div className="analytics-container">
            <header className="analytics-header">
                <h1>Airline Performance Dashboard</h1>
                <p>Monthly Overview of Flight Delays and Performance</p>
            </header>

            <section className="key-metrics">
                <div className="metric-card">
                    <h2>Total Flights</h2>
                    <p className="metric-value">{insights.totalFlights}</p> {/* Replace with dynamic value */}
                </div>
                <div className="metric-card">
                    <h2>Total Delays</h2>
                    <p className="metric-value">{insights.totalDelays}</p> {/* Replace with dynamic value */}
                </div>
                <div className="metric-card">
                    <h2>Cancelled Flights</h2>
                    <p className="metric-value">{insights.cancelledFlights}</p> {/* Replace with dynamic value */}
                </div>
                <div className="metric-card">
                    <h2>Average Delay (min)</h2>
                    <p className="metric-value">{insights.averageDelay}</p> {/* Replace with dynamic value */}
                </div>
            </section>

            <section className="charts-section">
                <div className="chart-card">
                    <h2>Delay Causes Breakdown</h2>
                    <div className="chart-placeholder">
                        <DelayBreakdownChart/>
                        </div>
                </div>
                <div className="chart-card">
                    <h2>Top Airlines by Delay</h2>
                    <div className="chart-placeholder">
                        <Visualisation/>
                        </div>
                </div>
            </section>

            <section className="insights-section">
                <h2>Recent Insights</h2>
                <div className="insights-card">
                    <p>Not sufficient data to produce.</p> {/* Replace with dynamic insights */}
                </div>
            </section>
        </div>
    );
};

export default Analytics;
