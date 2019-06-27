import React, {Component} from 'react';
import CarrosselImgs from "../layout/CarrosselImgs.js";
import Footer from "../layout/Footer.js";
import Navbar from "../layout/Navbar";
import InfoVideo from '../layout/InfoVideo.js';
import LikeVideo from '../layout/LikeVideo.js';
import SeeLater from '../layout/SeeLater.js'
import { Carousel } from 'react-responsive-carousel';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import Loading from '../layout/Loading.js';
import { connect } from 'react-redux';
import $ from 'jquery';
import '../../css/quadrados.css';
import '../../css/css_myvideotube.css';
import '../../css/stylesheet_carrossel.css';
import ModalVideo from '../layout/ModalVideo';
import SearchResult from "../dash/SearchResults";
import firebase from '../../config/fbConfig';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Views} from '../../store/actions/viewsActions';

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo("jspZv3JlZK/qMQJAYjasXcCWI+9ePzrTjGxx31cd797ceKM8s18evvSfUO8nOa1VvTKZYotS/42VD3Jg03UAPx/dlxWX4rVXySawy3hlT1uF5bJZvYXdfkXrKlZ7RMEi", "c1a2477eab66370d21e322130aeba9d8", "d2f6be440960fe41b9766ffafcbe6bdd");
const token = 'd2f6be440960fe41b9766ffafcbe6bdd';

const finalURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=20&key=AIzaSyDhsERNhsX0wnS3dW-Vc9eMykFvrLKeqQ8&maxResults=3`
const dailyURL = 'https://api.dailymotion.com/videos?channel=videogames&fields=id,thumbnail_360_url,title,embed_url,description&thumbnail_ratio=widescreen&language=eng';
const vimeoURL = 'https://api.vimeo.com/channels/games/videos?per_page=10&access_token=d2f6be440960fe41b9766ffafcbe6bdd';
const array_geral = [];
class Gaming extends Component {

      constructor(props){
          super(props);

          console.log(this.props.carrosel)

          this.state = {
            ytvideo: [],
            dailyvideo: [],
            array_videos: [],
            array_shuffle: [],
            isOpen: false,
            id: ' ',
            info: false,
            click: false,
            later: false,
            title: ' ',
            description: ' ',
            img: ' ',
            vimeoID: ' ',
            dailyID: '',
            youtubeID: '',
            idlike: '',
            mostarBotoes: 'none',
            idbotao: ' ',
            videomobile: 'none',
            loading: true,
            duration: '',

            cat: 'gaming',
            data: [],
            size: '',
            doc: [],

            //search
          result: false,
          dados: ""
          };
          this.VideoList = this.VideoList.bind(this);

          // search
        this.showViewAction = this.showViewAction.bind(this);
        }

        addLike = (e) => {
          e.preventDefault();
      }


      addLater = (e) => {
        e.preventDefault();

        console.log("ver mais tarde " + e.currentTarget.id)
      }

      // ----------------------------------- VERIFICAR VIEWS SE A CATEGORIA JÁ EXISTE ------------------------------


    verifyCollection = () => {
        const db = firebase.firestore();

        db.collection("views").where('userId', '==', this.props.auth.uid).where('categoria', '==', this.state.cat).get().then((querySnapshot) => {
            if (querySnapshot.size == 0) {
                console.log('IREI ADICIONAR');
                this.props.Views({nrviews: 1, userId: this.props.auth.id, categoria: this.state.cat});

            }
            querySnapshot.forEach((doc) => {
                if (querySnapshot.size > 0) {
                    let numero = doc.data().nrviews + 1;
                    db.collection("views").doc(doc.id).update({
                        nrviews: numero,
                    });

                }

            });
        });
    };


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

        // onMouseOver = (e) => {
        //   console.log(e.currentTarget.id)
        //
        //   this.setState({idlike: e.currentTarget.id})
        // }

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

      VideoList(){
        fetch(finalURL)
            .then((resp) => resp.json())
            .then((resp) => {
            this.setState({ytvideo: resp.items})
            console.log(this.state.ytvideo)

            fetch(dailyURL)
            .then((resp) => resp.json())
            .then((resp) => {
              this.setState({dailyvideo: resp.list})

              fetch(vimeoURL)
               .then((resp) => resp.json())
               .then((resp) => {
                 this.setState({vimeovideo: resp.data})

                 for (let i in this.state.vimeovideo) {
                    array_geral.push({"id": this.state.vimeovideo[i].uri.substr(8), "title": this.state.vimeovideo[i].name, "description": this.state.vimeovideo[i].description, "img": this.state.vimeovideo[i].pictures.sizes[2].link, "link": 'https://player.vimeo.com/video/' + this.state.vimeovideo[i].uri.substr(8), "vimeoID": this.state.vimeovideo[i].uri.substr(8)});


                 }

                 for(let i in this.state.ytvideo) {
                      array_geral.push({"id": this.state.ytvideo[i].id, "title": this.state.ytvideo[i].snippet.title, "description": this.state.ytvideo[i].snippet.description, "img": this.state.ytvideo[i].snippet.thumbnails.medium.url, "link": "https://www.youtube.com/embed/" + this.state.ytvideo[i].id, "youtubeID": this.state.ytvideo[i].id});
                      console.log(this.state.ytvideo[i])
                 }

                 for (let i in this.state.dailyvideo) {


                   array_geral.push({"id": this.state.dailyvideo[i].id, "title": this.state.dailyvideo[i].title, "description": this.state.dailyvideo[i].description, "img": this.state.dailyvideo[i].thumbnail_360_url, "link": this.state.dailyvideo[i].embed_url, "dailyID": this.state.dailyvideo[i].id});

                 }

                 console.log(this.state.dailyvideo)

                 this.setState({array_videos: array_geral})
                 console.log(this.state.array_videos)

                 const arrayShuffle = this.state.array_videos;

                   function shuffleArray(arrayShuffle) {
                   for (let i = arrayShuffle.length - 1; i > 0; i--) {
                     const j = Math.floor(Math.random() * (i + 1));
                     const temp = arrayShuffle[i];
                     arrayShuffle[i] = arrayShuffle[j];
                     arrayShuffle[j] = temp;
                   }
                   return arrayShuffle;
                 }
                 this.setState({array_shuffle: shuffleArray(arrayShuffle)})
                 console.log(this.state.array_shuffle)
               }).catch((error) => {
                 console.error(error);
               })
            })
            .catch((error) => {
              console.log(error)
            })
            })
            .catch((error) => {
              console.error(error);
            });


      }



      // seacrh
    updatedq = (d, r) => {
        this.setState({dados: d, result: r});
    }

    showViewAction(viewToShow) {
        var res = false;
        if (viewToShow.length < 3) {
            res = false;
        }
        else {
            res = true;
        }

        this.updatedq(viewToShow, res);
    }

    // fim de seacrh


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

    handleRouteChange(event) {
        const destination = event.newURL;
        if(window.location.hash !== "#/modal"){
            window.location.reload();
            // this.setState({ redirect: 1 });
        }
    }

      componentDidMount() {

      this.VideoList();
      if(!this.props.auth.uid) {
        console.log("not logged")
      } else {
        this.verifyCollection();
      }
        window.addEventListener('hashchange', this.handleRouteChange, false);

        this.interval = setInterval(() => {
           this.endLoading();
       }, 3000);
  }

  endLoading(){
        this.setState({
            loading: false
        })
    }

    render() {

      const { auth } = this.props;

      console.log(this.props.auth.uid)

      // seacrh
      const resultado = this.state.result;
      var dados = this.state.dados;
      console.log("dados " + dados);
      var resultadospesquisa = "";
      // fim de seacrh


          console.log(this.state.youtubeID)
      console.log(this.state.click)
        return (
            <div>
            {(() => {
              if (this.state.loading) {
                return(
                  <Loading />
                )
              }
            })()}
            {/* showview pertence ao seacrh */}
            <Navbar showView={this.showViewAction}/>

            <div className="display-desktop" style={{width: '100%', zIndex: 1, height: '400px', top: -37 + "px", position: 'absolute'}}>
                <div style={{width: '100%', zIndex: 2, background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)', height: '100%'}}>
                </div>
            </div>
            <div className="display-desktop" style={{minHeight: '100vh', backgroundColor:'black'}}>

                <div className="d-flex toggled" id="wrapper">

                {/*------------MOBILE-------------*/}
                      <div id="page-content-wrapper" className="pt-5 mt-4 display-mobile">
                          <div className>
                          </div>
                      </div>
                {/*------------FIM DO MOBILE-------------*/}

                    <div id="wrap" className style={{width: '100%', margin: 0}}>

                        {/* --------------- CARROSSEL DAS IMAGENS ---------------- */}
                    <div style={{marginTop: -50 + "px"}}>
                    <Carousel autoPlay={true} showArrows={false} infiniteLoop={true} showIndicators={false} showStatus={false} showThumbs={false}	transitionTime={350} interval={3000} style={{position: "relative", top: "-50px"}} >
                               <div style={{ height: 400 + "px", marginTop: -50 + "px"}}>
                                   <img className="d-block w-100 h-100 mt-0" src={this.props.carrosel[10].games1.games1} alt="First slide" style={{width: "100%"}}/>
                               </div>
                               <div style={{ height: 400 + "px", marginTop: -50 + "px"}}>
                                   <img className="d-block w-100 h-100" src={this.props.carrosel[10].games2.games2} alt="Second slide" style={{width: "100%"}}/>
                               </div>
                               <div style={{ height: 400 + "px", marginTop: -50 + "px"}}>
                                   <img className="d-block w-100 h-100" src={this.props.carrosel[10].games3.games3} alt="Third slide" style={{width: "100%"}}/>
                               </div>
                           </Carousel>
                    </div>
                    {/* --------------- // CARROSSEL DAS IMAGENS ---------------- */}


                        {/*------------DESKTOP-------------*/}

                        <div className="col-lg-12 display-desktop" style={{marginTop: -120 + "px",  zIndex: 2}}>
                            <h4 className="mt-5 ml-2" style={{color: 'white'}}> Gaming </h4>
                            <hr className="ml-2" style={{background: 'linear-gradient(90deg, #801336, transparent)', height: '1px', border: 0}} />
                            <div className="row mt-5 square" id="content" style={{paddingLeft: '1.4rem', paddingRight: '1.4rem'}}>
                            </div>


                            {/* condição que permite realizar a pesquisa*/}
                               {(() => {
                                   {/* se alguma coisa foi pesquisada sobe a div com os resultados*/
                                   }
                                   if (resultado) {
                                       return (
                                           <div><SearchResult result={dados} action={this.updatedq}/></div>
                                       )
                                   } else {
                                       {/* se aquilo que foi pesquisado for apagado troca a div que subiu por esta*/
                                       }
                                       return (
                                         <div class="row mt-5 square" id="content" style={{ paddingLeft: 1.4 + 'rem', paddingRight: 1.4 + 'rem' }}>
                                         {this.state.array_videos.map((item, i) => {
                                           console.log(this.props.auth.uid)

                                              if(!this.props.auth.uid) {
                                                console.log(this.props.auth.uid);
                                             return(
                                              <div class="card largura quickview aumento fade_cartoes" onMouseOver={this.onMouseOver} key={i} id={item.id}>
                                                <div class="card_categoria" >
                                                <img class="card-img-top cartao " src={item.img} />
                                                <span className="caption fade-caption">
                                                <div className="text-center">
                                                <button style={{backgroundColor: "transparent", color: "white"}} id={i} title={item.title} description={item.description} dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID}>
                                                <i className="fas fa-play fa-5x" style={{marginTop: 50 + "px", }}></i>
                                                </button>
                                                </div>
                                                </span>
                                                </div>
                                                <span class=""> {item.title} </span>
                                                </div>
                                                )
                                              } else {

                                                return(
                                              <div class="card largura quickview aumento fade_cartoes" onMouseOver={this.onMouseOver} key={i} id={item.id}>
                                              <div class="card_categoria" >
                                              <img class="card-img-top cartao " src={item.img} />
                                               <span className="caption fade-caption">
                                              <div className="text-center">
                                              <button style={{backgroundColor: "transparent", color: "white"}} id={i} title={item.title} description={item.description} dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID}>
                                              <i className="fas fa-play fa-5x" style={{marginTop: 50 + "px", }}></i>
                                              </button>
                                              </div>
                                              {/*--- DIV QUE ENGLOBA OS COMANDOS RÁPIDOS DO VÍDEO (ex. like) */}
                                              <div className="text-right mb-2" style={{width: 270 + "px", paddingRight: 20 + "px", paddingTop: 10 + "px"}}>

                                              {/*--- BOTÃO DE LIKE */}
                                              <LikeVideo click={this.state.click} idlike={this.state.idlike} item={item} addLike={this.addLike} id={item.id} title={item.title} description={item.description} img={item.img} link={item.link}/>

                                             {/*--- BOTÃO DE INFO */}
                                             <button style={{backgroundColor: "transparent", color: "white"}} click={this.state.click} item={item} addLike={this.addLike} id={item.id} title={item.title} description={item.description} img={item.img} onClick={this.toogleInfo}>
                                              <i className="fas fa-info-circle fa-2x"></i></button>

                                                {/*--- BOTÃO DE LATER */}
                                            <SeeLater later={this.state.later} items={item} addLater={this.addLater} id={item.id} title={item.title} description={item.description} img={item.img} duration={item.duration} link={item.link}/>
                                            </div>
                                          </span>
                                            </div>
                                          <span class=""> {item.title} </span>
                                         </div>
                                       )}
                                                 })}
                                        </div>
                                       )
                                   }
                               })()}



                        </div>

                    </div>


                </div>
                <div style={{position: 'relative', top: '33px'}}>
                    <Footer/>
                </div>

            </div>

             <InfoVideo img={this.state.img} title={this.state.title} description={this.state.description} id={this.state.id}/>

            <div className="display-mobile">
                                <div>
                                    <div className="display-mobile" style={{width: '100%', zIndex: 1, height: '261px', top: -37 + "px", position: 'absolute'}}>
                                        <div style={{width: '100%', zIndex: 2, background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)', height: '100%'}}>
                                        </div>
                                    </div>
                                    <Carousel className="carrossel_mobile_cat" autoPlay={true} showArrows={false} infiniteLoop={true} showIndicators={false} showStatus={false} showThumbs={false}	transitionTime={350} interval={3000} style={{position: "relative", top: '73px', marginTop: -50 + "px",}} >
                                        <div style={{ height: 200 + "px", marginTop: -50 + "px"}}>
                                            <img className="d-block w-100 h-100 mt-0" src={this.props.carrosel[10].games1.games1} alt="First slide" style={{width: "100%"}}/>
                                        </div>
                                        <div style={{ height: 200 + "px", marginTop: -50 + "px"}}>
                                            <img className="d-block w-100 h-100" src={this.props.carrosel[10].games2.games2} alt="Second slide" style={{width: "100%"}}/>

                                        </div>
                                        <div style={{ height: 200 + "px", marginTop: -50 + "px"}}>
                                            <img className="d-block w-100 h-100" src={this.props.carrosel[10].games3.games3} alt="Third slide" style={{width: "100%"}}/>
                                        </div>
                                    </Carousel>
                                    <div id="page-content-wrapper" className=" display-mobile" style={{position: "relative", top: "44px"}}>

                                        <div className="mt-3" style={{marginLeft: "1rem"}}>
                                            <h4 style={{color: "white", zIndex:80, position: "relative"}}>Gaming</h4>
                                            <hr style={{
                                                backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                                                border: 0,
                                                height: "1px"
                                            }}/>
                                        </div>


                                        <div className="col-lg-12 display-mobile" style={{marginTop: 29 + "px", zIndex: 2}}>


                                            <div className="row square ">
                                                {this.state.array_videos.map((item, i) => {
                                                    console.log(item);

                                                    const player = "https://www.youtube.com/embed/" + item.id;
                                                    return (

                                                        <div className="card largura quickview pagina-cat" id={i} style={{margin: 'auto'}} >
                                                        {(() => {
                                                          if(!this.props.auth.uid) {
                                                            if (this.state.idbotao == i) {
                                                            return(
                                                              <div className="altura">
                                                                  <div className="card_categoria" id={i} title={item.title} description={item.description} dailyID={item.dailyID} vimeoID={item.vimeoID} youtubeID={item.youtubeID} onClick={this.toggleModal}>
                                                                      <img className="card-img-top cartao " src={item.img}/>
                                                                  </div>
                                                                  <div className="row">
                                                                      <div className="col-11 titulo-video"><span> {item.title} </span></div>
                                                                      <i style={{color: "white", position: 'absolute', right: 0, padding: "6px"}} class="fas fa-ellipsis-v" onClick={this.displayButtons} id={i}></i>
                                                                  </div>
                                                                  <div className="botoes-mobile" style={{display: this.state.mostarBotoes}}>
                                                                      {/*--- BOTÃO DE INFO */}
                                                                      <div className="botao-info-mobile"
                                                                           onClick={this.toogleInfo} id={item.id} title={item.title}
                                                                                   description={item.description}>
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
                                                                  </div>
                                                              </div>
                                                            )
                                                          } else {
                                                            return(
                                                            <div className="altura">
                                                                <div className="card_categoria" id={i} title={item.title} description={item.description} dailyID={item.dailyID} vimeoID={item.vimeoID} youtubeID={item.youtubeID} onClick={this.toggleModal}>
                                                                    <img className="card-img-top cartao " src={item.img}/>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-11 titulo-video"><span> {item.title} </span></div>
                                                                    <i style={{color: "white", position: 'absolute', right: 0, padding: "6px"}} class="fas fa-ellipsis-v" onClick={this.displayButtons} id={i}></i>
                                                                </div>
                                                            </div>
                                                          )
                                                          }
                                                          } else {
                                                            if (this.state.idbotao == i) {
                                                                return (
                                                                    <div className="altura">
                                                                        <div className="card_categoria" id={i} title={item.title} description={item.description} dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID} onClick={this.toggleModal}>
                                                                            <img className="card-img-top cartao " src={item.img}/>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-11 titulo-video">
                                                                                <span> {item.title} </span>
                                                                            </div>
                                                                            <i style={{color: "white", position: 'absolute', right: 0, padding: "6px"}} class="fas fa-ellipsis-v" onClick={this.displayButtons} id={i}></i>
                                                                        </div>
                                                                        <div className="botoes-mobile" style={{display: this.state.mostarBotoes}}>
                                                                        <LikeVideo click={this.state.click} idlike={this.state.idlike} item={item} addLike={this.addLike} id={item.id} title={item.title} description={item.description} img={item.img} link={item.link}/>

                                                                            {/*--- BOTÃO DE INFO */}
                                                                            <div className="botao-info-mobile"
                                                                                 onClick={this.toogleInfo} id={item.id} title={item.title}
                                                                                         description={item.description}>
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
                                                                            <SeeLater later={this.state.later} items={item} addLater={this.addLater} id={item.id} title={item.title} description={item.description} img={item.img} link={item.link}/>
                                                                        </div>
                                                                    </div>

                                                                )
                                                            } else {
                                                                return (
                                                                    <div className="altura">
                                                                        <div className="card_categoria" id={i} title={item.title} description={item.description} dailyID={item.dailyID} vimeoID={item.vimeoID} youtubeID={item.youtubeID} onClick={this.toggleModal}>
                                                                            <img className="card-img-top cartao " src={item.img}/>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-11 titulo-video"><span> {item.title} </span></div>
                                                                            <i style={{color: "white", position: 'absolute', right: 0, padding: "6px"}} class="fas fa-ellipsis-v" onClick={this.displayButtons} id={i}></i>
                                                                        </div>
                                                                        <div className="botoes-mobile" style={{display: 'none'}}></div>
                                                                    </div>
                                                                )
                                                            }
                                                          }
                                              })()}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div style={{position: 'relative', top: '33px'}}>
                                            <Footer/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ModalVideo show={this.state.isOpen} onClose={this.toggleModal} link = {array_geral} id = {this.state.id} vimeoID = {this.state.vimeoID} dailyID = {this.state.dailyID} youtubeID = {this.state.youtubeID} title={this.state.title} description={this.state.description} />
            </div>


        )
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        carrosel: state.carrosel.img
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Views: (view) => dispatch(Views(view))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gaming)
