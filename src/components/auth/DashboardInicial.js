import React, { Component } from 'react';
import Login from './Login.js';
import Registo from './Registo.js'
import Bolhas from './Bolhas.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/stylesheet_carrossel.css';
import '../../css/css_myvideotube.css';
import '../../css/login_css.css';
import '../../css/css_mobile.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


class DashboardInicial extends Component {
  render() {
    return(
      <div>
          <Bolhas />
          <Login />
          <Registo />
      </div>
    )
  }
}

export default DashboardInicial;
