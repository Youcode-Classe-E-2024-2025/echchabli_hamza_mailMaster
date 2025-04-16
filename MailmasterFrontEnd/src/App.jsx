import React from 'react';
import Header from './assets/components/Header';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  console.log('App component is being rendered')
  return (
    <Router>
      <Header /> 
      <div>normal text</div>
      <Routes>
        <Route path="/" element />

        <Route path="/Dash" element />


        <Route path="/details/:id" element />



        <Route path="/login" element />
      </Routes>
    </Router>
  );
};


export default App;