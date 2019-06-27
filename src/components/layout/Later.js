import React, {Component} from 'react';
import Footer from "../layout/Footer.js";
import Navbar from "../layout/Navbar";
import { Delete } from '../../store/actions/laterActions';
import '../../css/quadrados.css';
import '../../css/css_myvideotube.css';
import '../../css/stylesheet_carrossel.css';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {firestoreConnect} from 'react-redux-firebase';
import firebase from '../../config/fbConfig';
import ModalVideo from './ModalVideo';
import InfoVideo from '../layout/InfoVideo.js';
import SeeLater from '../layout/SeeLater.js';
import LikeVideo from '../layout/LikeVideo.js';
import AnalogClock from 'analog-clock-react';
import Clock from './Clock.js';
import fundo from "../../img/my1.png";
import Loading from "./Loading";
import $ from 'jquery';



class Later extends Component{
    constructor(props) {
        super(props);

        this.state = {
          ytvideo: [],
          dailyvideo: [],
          isOpen: false,
          delete: false,
          id: ' ',
          title: ' ',
          description: ' ',
          img: ' ',
          vimeoID: ' ',
          dailyID: '',
          youtubeID: '',
          userId: ' ',
          like: false,
          data: [],
          size: '',
          estado: false,
          mostarBotoes: 'none',
          idbotao: ' ',
          loading: true
        };
    }

    toggleModal = (e) => {
        console.log("clickou na modal e foi:" , e.currentTarget.id)
        this.setState({
            isOpen: !this.state.isOpen
        });

        console.log("estado desta merda:" , this.state.isOpen)

        window.location.hash = "#/modal";


        this.setState({id: e.currentTarget.id, vimeoID: e.currentTarget.getAttribute("vimeoID"), dailyID: e.currentTarget.getAttribute("dailyID"), youtubeID: e.currentTarget.getAttribute("youtubeID")})
        this.setState({title: e.currentTarget.getAttribute("title"), description: e.currentTarget.getAttribute("description")})
    }

    componentDidMount() {
        const db = firebase.firestore();
        var array_geral =[];

        db.collection("later").where('userId', '==', this.props.auth.uid).orderBy('createdAt', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                array_geral.push(doc.data())

            });

            this.setState({
                data: array_geral
            });
        });

        this.interval = setInterval(() => {
            this.endLoading();
        }, 3000);
}

    endLoading(){
        this.setState({
            loading: false
        })
    }

