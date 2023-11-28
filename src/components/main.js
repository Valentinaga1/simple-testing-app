import React from 'react';
import { Switch, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import PlutonicationAccesQr from '../pages/PlutonicationAccesQr';

const Main = () => {
  return (
    <Routes> 
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/qr-access' component={PlutonicationAccesQr}></Route>
    </Routes>
  );
}

export default Main;