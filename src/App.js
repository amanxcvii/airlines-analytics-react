import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Visualisation from './VisualisationChart';
import './App.css';
import Analytics from './Analytics';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/visualisation" element={<Visualisation/>} />
        </Routes>
        <Routes>
          <Route path="/analytics" element={<Analytics/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
