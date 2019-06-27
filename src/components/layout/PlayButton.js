import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {compose} from 'redux';
import firebase from '../../config/fbConfig';
import {firestoreConnect} from 'react-redux-firebase';
import { Recomendados } from '../../store/actions/recomendadosActions.js';

class PlayButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rec: false,
      userId: ' ',
      id: ' ',
      title: ' ',
      description: ' ',
      img: ' ',
      dataid: '',
      estado: false,
      idrec: ''
    }
  }

  addRec = (e) => {
  e.preventDefault();

  this.setState({id: this.props.id, title: this.props.title, description: this.props.description, img: this.props.img})
  if(this.state.rec == false) {
    this.setState({rec: true})

    this.setState({idrec: e.currentTarget.id})

    this.props.Recomendados({id: this.props.id, title: this.props.title, description: this.props.description, img: this.props.img, link: this.props.link});

    this.setState({id: this.props.id})

    if(this.state.id !== " ") {
      this.setState({id: " "})
  }
}


  if (this.state.rec == true){

    const auth = this.props.auth.uid;

    this.setState({ rec: false, idrec: '' }, () => {
});
  }
  }

  componentDidUpdate(prevProps){

    if(prevProps.item !== this.props.item){
      const firebase = getFirebase();
      const firestore = getFirestore();

      this.setState({rec: false}, ()=>{
         firestore.collection('recomendados').where('id', '==', this.props.id.toString()).where('userId', '==', this.props.auth.uid).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if(this.state.rec == false) {
                this.setState({rec: true, userId: this.props.userid})

                this.setState({dataid: doc.data().id, userId: doc.data().id})

              }
              })
            }).catch((error)=> {
              console.log("error");
            });
      })

    }
  }

  componentDidMount() {
    const firebase = getFirebase();
    const firestore = getFirestore();

    this.setState({rec: false}, ()=>{
       firestore.collection('recomendados').where('id', '==', this.props.id.toString()).where('userId', '==', this.props.auth.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if(this.state.rec == false) {
              this.setState({rec: true, userId: this.props.userid})


              this.setState({dataid: doc.data().id, userId: doc.data().id})

            }})
          }).catch((error)=> {
            console.log("error");
          });
    })
  }

  render() {

    let {recomendados, addLike, auth} = this.props;


    return(
      <button style={{backgroundColor: "transparent", color: "white"}} onClick={(e)=> this.addRec(e, this.props.id)} id={this.props.id}>

      {(() => {
              if (this.state.rec == true && this.state.dataid == this.props.id || this.state.idrec !== '' || this.state.idrec == undefined) {

                return (
                  <i className="fas fa-play fa-5x" style={{marginTop: 50 + "px", }}></i>

                )
              } else {

                return (
                  <i className="fas fa-play fa-5x" style={{marginTop: 50 + "px", }}></i>
                )
              }
            }  )()}
  </button>
    )
  }
}

const mapStateToProps = (state) => {

    return {
        recomendados: state.firestore.ordered.rec,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

const mapDispatchToProps = dispatch =>
{
  return {
  Recomendados: (rec) => dispatch(Recomendados(rec))
}
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props =>[
    { collection: 'recomendados',
    where: [['userId', '==', props.auth.uid]],
    orderBy: ['createdAt', 'desc']
   }
  ])
)(PlayButton);
