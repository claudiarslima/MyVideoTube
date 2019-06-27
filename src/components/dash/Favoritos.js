import React, {Component} from 'react';
import Navbar from '../layout/Navbar.js';
import Footer from '../layout/Footer.js';
import LikeVideo from '../layout/LikeVideo.js';
import SeeLater from '../layout/SeeLater.js';
import {Redirect} from 'react-router-dom';
import {Delete} from '../../store/actions/likeActions';
import Loading from '../layout/Loading.js';
import ModalVideo from '../layout/ModalVideo.js';
import InfoVideo from '../layout/InfoVideo.js';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {getFirebase} from 'react-redux-firebase';
import {getFirestore} from 'redux-firestore';
import firebase from '../../config/fbConfig';
import cartao from "../../img/imgs_vid_cat/img1.jpg";
import $ from 'jquery';
import counterUp from 'counterup2'
import fundo from '../../img/teste.png'

const array_geral = []
class Favoritos extends Component {
    constructor(props) {
        super(props)
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
        counterUp(document.querySelector('.count-number'), {
            duration: 1000,
            delay: 16,
        });

        this.interval = setInterval(() => {
            this.endLoading();
        }, 3000);

        const db = firebase.firestore();
        var array_geral = [];

        console.log(this.props.auth);

        db.collection("likes").where('userId', '==', this.props.auth.uid).orderBy('createdAt', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                array_geral.push(doc.data());
                const count = querySnapshot.size;

                if (querySnapshot.size >= 0) {

                    console.log(querySnapshot.size + 'estou maior que 0');
                    this.setState({size: querySnapshot.size, estado: true});

                    console.log(querySnapshot.size)


                }
            });

