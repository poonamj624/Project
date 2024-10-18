

// import './App.css';
// import Home from './pages/Home';

// function App() {
//   return <Home />;
// }

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Form from './components/Registration/Form';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Courses from './components/CoursesSection/Courses';
import Live from './components/Live/Live';
import Login from './components/Login/Login'
import Downloads from './components/Downloads/Downloads'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Form />} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/live" element={<Live />} />
        <Route path="/login" element={<Login />} />
        <Route path="/downloads" element={<Downloads />} />
        {/* Add other routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
