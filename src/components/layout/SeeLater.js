import React, {Component} from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import firebase from '../../config/fbConfig';
import {firestoreConnect} from 'react-redux-firebase';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Later } from '../../store/actions/laterActions.js';
import { Delete } from '../../store/actions/laterActions.js';

class SeeLater extends Component {
    constructor(props) {
      super(props)

      this.state = {
        later: false,
        delete: false,
        userId: '',
        id: '',
        title: '',
        description: '',
        img: '',
        dataid: '',
        idlater: '',
        duration: ''
      }
    }

    addLater = (e) => {
      e.preventDefault();

      this.setState({id: this.props.id, title: this.props.title, description: this.props.description, img: this.props.img, duration: this.props.duration})
      if(this.state.later == false) {
        this.setState({later: true})

        this.setState({idlater: e.currentTarget.id})

        this.props.Later({id: this.props.id, title: this.props.title, description: this.props.description, img: this.props.img, duration: this.props.duration, link: this.props.link});

        this.setState({id: this.props.id})

        if(this.state.id !== " ") {
          this.setState({id: " "})
      }
    }


      if (this.state.later == true){

        const auth = this.props.auth.uid;

        this.setState({ later: false, idlater: '' }, () => {
    });

        this.setState({delete: true, userId: this.props.auth.uid})

        this.props.Delete({delete: true, id: this.props.id, userId: this.props.auth.uid})
      }
    }

    componentDidUpdate(prevProps) {

      if(prevProps.items !== this.props.items){
        const firebase = getFirebase();
        const firestore = getFirestore();

        this.setState({later: false}, ()=>{
           firestore.collection('later').where('id', '==', this.props.id.toString()).where('userId', '==', this.props.auth.uid).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  this.setState({later: true})

                      console.log("did update: " , doc.data().id, this.state.later)

                      this.setState({dataid: doc.data().id})
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

      this.setState({later: false}, ()=>{
         firestore.collection('later').where('id', '==', this.props.id.toString()).where('userId', '==', this.props.auth.uid).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.setState({later: true})

                    console.log("did update: " , doc.data().id, this.state.later)

                    this.setState({dataid: doc.data().id})
              })
            }).catch((error)=> {
              console.log("error");
            });
      })
    }

    render() {

      let {later, auth, addLater} = this.props;

      return(

        <button className="later-btn-mobile" onClick = {(e)=> this.addLater(e, this.props.id)} id={this.props.id} style={{backgroundColor: "transparent", color: "white"}}>
        {(() => {
                if (this.state.later == true && this.state.dataid == this.props.id || this.state.idlater !== '' || this.state.idlater == undefined) {
                  return (
                  <i class="fas fa-check fa-2x" style={{float: 'left'}}></i>
                  )
                } else {
                  return (
                  <i class="fas fa-clock fa-2x" style={{float: 'left'}}></i>
                  )
                }
              })()}

              {(() => {
                      if (this.state.later == true && this.state.dataid == this.props.id || this.state.idlater !== '' || this.state.idlater == undefined) {

                        return (
                          <div className="display-mobile" style={{padding: '6px', textAlign: 'left'}}>
                                <span style={{textAlign: 'left', marginTop: '5px', width: '90%'}}>Remove Watch Later</span>
                            </div>
                        )
                      } else {

                        return (
                          <div className="display-mobile" style={{padding: '6px', textAlign: 'left'}}>
                                <span style={{textAlign: 'left', marginTop: '5px', width: '90%'}}>Watch Later</span>
                            </div>
                        )
                      }
                    }  )()}

      </button>
      )
    }
}

const mapStateToProps = (state) => {

    return {
        later: state.firestore.ordered.later,
        auth: state.firebase.auth,
        profile: state.firebase.profile,

    }
};

const mapDispatchToProps = dispatch =>
{
  return {
  Later: (later) => dispatch(Later(later)),
  Delete: (later) => dispatch(Delete(later))
}
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props =>[
    { collection: 'later',
    where: [['userId', '==', props.auth.uid]],
    orderBy: ['createdAt', 'desc']
   }
  ])
)(SeeLater);