            this.setState({
                data: array_geral
            });
        });
    }

    displayButtons = (e) => {
        e.preventDefault();
        console.log("idbotao: " + e.currentTarget.id);

        if (this.state.mostarBotoes == 'none') {
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

                            console.log('olaaa')
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




    componentDidUpdate(prevProps) {

        if (prevProps.likes !== this.props.likes) {
            const db = firebase.firestore();
            var array_geral = [];

            if(this.state.estado == true) {
            db.collection("likes").where('userId', '==', this.props.auth.uid).orderBy('createdAt', 'desc').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    array_geral.push(doc.data());

                    const count = querySnapshot.size;

                    if (querySnapshot.size > 0) {
                        console.log("MERDA");
                        // console.log(querySnapshot.size + 'estou maior que 0');
                        this.setState({size: querySnapshot.size, estado: true});

                        console.log(querySnapshot.size)
                    }


                });

                this.setState({
                    data: array_geral,
                    size: querySnapshot.size
                });
            });
          } else {
            this.setState({estado: false})
          }
        }
    }

    removeLike = (e, id, userId) => {
        e.preventDefault();

        this.setState({
            delete: true,
            userId: this.props.auth.uid,
            id: id
        }, () => console.log(this.state.delete, this.state.userId, this.state.id));

        this.props.Delete({delete: true, id: id, userId: this.props.auth.uid})

    };

    endLoading(){
        this.setState({
            loading: false
        })
    }


    render() {

        const {likes, auth} = this.props;

        console.log(this.props);
        // this.setState({idlog: this.props.auth.uid})
        // if (!auth.uid) {
        //     return <Redirect to='/login'/>;
        // }


        console.log(this.state.data);

        console.log(this.state.size);



        return (
            <div>
                {(() => {
                    if (this.state.loading) {
                        return(
                            <Loading />
                        )
                    }
                })()}
                <Navbar/>
                <div style={{minHeight: "92vh", paddingBottom: "3rem"}}>
                <div className="img-fundo-later ">
                        <div>
                            <div style={{
                                width: '100%',
                                zIndex: 2,
                                background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)',
                                height: '100%'
                            }}>
                            </div>

                        </div>
                        <div className="col-md-6 display-desktop animated slideInLeft delay-3s">
                            <div style={{
                                width: '100%',
                                zIndex: 2,
                                background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)',
                                height: "500px",
                                left: "0px"

                            }}>
                            </div>
                        </div>
                        <div className="display-desktop col-md-6 animated slideInLeft delay-3s ">
                            <div style={{
                                width: '100%',
                                zIndex: 2,
                                background: 'linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                                // boxShadow: "inset 0 0 1em gold;",
                                height: "500px",
                                left: "0px",
                                boxShadow: "24px 33px 68px rgba(0,0,0,0.4)"
                            }}>
                                <h1 className="display-desktop" style={{
                                    color: "white",
                                    marginTop: "189px",
                                    marginLeft: "5rem",
                                    fontFamily: "tiposeis",
                                    fontSize: "50px"
                                }}>See all your favorite <br/>    videos here. </h1>
                            </div>
                        </div>
                        <img src={fundo}/>
                    </div>

                    <div className="count-favs" style={{marginTop: '4.5rem', position: 'relative', zIndex: 2}}>
                        <section id="statistic" className="statistic-section one-page-section col-sm-12 col-xs-12"
                                 style={{background: "none", paddingBottom: "0px", paddingTop: "88px"}}>
                            <div>
                                <div className="text-center">
                                    <div className="col-xs-12 col-lg-12">
                                        <div className="counter">
                                            <i className="fas fa-heart fa-2x stats-icon" style={{color: "#d3d3d3"}}/>

                                            {(() => {

                                                if (this.state.size > 0) {
                                                    return (
                                                        <h2 className="timer count-title count-number" style={{
                                                            fontSize: "32px",
                                                            color: "#d3d3d3",
                                                            fontWeight: "normal"
                                                        }}><span>  {this.state.size}</span>
                                                        </h2>
                                                    )
                                                }


                                                else {
                                                    return (
                                                        <h2 className="timer count-title count-number" style={{
                                                            fontSize: "32px",
                                                            color: "#d3d3d3",
                                                            fontWeight: "normal"
                                                        }}><span>{this.state.size}</span>
                                                        </h2>
                                                    )
                                                }
                                            })()}
                                        </div>
                                        <p className="mt-3" style={{color: 'darkgrey'}}> You have <span>{this.state.size}</span> videos in your favorite list.</p>
                                    </div>

                                </div>
                            </div>
                        </section>
                        <h4 className="ml-4" style={{color: "white", marginTop: '6rem'}}> Favorites </h4>
                        <hr style={{
                            backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                            border: 0,
                            height: "1px",
                            marginLeft: "0.5rem"
                        }}/>

                        <div className=" ml-4 display-desktop">
                            <div className="row mt-5 square" id="content"
                                 style={{paddingLeft: "0.5rem", paddingRight: "1.4rem"}}>
                                { this.state.data.map((like, i) => {
                                  console.log(this.state.data);
                                    return (
                                        <div key={like.id} id={like.id}
                                             className="card card_categoria largura quickview fade_cartoes">
                                            <div className="">
                                                <img className="card-img-top cartao" src={like.img}
                                                     alt="Card image cap"/>
                                                <span className="caption fade-caption">
                                                            <div className="text-center">
                                                            <button style={{backgroundColor: "transparent", color: "white"}} id={i} title={like.title} description={like.description} dailyID={like.dailyID} vimeoID={like.vimeoID} onClick={this.toggleModal} youtubeID={like.youtubeID}>
                                                                 <i className="fas fa-play fa-5x" style={{marginTop: 50 + "px", }}/>
                                                             </button>
                                                            </div>
                                                            <div className="text-right mb-2" style={{
                                                                width: 270 + "px",
                                                                paddingRight: 20 + "px",
                                                                paddingTop: 10 + "px"
                                                            }}>

                                                            {/*--- BOTÃO DE LIKE */}
                                                                <button
                                                                    onClick={(e) => this.removeLike(e, like.id, like.userId)}
                                                                    id={like.id} className="mt-4 " style={{
                                                                    marginLeft: 90 + "px",
                                                                    backgroundColor: "transparent",
                                                                    color: "white"
                                                                }}>
                                                             <i className="fas fa-heart-broken fa-2x mr-2"
                                                                style={{color: "red"}}/>

                                                            </button>
                                                            <button  className="mt-4"  onClick={this.toogleInfo} id={like.id} title={like.title}
                                                                     description={like.description} style={{backgroundColor: "transparent", color: "white"}}><i className="fas fa-info-circle fa-2x"></i></button>

                                                            </div>

                                                        </span>
                                            </div>
                                            <span  style={{color: "white"}}> {like.title} </span>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>

                    </div>
                    <div className="display-mobile col-lg-12" style={{marginTop: "29px"}}>
                        <div className="row square">
                            { this.state.data.map((like, i) => {

                                return (
                                    <div key={like.id} id={like.id} style={{margin: 'auto'}}
                                         className="card largura quickview pagina-favs">
                                        {(() => {

                                            if (this.state.idbotao == like.id) {
                                                return (
                                                    <div className="altura">
                                                        <div className="card_categoria" id={i} title={like.title} description={like.description} dailyID={like.dailyID} vimeoID={like.vimeoID} onClick={this.toggleModal} youtubeID={like.youtubeID}>
                                                            <img className="card-img-top cartao" src={like.img}
                                                                 alt="Card image cap"/>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-11 titulo-video">
                                                                <span
                                                                      style={{color: "white"}}> {like.title} </span>
                                                            </div>
                                                            <i style={{
                                                                color: "white",
                                                                position: 'absolute',
                                                                right: 0,
                                                                padding: "6px"
                                                            }} className="fas fa-ellipsis-v" onClick={this.displayButtons}
                                                               id={like.id}/>
                                                        </div>
                                                        <div className="botoes-mobile"
                                                             style={{display: this.state.mostarBotoes}}>
                                                             {/*--- BOTÃO DE LIKE */}
                                                                 <button
                                                                     onClick={(e) => this.removeLike(e, like.id, like.userId)}
                                                                     id={like.id} className="mt-4 fav-btn-mobile " style={{
                                                                     backgroundColor: "transparent",
                                                                     color: "white"
                                                                 }}>
                                                              <i className="fas fa-heart-broken fa-2x"
                                                                 style={{color: "red", marginRight: '1rem', float: 'left'}}/>
                                                                 <div className="display-mobile" style={{padding: '6px', textAlign: 'left'}}>
                                                                 <span style={{textAlign: 'left', marginTop: '5px', width: '90%'}}>Remove Like</span>
                                                                 </div>

                                                             </button>

                                                            {/*--- BOTÃO DE INFO */}
                                                            <div className="botao-info-mobile"
                                                                 onClick={this.toogleInfo}>
                                                                <button style={{
                                                                    backgroundColor: "transparent",
                                                                    color: "white", width: '100%'
                                                                }} id={like.id} title={like.title}
                                                                        description={like.description}>
                                                                    <i className="fas fa-info-circle fa-2x" style={{float: 'left', marginRight: '1rem'}}></i>
                                                                    <div className="display-mobile" style={{padding: '6px', textAlign: 'left'}}>
                                                                    <span style={{textAlign: 'left', marginTop: '5px', width: '90%'}}>Info</span>
                                                                    </div>
                                                                </button>

                                                            </div>
                                                            {/*--- BOTÃO DE LATER */}
                                                            <SeeLater later={this.state.later} items={like}
                                                                      addLater={this.addLater} id={like.id}
                                                                      title={like.title} description={like.description}
                                                                      img={like.img}/>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            else {
                                                return (
                                                    <div className="altura">
                                                        <div className="card_categoria" id={like.id}
                                                             onClick={this.toggleModal} id={i} title={like.title} description={like.description} dailyID={like.dailyID} vimeoID={like.vimeoID} onClick={this.toggleModal} youtubeID={like.youtubeID}>
                                                            <img className="card-img-top cartao " src={like.img}/>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-11 titulo-video">
                                                                <span> {like.title} </span></div>
                                                            <i style={{
                                                                color: "white",
                                                                position: 'absolute',
                                                                right: 0,
                                                                padding: "6px"
                                                            }} class="fas fa-ellipsis-v" onClick={this.displayButtons}
                                                               id={like.id}></i>
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

                </div>


                <div className='quickviewContainer display-desktop'>

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
        likes: state.firestore.ordered.likes,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Delete: (like) => dispatch(Delete(like))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
        {
            collection: 'likes',
            where: [['userId', '==', props.auth.uid]],
            orderBy: ['createdAt', 'desc']
        }
    ])
)(Favoritos);
