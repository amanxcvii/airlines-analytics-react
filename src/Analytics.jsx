import React from 'react';
import './Analytics.css'; // Assuming you will style it separately in CSS

const Analytics = () => {
    return (
        <div className="analytics-container">
            <header className="analytics-header">
                <h1>Airline Performance Dashboard</h1>
                <p>Monthly Overview of Flight Delays and Performance</p>
            </header>

            <section className="key-metrics">
                <div className="metric-card">
                    <h2>Total Flights</h2>
                    <p className="metric-value">Loading...</p> {/* Replace with dynamic value */}
                </div>
                <div className="metric-card">
                    <h2>Total Delays</h2>
                    <p className="metric-value">Loading...</p> {/* Replace with dynamic value */}
                </div>
                <div className="metric-card">
                    <h2>Cancelled Flights</h2>
                    <p className="metric-value">Loading...</p> {/* Replace with dynamic value */}
                </div>
                <div className="metric-card">
                    <h2>Average Delay (min)</h2>
                    <p className="metric-value">Loading...</p> {/* Replace with dynamic value */}
                </div>
            </section>

            <section className="charts-section">
                <div className="chart-card">
                    <h2>Delay Causes Breakdown</h2>
                    <div className="chart-placeholder">Chart 1</div> {/* Replace with Chart component */}
                </div>
                <div className="chart-card">
                    <h2>Top Airports by Delay</h2>
                    <div className="chart-placeholder">Chart 2</div> {/* Replace with Chart component */}
                </div>
            </section>

            <section className="insights-section">
                <h2>Recent Insights</h2>
                <div className="insights-card">
                    <p>Loading latest insights...</p> {/* Replace with dynamic insights */}
                </div>
            </section>
        </div>
    );
};

export default Analytics;
