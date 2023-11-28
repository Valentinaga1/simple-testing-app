import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PlutonicationAccesQr from './pages/PlutonicationAccesQr';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>       
  <Routes>         
    <Route path="/" element={<Home />} />           
    <Route path="/qr-access" element={<PlutonicationAccesQr />} />           
  </Routes>     
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
