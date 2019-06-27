import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import firebase from '../../config/fbConfig';
import Navbar from '../layout/Navbar.js'
import RecomendadosMobile from '../layout/RecomendadosMobile.js'
import RecomendadosMobileUser from '../layout/RecomendadosMobileUser.js'
import RecomendadosDesktop from '../layout/RecomendadosDesktop.js'
import Categorias from '../layout/Categorias.js'
import Footer from '../layout/Footer.js'
import CarrosselImgs from '../layout/CarrosselImgs.js'
import Loading from '../layout/Loading.js'
import InfoVideo from "../layout/InfoVideo.js";
import Teste from '../layout/Teste.js';
import SearchResult from './SearchResults.js';
import Agregador from './Agregador.js';
import 'bootstrap/dist/css/bootstrap.min.css';

//imports rita
import McriarConta from './McriarConta.js';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      result: false,
      dados: "",
      show: false,
      display: 'block',
      loading: true,
      estado_rec: false
    }

    this.showViewAction = this.showViewAction.bind(this);
    this.verAModal = this.verAModal.bind(this);
  }

  updatedq = (d,r) => {
      this.setState({dados: d, result: r});
  }

  handleRouteChange(event) {

    console.log("entrei aqui")
    console.log("oioi" , window.location.hash)
    const destination = event.newURL;

      if(window.location.hash !== "#/modal"){
          window.location.reload();
          // this.setState({ redirect: 1 });
            console.log("entrei aquiv2")
      }
      window.addEventListener('hashchange', this.handleRouteChange, false);
  }

  showViewAction(viewToShow){
    var res =false;
     if (viewToShow.length < 3) {
          res = false;
     }
     else {
         res = true;
     }

     this.updatedq(viewToShow, res);
}

componentDidMount() {
 window.addEventListener('hashchange', this.handleRouteChange, false);

    this.interval = setInterval(() => {
        this.endLoading();
    }, 3000);

    const db = firebase.firestore();
    var array_geral = [];

    console.log(this.props.auth);

    if(!this.props.auth.uid) {
      console.log("not logged")
    } else {
      if(this.state.estado_rec == false) {
      db.collection("recomendados").where('userId', '==', this.props.auth.uid).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              array_geral.push(doc.data());
              const count = querySnapshot.size;

              if (querySnapshot.size >= 0) {

                  this.setState({estado_rec: true});

                  console.log(querySnapshot.size)
              }
          });
      });
    } else {
      this.setState({estado_rec: true})

      console.log(this.state.estado_rec)
    }
    }

}

verAModal(viewModal) {
  console.log("aqui na dash crl")

    if(this.state.show == false) {
        this.setState({show: true, display: 'block'})
    } else {
        this.setState({show: false, display: 'none'})
    }
}

    endLoading(){
        this.setState({
            loading: false
        })
    }

    render() {


        const resultado = this.state.result;
        var dados = this.state.dados;
        var resultadospesquisa = "";

        const recomendados = this.state.estado_rec;

        const show = this.state.show;
        const display = this.state.display;

        return (
            <div>
                {(() => {
                    if (this.state.loading) {
                        return(
                            <Loading />
                        )
                    }
                })()}
                <Navbar showView={this.showViewAction} showModal={this.verAModal}/>
                <div style={{minHeight: "92vh"}}>
                    <div className="display-mobile sombra_carrosel_categorias">
                        <div>
                        </div>
                    </div>

                      {(() => {
                              if (recomendados) {
                                return (
                                  <div>
                                  <div className="display-mobile">
                                   <RecomendadosMobileUser/>
                                    </div>
                                  </div>
                                )
                              } else {
                                return (
                                  <div>
                                  <div className="display-mobile">
                                   <RecomendadosMobile/>
                                  </div>
                                  </div>
                                )
                              }
                            })()}

                    <div className="d-flex toggled" style={{marginTop: -34 + "px"}} id="wrapper">



                        <div id="wrap" style={{width: "100%", margin: 0, position: 'absolute'}}>
                            <CarrosselImgs />

                            {(() => {
                                    if (resultado) {
                                      return (
                                        <div><SearchResult  result = {dados} action = {this.updatedq}/></div>
                                      )
                                    } else if(show) {
                                      return(
                                      <div>  <McriarConta /> </div>
                                      )
                                    } else {
                                      return (
                                        <div> <Agregador /></div>
                                      )
                                    }
                                  })()}
                        </div>


                    </div>
                </div>
                <div className="display-mobile">
                <Footer/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Dashboard);
