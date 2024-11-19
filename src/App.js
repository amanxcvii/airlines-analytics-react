import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Visualisation from './VisualisationChart';
import './App.css';
import Analytics from './Analytics';
import LoginPage from './LoginPage';
import AirlineData from './AirlineData';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
        <Routes>
          <Route path="/visualisation" element={<Visualisation />} />
        </Routes>
        <Routes>
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
        <Routes>
          <Route path="/AirlineData/:airline" element={<AirlineData/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
