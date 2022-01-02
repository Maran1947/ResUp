import React, { createContext, useState, useReducer } from 'react';
import './App.css';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { BrowserRouter as Router, Route, Routes }
  from "react-router-dom";
import Home from './pages/Home/Home';
import AreYouBored from './components/areyoubored/AreYouBored';
import Resources from './components/resources/Resources';
import Dashboard from './pages/dashboard/Dashboard';

function App() {

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signin" element={<Login />} />
            <Route exact path="/areyoubored" element={<AreYouBored />} />
            <Route exact path="/resources" element={<Resources />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
