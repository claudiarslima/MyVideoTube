import React, {Component} from 'react';
import rec1 from "../../img/recomendados/img1.png";
import rec2 from "../../img/recomendados/img2.png";
import rec3 from "../../img/recomendados/img3.png";
import rec4 from "../../img/recomendados/img4.png";
import rec5 from "../../img/recomendados/img5.png";
import rec6 from "../../img/recomendados/img6.png";
import rec7 from "../../img/recomendados/img7.png";
import rec8 from "../../img/recomendados/img8.png";
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import firebase from '../../config/fbConfig';
import ModalVideo from '../layout/ModalVideo';
import InfoVideo from '../layout/InfoVideo.js';
import $ from 'jquery';
import Slider from './SliderMobile';
import LikeVideo from '../layout/LikeVideo.js';
import SeeLater from '../layout/SeeLater.js';

// import '../../css/stylesheet_carrossel.css';
import tec from "../../img/imgs_cat/tec_cat.jpg";
import music from "../../img/imgs_cat/musica_cat.jpg";
import tv from "../../img/imgs_cat/tv_cat.jpg";
import auto from "../../img/imgs_cat/auto_cat.jpg";
import blog from "../../img/imgs_cat/blog_cat.jpg";
import life from "../../img/imgs_cat/lifestyle_cat.jpg";
import comed from "../../img/imgs_cat/comedia_cat.jpg";
import ent from "../../img/imgs_cat/entertenimento_cat.jpg";
import news from "../../img/imgs_cat/news_cat.jpg";
import education from "../../img/imgs_cat/educacao_cat.jpg";
import animacao from "../../img/imgs_cat/animacao.jpg";
import sports from "../../img/imgs_cat/desporto_cat.jpg";
import animals from "../../img/imgs_cat/animais_catt.jpg";
import fam from "../../img/imgs_cat/familia_cat.jpg";
import travel from "../../img/imgs_cat/viagens_cat.jpg";
import films from "../../img/imgs_cat/filmes_cat.jpg";
import gaming from "../../img/imgs_cat/gaming_cat.jpg";
import acao from "../../img/imgs_cat/ação_cat.jpg";
import doc from "../../img/imgs_cat/documentario.jpg";
import beauty from "../../img/imgs_cat/beleza_cat.jpg";
import food from "../../img/imgs_cat/comida_cat.jpg";



let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo("jspZv3JlZK/qMQJAYjasXcCWI+9ePzrTjGxx31cd797ceKM8s18evvSfUO8nOa1VvTKZYotS/42VD3Jg03UAPx/dlxWX4rVXySawy3hlT1uF5bJZvYXdfkXrKlZ7RMEi", "c1a2477eab66370d21e322130aeba9d8", "d2f6be440960fe41b9766ffafcbe6bdd");
const token = 'd2f6be440960fe41b9766ffafcbe6bdd';

const images = [rec1, rec2, rec3, rec4, rec5, rec6, rec7, rec8];

const hover = theme => ({
    button: {
        backgroundColor: "red",
        "&:hover": {
            backgroundColor: "blue"
        },
        position: "absolute",
        bottom: 20,
        right: 20
    }
});

const array_recomendeduser = [];
var vimeoRec = '';
var dailyRec = '';

const array_geral = [];
var recDaily = '';
var recVimeo = '';

class RecomendadosMobileUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
          array_videos: [],
          array_shuffle: [],
          ytvideo: [],
          vimeovideo: [],
          dailyvideo: [],
          display: 'none',
          hover: '',
          destaque: '',
          isOpen: false,
          id: ' ',
          mostarBotoes: 'none',
          idbotao: ' ',
          videomobile: 'none',
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
          displayFade: 'none',
          logado: true,
          rec: false,
          idrec: '',
          vimeo: ' ',
          daily: '',
          estado_rec: ''
        };
        this.VideoRecommended = this.VideoRecommended.bind(this);

    }

    addLike = (e) => {
       e.preventDefault();
   };

   loginVerification = () => {
       this.setState({
           logado: false
       });
   };

   addLater = (e) => {
       e.preventDefault();

       console.log("ver mais tarde " + e.currentTarget.id)
   };

   addRec = (e) => {
     e.preventDefault();

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



    displayButtons = (e) => {
    e.preventDefault();
    console.log("idbotao: " + e.currentTarget.id);

    if (this.state.mostarBotoes == 'none') {
        this.setState({mostarBotoes: 'block', idbotao: e.currentTarget.id});
    }
    else {
        this.setState({mostarBotoes: 'none'});
    }

    console.log(" ola " + this.state.idbotao)
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

       if (e.currentTarget.getAttribute("description") == null || e.currentTarget.getAttribute("description") == '' || e.currentTarget.getAttribute("description") == ' ' || e.currentTarget.getAttribute("description") == '...' || e.currentTarget.getAttribute("description") == 'none' || e.currentTarget.getAttribute("description") == 'None') {
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



    videoMobile = (e) => {
        this.setState({
            videomobile: 'block'
        })
    };


    VideoRecommended() {

      const db = firebase.firestore();

      var colecao =   db.collection("recomendados");

      var array_rec = [];
      var array_rec1 = [];

      console.log(this.props.auth);

      colecao.where('userId', '==', this.props.auth.uid).where('id', '<', 'x7').get().then((querySnapshot) => {

          querySnapshot.forEach((doc) => {

              array_rec.push(doc.data().id);

              array_rec.map((rec, i) => {

              recVimeo = array_rec[i]

              })

              vimeoRec = 'https://api.vimeo.com/videos/' + recVimeo + '/videos?filter=related&per_page=10&access_token=d2f6be440960fe41b9766ffafcbe6bdd';

              // console.log(vimeoRec)

              fetch(vimeoRec)
                .then((resp) => resp.json())
                .then((resp) => {

                  this.setState({vimeo: resp.data})

                  for(let i in this.state.vimeo) {

                       array_geral.push({"id": this.state.vimeo[i].uri.substr(8), "title": this.state.vimeo[i].name, "description": this.state.vimeo[i].description, "img": this.state.vimeo[i].pictures.sizes[2].link, "link": 'https://player.vimeo.com/video/' + this.state.vimeo[i].uri.substr(8), "vimeoID": this.state.vimeo[i].uri.substr(8), "duration": this.state.vimeo[i].duration})

                     }

                      this.setState({array_videos: array_geral})
                })
          });

      });

      colecao.where('userId', '==', this.props.auth.uid).where('id', '>=', 'x').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {

              array_rec1.push(doc.data().id);

              array_rec1.map((rec, i) => {
                recDaily = array_rec1[i]
              })

              dailyRec = 'https://api.dailymotion.com/video/' + recDaily + '/related&fields=id,thumbnail_360_url,title,embed_url,description,duration&thumbnail_ratio=widescreen&language=eng';

              fetch(dailyRec)
               .then((resp) => resp.json())
               .then((resp) => {
                   this.setState({daily: resp.list})

                   for(let i in this.state.daily) {
                     array_geral.push({"id": this.state.daily[i].id, "title": this.state.daily[i].title, "description": this.state.daily[i].description, "img": this.state.daily[i].thumbnail_360_url, "link": this.state.daily[i].embed_url, "dailyID": this.state.daily[i].id, "duration": this.state.daily[i].duration});
                   }

                      console.log(this.state.daily)
                    this.setState({array_videos: array_geral})
                 })
             })
      });
      console.log(array_geral)
    }

    handleRouteChange(event) {
        const destination = event.newURL;
        if(window.location.hash !== "#/modal"){
            window.location.reload();
            // this.setState({ redirect: 1 });
        }
    }

    componentDidMount() {
        $('.gallery-cell').hover(
            function(){
                $(this).addClass('destaque');
                $('.flickity-slider').find('.gallery-cell').addClass('outro');
            },
            function(){
                $(this).removeClass('destaque');
                $('.flickity-slider').find('.gallery-cell').removeClass('outro');
            }
        );

        this.VideoRecommended();

        window.addEventListener('hashchange', this.handleRouteChange, false);

      if(!this.props.auth.uid) {
          this.loginVerification();
          console.log("n ta loggado")
      }

    }

    renderLogin() {
      if(!this.props.auth.uid) {
        return(
          <Slider className="mr-3 ml-3 gallery js-flickity carrossel_mobile"
                  options={{
                      wrapAround: true,
                      freeScroll: false
                  }}

                  style={{height: "290px"}}
          >
                {this.state.array_videos.map((item, i) => {
                    console.log(item)
                    // const player = "https://www.youtube.com/embed/" + item.id.videoId;
                    return(

                        <div className="gallery-cell posicao"  id={item.id} title={item.title} description={item.description}  dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID} key={i} link={item.link}>
                            <img src={item.img} className="m-1" alt="" />
                            <div className="titulo_recomendados">
                                <div className="col-11" style={{padding: 0}}>
                                    <span> {item.title}</span>
                                </div>
                            </div>

                        </div>
                    )
                })}

          </Slider>
        )
      } else {
        return(
          <Slider className="mr-3 ml-3 gallery js-flickity carrossel_mobile"
                  options={{
                      wrapAround: true,
                      freeScroll: false
                  }}

                  style={{height: "290px"}}
          >
                {this.state.array_videos.map((item, i) => {
                    console.log(item)
                    // const player = "https://www.youtube.com/embed/" + item.id.videoId;
                    if(this.state.idbotao == i) {
                      return(
                          <div className="gallery-cell posicao"  id={item.id} key={i}>
                              <img  id={item.id} src={item.img} title={item.title} description={item.description}  dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID}  className="m-1" alt=""/>
                              <div className=" row titulo_recomendados">
                                  <div className="col-11" style={{padding: 0}}>
                                      <span> {item.title }</span>
                                  </div>
                                  <i style={{
                                      color: "white",
                                      position: 'absolute',
                                      right: 0,
                                      padding: "6px"
                                  }} className="fas fa-ellipsis-v" onClick={this.displayButtons}
                                     id={i}/>
                              </div>

                              <div className="botoes-mobile recomendados-mobile"
                                   style={{display: this.state.mostarBotoes}}>

                                   {/*--- BOTÃO DE LIKE */}
                                          <LikeVideo LikeVideo click={this.state.click} idlike={this.state.idlike}
                                                     item={item} addLike={this.addLike} id={item.id} title={item.title}
                                                     description={item.description} img={item.img} link={item.link}/>


                                          {/*--- BOTÃO DE INFO */}
                                          <div className="botao-info-mobile"
                                               onClick={this.toogleInfo} id={item.id} title={item.title}
                                               description={item.description}>
                                              <button style={{
                                                  backgroundColor: "transparent",
                                                  color: "white", width: '100%'
                                              }}>
                                                  <i className="fas fa-info-circle fa-2x"
                                                     style={{float: 'left', marginRight: '1rem'}}/>
                                                  <div className="display-mobile"
                                                       style={{padding: '6px', textAlign: 'left'}}>
                                                      <span style={{textAlign: 'left', marginTop: '5px', width: '90%'}}>Info</span>
                                                  </div>
                                              </button>

                                          </div>
                                          {/*--- BOTÃO DE LATER */}
                                          <SeeLater later={this.state.later} items={item}
                                                    addLater={this.addLater} id={item.id}
                                                    title={item.title} description={item.description}
                                                    img={item.img} duration={item.duration} link={item.link}/>
                              </div>
                          </div>

                      )
                    }
                    return(

                        <div className="gallery-cell posicao"  id={i} key={i}>

                            <img src={item.img} id={i} title={item.title} description={item.description}  dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID} className="m-1" alt="" />

                            <div className=" row titulo_recomendados">
                                <div className="col-11" style={{padding: 0}}>
                                    <span> {item.title }</span>
                                </div>
                                <i style={{
                                    color: "white",
                                    position: 'absolute',
                                    right: 0,
                                    padding: "6px"
                                }} className="fas fa-ellipsis-v" onClick={this.displayButtons}
                                   id={i}/>
                            </div>

                        </div>
                    )
                })}

          </Slider>
        )
      }
    }


    render() {

        const { auth } = this.props;

        console.log(this.props.auth)

        return (
            <div>
                <div id="page-content-wrapper" className="pt-5 mt-4 display-mobile">
                    <div className="mt-3" style={{marginLeft: "1rem"}}>
                        <h4 style={{color: "white", zIndex:80, position: "relative"}}>Recommended for you</h4>
                        <hr style={{
                            backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                            border: 0,
                            height: "1px"
                        }}/>
                        <InfoVideo show={this.state.info} onClose={this.toogleInfo} title={this.state.title}
                                   description={this.state.description} id={this.state.id}/>
                    </div>

                    {/*<div style={{ display: 'flex', justifyContent: 'space-between' }} />*/}

                    { this.renderLogin() }

                    {/*-------------- CATEGORIAS (MOBILE) -------------------------- */}
                    <div>
                        <div id="catDiv" className="">
                            <div className="mt-3" style={{marginLeft: "1.5rem", textAlign: "left"}}>
                                <h4 style={{color: "white"}}>Categories</h4>
                                <hr style={{backgroundImage: "linear-gradient(90deg, #801336, transparent)", border: 0, height: "1px"}}/>
                            </div>
                            <a className="cat catOverlay" href="technology">
                                <img className="img_cat" src={tec}/>
                                <div className="catTitle">Technology</div>
                            </a>

                            <a className="cat catOverlay" href="music">
                                <img className="img_cat" src={music}/>
                                <div className="catTitle">Music</div>
                            </a>

                            <a className="cat catOverlay" href="tv">
                                <img className="img_cat"  src={tv}/>
                                <div className="catTitle">TV</div>
                            </a>

                            <a className="cat catOverlay"  href="auto">
                                <img className="img_cat"  src={auto}/>
                                <div className="catTitle">Auto</div>
                            </a>

                            <a className="cat catOverlay" href="blogs">
                                <img className="img_cat"  src={blog}/>
                                <div className="catTitle">Blogs</div>
                            </a>

                            <a className="cat catOverlay" href="lifestyle">
                                <img className="img_cat"  src={life}/>
                                <div className="catTitle">Lifestyle</div>
                            </a>

                            <a className="cat catOverlay" href="comedy">
                                <img className="img_cat"  src={comed}/>
                                <div className="catTitle">Comedy</div>
                            </a>

                            <a className="cat catOverlay" href="entertainment">
                                <img className="img_cat"  src={ent}/>
                                <div className="catTitle">Entertaiment</div>
                            </a>

                            <a className="cat catOverlay" href="news">
                                <img className="img_cat"  src={news}/>
                                <div className="catTitle">News</div>
                            </a>

                            <a className="cat catOverlay" href="education">
                                <img className="img_cat" src={education}/>
                                <div className="catTitle">Education</div>
                            </a>

                            <a className="cat catOverlay" href="animation">
                                <img className="img_cat"  src={animacao}/>
                                <div className="catTitle">Animation</div>
                            </a>

                            <a className="cat catOverlay" href="sports">
                                <img className="img_cat"  src={sports}/>
                                <div className="catTitle">Sport</div>
                            </a>

                            <a className="cat catOverlay" href="animals">
                                <img className="img_cat"  src={animals}/>
                                <div className="catTitle">Animals</div>
                            </a>

                            <a className="cat catOverlay" href="family">
                                <img className="img_cat"  src={fam}/>
                                <div className="catTitle">Family</div>
                            </a>

                            <a className="cat catOverlay" href="trips">
                                <img className="img_cat"  src={travel}/>
                                <div className="catTitle">Trips</div>
                            </a>

                            <a className="cat catOverlay" href="films">
                                <img className="img_cat"  src={films}/>
                                <div className="catTitle">Movies</div>
                            </a>

                            <a className="cat catOverlay" href="gaming">
                                <img className="img_cat"  src={gaming}/>
                                <div className="catTitle">Gaming</div>
                            </a>

                            <a className="cat catOverlay" href="action">
                                <img className="img_cat"  src={acao}/>
                                <div className="catTitle">Action</div>
                            </a>

                            <a className="cat catOverlay" href="documentary">
                                <img className="img_cat"  src={doc}/>
                                <div className="catTitle">Documentary</div>
                            </a>

                            <a className="cat catOverlay" href="beauty">
                                <img className="img_cat"  src={beauty}/>
                                <div className="catTitle">Beauty</div>
                            </a>

                            <a className="cat catOverlay " href="food">
                                <img className="img_cat"  src={food}/>
                                <div className="catTitle">Food</div>
                            </a>
                        </div>

                    </div>


                </div>
                <ModalVideo show={this.state.isOpen} onClose={this.toggleModal} link = {array_geral} id = {this.state.id} vimeoID = {this.state.vimeoID} dailyID = {this.state.dailyID} youtubeID = {this.state.youtubeID} />

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

export default connect(mapStateToProps)(RecomendadosMobileUser);
