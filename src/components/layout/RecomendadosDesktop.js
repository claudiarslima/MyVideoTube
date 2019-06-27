import React, {Component} from 'react';
import InfoVideo from '../layout/InfoVideo.js';
import LikeVideo from '../layout/LikeVideo.js';
import PlayButton from '../layout/PlayButton.js';
import SeeLater from '../layout/SeeLater.js'
import ModalVideo from '../layout/ModalVideo';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import firebase from '../../config/fbConfig';
import rec1 from "../../img/recomendados/img1.png";
import rec2 from "../../img/recomendados/img2.png";
import rec3 from "../../img/recomendados/img3.png";
import rec4 from "../../img/recomendados/img4.png";
import rec5 from "../../img/recomendados/img5.png";
import rec6 from "../../img/recomendados/img6.png";
import rec7 from "../../img/recomendados/img7.png";
import rec8 from "../../img/recomendados/img8.png";
import $ from 'jquery';
import Slider from './Slider';
import '../../css/stylesheet_carrossel.css';
import '../../css/search_css.css';

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

const finalURL = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails%2Csnippet&chart=mostPopular&AIzaSyDhsERNhsX0wnS3dW-Vc9eMykFvrLKeqQ8&maxResults=1';
const vimeoURL = 'https://api.vimeo.com//channels/staffpicks/videos?per_page=10&access_token=d2f6be440960fe41b9766ffafcbe6bdd';
const dailyURL = 'https://api.dailymotion.com/videos?sort=trending&fields=id,thumbnail_360_url,title,embed_url,description,duration&thumbnail_ratio=widescreen&language=eng';

const array_recomendeduser = [];
var vimeoRec = '';
var dailyRec = '';

const array_geral = [];
var recDaily = '';
var recVimeo = '';

class RecomendadosDesktop extends Component {

  constructor(props){
      super(props);
      this.state = {
        array_videos: [],
        array_shuffle: [],
        ytvideo: [],
        vimeovideo: [],
        dailyvideo: [],
        data: [],
        display: 'none',
        hover: '',
        destaque: '',
        isOpen: false,
        id: ' ',
        info: false,
        click: false,
        later: false,
        title: ' ',
        description: ' ',
        link: '',
        img: ' ',
        vimeoID: ' ',
        dailyID: '',
        youtubeID: '',
        idlike: '',
        duration: '',
        displayFade: 'none',
        rec: false,
        idrec: '',
        vimeo: ' ',
        daily: '',
        estado_rec: ''
,      };
      this.VideoList = this.VideoList.bind(this);
      this.toogleInfo = this.toogleInfo.bind(this);

    }

    handleOnHover = (e) => {
      e.preventDefault();

      this.setState({hover: 'outro', id: e.currentTarget.id, destaque: 'destaque', displayFade: 'block'})

    }

    handleOnOut = (e) => {
      e.preventDefault();

      this.setState({hover: '', destaque: '', displayFade:'none'})

    }

    addLike = (e) => {
      e.preventDefault();
    }

    addLater = (e) => {
    e.preventDefault();

    }

    addRec = (e) => {
      e.preventDefault();

    }

