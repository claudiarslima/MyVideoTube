import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {compose} from 'redux';
import firebase from '../../config/fbConfig';
import {firestoreConnect} from 'react-redux-firebase';
import { Likes } from '../../store/actions/likeActions.js';
import { Delete } from '../../store/actions/likeActions.js';

class LikeVideo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      like: false,
      delete: false,
      userId: ' ',
      id: ' ',
      title: ' ',
      description: ' ',
      img: ' ',
      dataid: '',
      estado: false,
      idlike: ''
    }
  }


  addLike = (e) => {
  e.preventDefault();

  this.setState({id: this.props.id, title: this.props.title, description: this.props.description, img: this.props.img})
  if(this.state.like == false) {
    this.setState({like: true})

    this.setState({idlike: e.currentTarget.id})

    this.props.Likes({id: this.props.id, title: this.props.title, description: this.props.description, img: this.props.img, link: this.props.link});

    this.setState({id: this.props.id})

    if(this.state.id !== " ") {
      this.setState({id: " "})
  }
}


  if (this.state.like == true){

    const auth = this.props.auth.uid;

    this.setState({ like: false, idlike: '' }, () => {
});

    this.setState({delete: true, userId: this.props.auth.uid})

    this.props.Delete({delete: true, id: this.props.id, userId: this.props.auth.uid})
  }
  }

onClick = (e) => {
  e.preventDefault();

}

componentDidUpdate(prevProps){

  if(prevProps.item !== this.props.item){
    const firebase = getFirebase();
    const firestore = getFirestore();

    console.log(prevProps.item, "no video mm", this.props.item)

    this.setState({like: false}, ()=>{
       firestore.collection('likes').where('id', '==', this.props.id.toString()).where('userId', '==', this.props.auth.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if(this.state.like == false) {
              this.setState({like: true, userId: this.props.userid})

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

  this.setState({like: false}, ()=>{
     firestore.collection('likes').where('id', '==', this.props.id.toString()).where('userId', '==', this.props.auth.uid).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(this.state.like == false) {
            this.setState({like: true, userId: this.props.userid})


            this.setState({dataid: doc.data().id, userId: doc.data().id})

          }})
        }).catch((error)=> {
          console.log("error");
        });
  })
}

  render() {

    let {likes, addLike, auth} = this.props;

    return(

      <button onClick={(e)=> this.addLike(e, this.props.id)} id={this.props.id} className="mt-4 fav-btn-mobile" style={{ marginLeft: 90 + "px", backgroundColor: "transparent", color: "white"}}>

      {(() => {
              if (this.state.like == true && this.state.dataid == this.props.id || this.state.idlike !== '' || this.state.idlike == undefined) {

                return (
                  <i className="fas fa-heart fa-2x" style={{color: "red", float: "left"}}></i>

                )
              } else {

                return (
                <i className="far fa-heart fa-2x" style={{float: "left"}}> </i>
                )
              }
            }  )()}
            {(() => {
                    if (this.state.like == true && this.state.dataid == this.props.id || this.state.idlike !== '' || this.state.idlike == undefined) {

                      return (
                        <div className="display-mobile" style={{padding: '6px', textAlign: 'left'}}>
                              <span style={{textAlign: 'left', marginTop: '5px', width: '90%'}}>Remove Like</span>
                          </div>
                      )
                    } else {

                      return (
                        <div className="display-mobile" style={{padding: '6px', textAlign: 'left'}}>
                              <span style={{textAlign: 'left', marginTop: '5px', width: '90%'}}>Like</span>
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
        likes: state.firestore.ordered.likes,
        auth: state.firebase.auth,
        profile: state.firebase.profile


    }
};

const mapDispatchToProps = dispatch =>
{
  return {
  Likes: (like) => dispatch(Likes(like)),
  Delete: (like) => dispatch(Delete(like))
}
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props =>[
    { collection: 'likes',
    where: [['userId', '==', props.auth.uid]],
    orderBy: ['createdAt', 'desc']
   }
  ])
)(LikeVideo);
