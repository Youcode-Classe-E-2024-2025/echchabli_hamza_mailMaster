import React from 'react';
import { useState } from 'react';
import Header from './assets/components/Header';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import  Auth from './assets/components/Auth';

import Home from './assets/components/Home';

import Dash from './assets/components/Dash';





const App = () => {
  const [auth , setAuth] = useState(false);


  return (
    <Router>
      <Header  authState={auth} setAuth={setAuth}  /> 
      <Routes>
        <Route path="/" element={<Home />}/> 

        <Route path="/Dash" element={<Dash />}/>


        <Route path="/details/:id" element />



        <Route path="/login" element={<Auth authState={auth} setAuth={setAuth} />} />
      </Routes>
    </Router>
  );
};


export default App;