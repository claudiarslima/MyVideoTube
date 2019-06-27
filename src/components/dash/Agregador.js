import React, {Component} from 'react';
import RecomendadosDesktop from '../layout/RecomendadosDesktop.js';
import RecomendadosUser from '../layout/RecomendadosUser.js';
import Categorias from '../layout/Categorias.js'
import Footer from "../layout/Footer";
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import firebase from '../../config/fbConfig';

class Agregador extends Component {
  constructor(props) {
    super(props)

    this.state = {

      estado_rec: false

    }
  }

  componentDidMount() {
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

  render() {

      const recomendados = this.state.estado_rec;

    return(
      <div>
      {(() => {
              if (recomendados) {
                return (
                  <div>
                  <div> <RecomendadosUser /> </div>
                  <div> <Categorias /> </div>
                  </div>
                )
              } else {
                return (
                  <div>
                  <div> <RecomendadosDesktop /> </div>
                  <div> <Categorias /> </div>
                  </div>
                )
              }
            })()}
      <div className="display-desktop"> <Footer /> </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Agregador);
