import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashboardInicial from './components/auth/DashboardInicial.js'
import Dashboard from './components/dash/Dashboard.js'
import Animais from './components/categorias/Animais.js'
import Tecnologia from './components/categorias/Tecnologia.js'
import Music from './components/categorias/Music.js'
import Auto from './components/categorias/Auto.js'
import Blogs from './components/categorias/Blogs.js'
import Lifestyle from './components/categorias/Lifestyle.js'
import Comedia from './components/categorias/Comedia.js'
import Entertenimento from './components/categorias/Entertenimento.js'
import News from './components/categorias/News.js'
import Animacao from './components/categorias/Animacao.js'
import Desporto from './components/categorias/Desporto.js'
import Viagens from './components/categorias/Viagens.js'
import Filmes from './components/categorias/Filmes.js'
import Gaming from './components/categorias/Gaming.js'
import TV from './components/categorias/TV.js'
import Familia from './components/categorias/Familia.js'
import Educacao from './components/categorias/Educacao.js'
import Acao from './components/categorias/Acao.js'
import Documentario from './components/categorias/Documentario.js'
import Beauty from './components/categorias/Beauty.js'
import Later from './components/layout/Later.js';
import Food from './components/categorias/Comida.js';
import Favoritos from './components/dash/Favoritos.js';
import SearchMobile from './components/dash/SearchMobile.js'
import Perfil from './components/layout/Perfil.js'
import EditarDados from './components/layout/EditarDados.js'
import RecoverPassword from './components/auth/RecoverPassword.js';
import VerificarEmail from './components/auth/VerificarEmail.js';
import McriarConta from './components/dash/McriarConta.js';
import Graf from './components/layout/Graf.js';
import './css/css_mobile.css';
import './css/css_favoritos.css';
import './css/css_myvideotube.css';
import './css/quadrados.css';
import './css/menu_css.css';
// import './css/profile.css';
import './css/stylesheet_carrossel.css';
import * as $ from '../node_modules/jquery';


import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
      <Route path='/' exact={ true } component = { DashboardInicial } />
      <Route path='/dashboard' exact={true} component = { DashboardInicial } />
      <Route path='/paginainicial' component = { Dashboard } />
      <Route path='/animals' component = { Animais } />
      <Route path='/technology' component = { Tecnologia } />
      <Route path='/music' component = { Music } />
      <Route path='/auto' component = { Auto } />
      <Route path='/blogs' component = { Blogs } />
      <Route path='/lifestyle' component = { Lifestyle } />
      <Route path='/comedy' component = { Comedia } />
      <Route path='/entertainment' component = { Entertenimento } />
      <Route path='/news' component = { News } />
      <Route path='/animation' component = { Animacao } />
      <Route path='/sports' component = { Desporto } />
      <Route path='/trips' component = { Viagens } />
      <Route path='/films' component = { Filmes } />
      <Route path='/gaming' component = { Gaming } />
      <Route path='/tv' component = { TV } />
      <Route path='/education' component = { Educacao } />
      <Route path='/family' component = { Familia } />
      <Route path='/action' component = { Acao } />
      <Route path='/documentary' component = { Documentario } />
      <Route path='/beauty' component = { Beauty } />
      <Route path='/later' component = { Later } />
      <Route path='/food' component = { Food } />
      <Route path='/favoritos' component = { Favoritos } />
     <Route path='/searchmobile' component = { SearchMobile } />
      <Route path='/perfil' component = { Perfil } />
     <Route path='/editardados' component = { EditarDados } />
     <Route path='/recoverpassword' component = { RecoverPassword } />
     <Route path='/verificaremail' component = { VerificarEmail } />
     <Route path='/criarconta' component = { McriarConta } />
     <Route path='/graf' component = { Graf } />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