componentDidUpdate(prevProps) {

        if(prevProps.later !== this.props.later) {

            const db = firebase.firestore();
            var array_geral =[];

            db.collection("later").where('userId', '==', this.props.auth.uid).orderBy('createdAt', 'desc').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    array_geral.push(doc.data())

                });

                this.setState({
                    data: array_geral
                });
            });
        }
    }


    removeLike = (e, id, userId) => {

        e.preventDefault();

        this.setState({delete: true, userId: this.props.auth.uid})

        this.props.Delete({delete: true, id: id, userId: this.props.auth.uid})

    }

    displayButtons = (e) =>{
       e.preventDefault();
       console.log("idbotao: " + e.currentTarget.id)

       if(this.state.mostarBotoes == 'none') {
           this.setState({mostarBotoes: 'block', idbotao: e.currentTarget.id});
       }
       else {
           this.setState({mostarBotoes: 'none'});
       }
   };

   toogleInfo = (e) => {
         e.preventDefault();

         this.setState({
             info: !this.state.info
         });

         // console.log(e.currentTarget.id);
         console.log(e.currentTarget.getAttribute("description"));

         if (this.state.info === false) {

             $('.quickview').on('click', quickView);
             $('.quickviewContainer .close').on('click', function () {
                 $('.quickviewContainer').removeClass('active');
             })
             $('.quickviewContainer').addClass('active');
             ;

         }
         else {
             clearTimeout(timeQuick);
             if ($('.quickviewContainer').hasClass('active')) {
                 $('.quickviewContainer').removeClass('active');
                 var timeQuick = setTimeout(function () {
                     $('.quickviewContainer').addClass('active');
                 }, 300);
             } else {
                 $('.quickviewContainer').addClass('active');
             }
         }

         function quickView() {

         }

         if(e.currentTarget.getAttribute("description") == null || e.currentTarget.getAttribute("description") == '' || e.currentTarget.getAttribute("description") == ' ' || e.currentTarget.getAttribute("description") == '...' || e.currentTarget.getAttribute("description") == 'none' || e.currentTarget.getAttribute("description") == 'None' ) {
             this.setState({description: "The video hasn't description"});

         }
         else {
             this.setState({description: e.currentTarget.getAttribute("description")});
         }

         this.setState({id: e.currentTarget.id, title: e.currentTarget.getAttribute("title")});
         this.setState({img: e.currentTarget.getAttribute("img")});
         console.log(e.currentTarget.getAttribute("title"));
         console.log(e.currentTarget.getAttribute("description"));
         console.log(this.state.description);
     };


    render(){

      const {later, auth} = this.props;

        console.log(this.props)

        console.log(this.props.later)

        const conta = 0;

        return(
            <div>
                {(() => {
                    if (this.state.loading) {
                        return(
                            <Loading />
                        )
                    }
                })()}
                <Navbar/>
                <div style={{minHeight: '92vh', marginTop: '73px'}}>
                    {/* div que engloba tudo */}
                    <div className="img-fundo-later">
                        <div>
                            <div style={{width: '100%', zIndex: 2, background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)', height: '100%'}}>
                            </div>
                        </div>
                        <img src={fundo}/>
                    </div>
                    <Clock lol={this.props.later}/>
                    <div className="col-lg-12" style={{marginTop: '4.5rem', position: 'relative', zIndex: 2}}>
                        <h4 className="mt-3 ml-2" style={{color: "white"}}> Watch Later </h4>
                        <hr style={{
                            backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                            border: 0,
                            height: "1px",
                            marginLeft: "0.5rem"
                        }}/>
                            <div className="col-lg-12 display-desktop mt-5">
                                <div className="row square">

                                    { this.state.data.map((clock,i) => {

                                        var conta = clock.duration;

                                        if(i == 0) {
                                            var conta2 = 0 + conta;
                                        } else {
                                            var conta1 = conta1 + conta;
                                        }

                                        console.log("resultado: ", conta1)

                                        return(
                                            <div key={clock} className="card card_categoria largura quickview  fade_cartoes" id={i}>
                                                <div className="">
                                                    <img className="card-img-top cartao" src={clock.img} alt="Card image cap"/>
                                                    <span className="caption fade-caption">
                                                        <div className="text-center">
                                                            <button style={{backgroundColor: "transparent", color: "white"}} id={i} title={clock.title} description={clock.description} dailyID={clock.dailyID} vimeoID={clock.vimeoID} onClick={this.toggleModal} youtubeID={clock.youtubeID}>
                                                                <i className="fas fa-play fa-5x" style={{marginTop: 50 + "px", }}></i>
                                                            </button>
                                                        </div>
                                                        <div className="text-right mb-2" style={{width: 270 + "px", paddingRight: 20 + "px", paddingTop: 10 + "px"}}>
                                                            <button className="mt-4" disabled style={{ marginLeft: 90 + "px", backgroundColor: "transparent", display: "none"}}> <i className="fas fa-heart fa-2x mr-2" ></i> </button>

                                                            <button  className="mt-4"  onClick={this.toogleInfo} id={clock.id} title={clock.title}
                                                                     description={clock.description} style={{backgroundColor: "transparent", color: "white"}}><i className="fas fa-info-circle fa-2x"></i></button>

                                                            <button onClick={(e)=> this.removeLike(e, clock.id, clock.userId)} id={clock.id} style={{backgroundColor: "transparent", color: "white"}}>
                                                                <i className="fas fa-times fa-2x" style={{color: "red"}}></i>
                                                            </button>
                                                        </div>

                                                    </span>
                                                </div>
                                                <span className="" style={{color: "white"}}> {clock.title} </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                    </div>

                    {/* ********************** MOBILE ***************************** */}
                    <div className="col-lg-12 display-mobile" style={{marginTop: '29px', position: 'relative', zIndex: 2}}>
                        <div className="row square">

                            { this.state.data.map((clock,i) => {
                                return(
                                    <div key={clock} style={{margin: 'auto'}} className="card largura quickview pagina-later" id={i}>

                                        {(() => {
                                            if (this.state.idbotao == i) {
                                                return (
                                                    <div className="altura">
                                                        <div className="card_categoria" onClick={this.toggleModal} id={i} title={clock.title} description={clock.description} dailyID={clock.dailyID} vimeoID={clock.vimeoID} youtubeID={clock.youtubeID}>
                                                            <img className="card-img-top cartao" src={clock.img} alt="Card image cap"/>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-11 titulo-video">
                                                                <span  className="" style={{color: "white"}}> {clock.title} </span>
                                                            </div>
                                                            <i style={{color: "white", position: 'absolute', right: 0, padding: "6px"}} class="fas fa-ellipsis-v" onClick={this.displayButtons} id={i}></i>
                                                        </div>
                                                        <div className="botoes-mobile" style={{display: this.state.mostarBotoes}}>
                                                            <LikeVideo click={this.state.click} item={clock} addLike={this.addLike} id={clock.id} title={clock.title} description={clock.description} img={clock.img}/>

                                                            {/*--- BOTÃO DE INFO */}
                                                            <div className="botao-info-mobile"
                                                                 onClick={this.toogleInfo} id={clock.id} title={clock.title}
                                                                         description={clock.description}>
                                                                <button style={{
                                                                    backgroundColor: "transparent",
                                                                    color: "white", width: '100%'
                                                                }} >
                                                                    <i className="fas fa-info-circle fa-2x" style={{float: 'left', marginRight: '1rem'}}></i>
                                                                    <div className="display-mobile" style={{padding: '6px', textAlign: 'left'}}>
                                                                    <span style={{textAlign: 'left', marginTop: '5px', width: '90%'}}>Info</span>
                                                                    </div>
                                                                </button>

                                                            </div>
                                                            {/*--- BOTÃO DE LATER */}


                                                            <button className="later-btn-mobile" onClick={(e)=> this.removeLike(e, clock.id, clock.userId)} id={clock.id} style={{backgroundColor: "transparent", color: "white"}}>
                                                                <i className="fas fa-times fa-2x" style={{color: "red", marginRight: '1rem', float: 'left', marginLeft: '8px'}}></i>
                                                                <div className="display-mobile" style={{padding: '6px', textAlign: 'left'}}>
                                                                  <span style={{textAlign: 'left', marginTop: '5px', width: '90%'}}>Remove Watch Later</span>
                                                                </div>
                                                            </button>


                                                        </div>
                                                    </div>

                                                )
                                            } else {
                                                return (
                                                    <div className="altura">
                                                        <div className="card_categoria" id={i} onClick={this.toggleModal}>
                                                            <img className="card-img-top cartao " src={clock.img}/>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-11 titulo-video"><span> {clock.title} </span></div>
                                                            <i style={{color: "white", position: 'absolute', right: 0, padding: "6px"}} class="fas fa-ellipsis-v" onClick={this.displayButtons} id={i}></i>
                                                        </div>
                                                        <div className="botoes-mobile" style={{display: 'none'}}></div>

                                                    </div>
                                                )
                                            }
                                        })()}

                                    </div>
                                )
                            })}
                        </div>
                        <InfoVideo show={this.state.info} onClose={this.toogleInfo} title={this.state.title}
                                   description={this.state.description} id={this.state.id}/>
                    </div>
                    {/* ******************** FIM MOBILE ***************** */}
                </div>

                <ModalVideo show={this.state.isOpen} onClose={this.toggleModal} link = {this.state.data} id = {this.state.id} vimeoID = {this.state.vimeoID} dailyID = {this.state.dailyID} youtubeID = {this.state.youtubeID} title={this.state.title} description={this.state.description} />
<div className="display-desktop">
                <InfoVideo show={this.state.info} onClose={this.toogleInfo} title={this.state.title}
                           description={this.state.description} id={this.state.id}/></div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
       later: state.firestore.ordered.later,
       auth: state.firebase.auth,
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
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
)(Later);