    toggleModal = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        });


    this.setState({id: e.currentTarget.id, vimeoID: e.currentTarget.getAttribute("vimeoID"), dailyID: e.currentTarget.getAttribute("dailyID"), youtubeID: e.currentTarget.getAttribute("youtubeID")})
    }

    // onMouseOver = (e) => {
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
        fetch(vimeoURL)
            .then((resp) => resp.json())
            .then((resp) => {
            this.setState({vimeovideo: resp.data})

            fetch(dailyURL)
              .then((resp) => resp.json())
              .then((resp) => {
                this.setState({dailyvideo: resp.list})


                for(let i in this.state.ytvideo) {
                  array_geral.push({"id": this.state.ytvideo[i].id, "title": this.state.ytvideo[i].snippet.title, "description": this.state.ytvideo[i].snippet.description, "img": this.state.ytvideo[i].snippet.thumbnails.medium.url, "link": "https://www.youtube.com/embed/" + this.state.ytvideo[i].id, "youtubeID": this.state.ytvideo[i].id, "duration": this.state.ytvideo[i].contentDetails.duration});
                  console.log(this.state.ytvideo)
                }

                // this.setState({array_geral: })
                for (let i in this.state.vimeovideo) {
                  array_geral.push({"id": this.state.vimeovideo[i].uri.substr(8), "title": this.state.vimeovideo[i].name, "description": this.state.vimeovideo[i].description, "img": this.state.vimeovideo[i].pictures.sizes[2].link, "link": 'https://player.vimeo.com/video/' + this.state.vimeovideo[i].uri.substr(8), "vimeoID": this.state.vimeovideo[i].uri.substr(8), "duration": this.state.vimeovideo[i].duration});

                }

                for (let i in this.state.dailyvideo) {
                  array_geral.push({"id": this.state.dailyvideo[i].id, "title": this.state.dailyvideo[i].title, "description": this.state.dailyvideo[i].description, "img": this.state.dailyvideo[i].thumbnail_360_url, "link": this.state.dailyvideo[i].embed_url, "dailyID": this.state.dailyvideo[i].id, "duration": this.state.dailyvideo[i].duration});
                }

                this.setState({array_videos: array_geral})

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
              })
              .catch((error) => {
                console.log(error)
              })
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
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
     });
    this.VideoList();
}

    render() {

      const { auth } = this.props;

        return (
      <div>

          <div className="ml-2 mr-2 display-desktop" style={{marginTop: -158 + "px", zIndex: 1200}}>
              <div className="mt-3" style={{marginLeft: "1rem"}}>
                  <h4 style={{color: "white"}}>Trending</h4>
                  <hr style={{backgroundImage: "linear-gradient(90deg, #801336, transparent)", border: 0, height: "1px"}}/>
              </div>

          <Slider className="mr-3 ml-3 gallery js-flickity carrossel_desktop"
            options={{
              wrapAround: true,
              freeScroll: true
            }}

            style={{height: "290px"}}
          >
              {this.state.array_videos.map((item, i) => {

                // const player = "https://www.youtube.com/embed/" + item.id.videoId;

                return(
                  <div>
                  {(() => {

                          if (this.state.id == i) {
                            if(!this.props.auth.uid) {
                              return(
                                <div className={"gallery-cell posicao " + this.state.hover + " " + this.state.destaque} onMouseOver={this.handleOnHover} onMouseOut={this.handleOnOut} id={i} key={i}>
                                  <div className="video_window fade_cartoes_carrossel">
                                    <img src={item.img} className="m-1" style={{width: "300px", height: "170px", paddingLeft: "2px", paddingRight: "2px", paddingTop: "-1px", padddingBottom: "-1px", position: "relative", left: "-4px"}} alt="" />

                                    <div className="caption fade-caption" style={{display: this.state.displayFade, marginTop: "-178px", width: "100%", height: "100%", padding: "4px 2px", backgroundColor: "rgba(0,0,0,0.5)"}}>
                                      <div className="text-center">
                                        <button style={{backgroundColor: "transparent", color: "white"}} id={i} title={item.title} description={item.description}  dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID}>
                                          <i className="fas fa-play fa-5x" style={{marginTop: 50 + "px", }}></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="titulo_recomendados">
                                    <span> {item.title }</span>
                                  </div>
                                </div>
                              )
                            } else {
                            return (
                              <div className={"gallery-cell posicao " + this.state.hover + " " + this.state.destaque} onMouseOver={this.handleOnHover} onMouseOut={this.handleOnOut} id={i} key={i}>
                                 <div className="video_window fade_cartoes_carrossel">
                                   <img src={item.img} className="m-1" style={{width: "300px", height: "170px", paddingLeft: "2px", paddingRight: "2px", paddingTop: "-1px", padddingBottom: "-1px", position: "relative", left: "-4px"}} alt="" />

                                   <div className="caption fade-caption" style={{display: this.state.displayFade, marginTop: "-178px", width: "100%", height: "100%", padding: "4px 2px", backgroundColor: "rgba(0,0,0,0.5)"}}>
                                     <div id={i} title={item.title} description={item.description} dailyID={item.dailyID} vimeoID={item.vimeoID} onClick={this.toggleModal} youtubeID={item.youtubeID} className="text-center">
                                     <PlayButton rec = {this.state.rec} idrec={this.state.idlike} item={item} addRec={this.addRec} id={item.id} title={item.title} description={item.description} img={item.img} link={item.link} />
                                         </div>
                                       {/*--- DIV QUE ENGLOBA OS COMANDOS RÁPIDOS DO VÍDEO (ex. like) */}
                                     <div className="text-right ml-3 mb-2" style={{width: 270 + "px", paddingTop: 25 + "px"}}>

                                       {/*--- BOTÃO DE LIKE */}
                                         <LikeVideo click={this.state.click} idlike={this.state.idlike} item={item} addLike={this.addLike} id={item.id} title={item.title} description={item.description} img={item.img} link={item.link}/>

                                       {/*--- BOTÃO DE INFO */}
                                         <button style={{backgroundColor: "transparent", color: "white"}} id={item.id} title={item.title} description={item.description} onClick={this.toogleInfo}>
                                           <i className="fas fa-info-circle fa-2x"></i>
                                         </button>

                                       {/*--- BOTÃO DE LATER */}
                                         <SeeLater later={this.state.later} items={item} addLater={this.addLater} id={item.id} title={item.title} description={item.description} img={item.img} duration={item.duration} link={item.link}/>
                                     </div>
                                   </div>
                                 </div>
                                 <div className="titulo_recomendados">
                                   <span> {item.title }</span>
                                 </div>
                               </div>
                            )
                          }
                          } else {
                            return (
                              <div className={"gallery-cell posicao " + this.state.hover} onMouseOver={this.handleOnHover} id={i} key={i}>
                             <div className="video_window">
                               <img src={item.img} className="m-1" style={{width: "300px", height: "170px", paddingLeft: "2px", paddingRight: "2px", paddingTop: "-1px", padddingBottom: "-1px", position: "relative", left: "-4px"}} alt="" />
                             </div>
                             <div className="titulo_recomendados">
                             <span> {item.title }</span>
                             </div>
                             </div>
                            )
                          }
                        })()}
                        </div>
                )
              })}
          </Slider>
          </div>
          <ModalVideo show={this.state.isOpen} onClose={this.toggleModal} link = {array_geral} id = {this.state.id} vimeoID = {this.state.vimeoID} dailyID = {this.state.dailyID} youtubeID = {this.state.youtubeID} />
          <div className="display-desktop">
                    <InfoVideo show={this.state.info} onClose={this.toogleInfo} title={this.state.title}
                               description={this.state.description} id={this.state.id}/>
                    </div>
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

export default connect(mapStateToProps)(RecomendadosDesktop);
