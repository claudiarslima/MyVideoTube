import React, {Component} from 'react';
import '../../css/quadrados.css';
import '../../css/css_myvideotube.css';
import '../../css/stylesheet_carrossel.css';
import '../../css/css_mobile.css';
import '../../css/menu_css.css';
import PropTypes from 'prop-types';
import Slider from './SliderSugest';
import $ from 'jquery';
import LikeVideo from '../layout/LikeVideo.js';
import SeeLater from '../layout/SeeLater.js';
import { connect } from 'react-redux';
import {Swipe, Position} from "react-swipe-component";
import rec1 from "../../img/recomendados/img1.png";
import rec2 from "../../img/recomendados/img2.png";
import rec3 from "../../img/recomendados/img3.png";
import rec4 from "../../img/recomendados/img4.png";
import rec5 from "../../img/recomendados/img5.png";
import rec6 from "../../img/recomendados/img6.png";
import rec7 from "../../img/recomendados/img7.png";
import rec8 from "../../img/recomendados/img8.png";
import urlParser from "js-video-url-parser";

const images = [rec1, rec2, rec3, rec4, rec5, rec6, rec7, rec8, rec8, rec8, rec8, rec8, rec8, rec8, rec8, rec8,];

var array_geral = []
class ModalVideo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vimeo: [],
            daily: [],
            yt: [],
            array_videos: [],
            array_shuffle: [],
            vimeoID: ' ',
            id: ' ',
            load: false,
            trade: true,
            openDescription: '',
            altura: 0,
            counter: 0,
            visibilityDescricao: 'hidden',
            idbotao: ' ',
            mostarBotoes: 'none',
            later: false,
            click: false
        }
        this.VideoRecommended = this.VideoRecommended.bind(this);


    }

    tradeVideo = (e) => {


        this.setState({trade: false, id: e.currentTarget.id, counter: 0})

    }

    VideoRecommended() {

        const vimeoURL = 'https://api.vimeo.com/videos/' + this.props.vimeoID + '/videos?filter=related&per_page=10&access_token=d2f6be440960fe41b9766ffafcbe6bdd';
        const dailyURL = 'https://api.dailymotion.com/video/' + this.props.dailyID + '/related&fields=id,thumbnail_360_url,title,embed_url,description,duration&thumbnail_ratio=widescreen&language=eng';
        const finalURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=' + this.props.youtubeID + '&type=video&key=AIzaSyDhsERNhsX0wnS3dW-Vc9eMykFvrLKeqQ8&maxResults=10';

        fetch(vimeoURL)
            .then((resp) => resp.json())
            .then((resp) => {
                this.setState({vimeo: resp.data})

                fetch(dailyURL)
                    .then((resp) => resp.json())
                    .then((resp) => {
                        this.setState({daily: resp.list})

                        fetch(finalURL)
                            .then((resp) => resp.json())
                            .then((resp) => {
                                this.setState({yt: resp.items})


                                for(let i in this.state.yt) {
                                    array_geral.push({
                                        "id": this.state.yt[i].id.videoId,
                                        "title": this.state.yt[i].snippet.title,
                                        "description": this.state.yt[i].snippet.description,
                                        "img": this.state.yt[i].snippet.thumbnails.medium.url,
                                        "link": "https://www.youtube.com/embed/" + this.state.yt[i].id.videoId,
                                        "youtubeID": this.state.yt[i].id});
                                }

                                for (let i in this.state.vimeo) {
                                    array_geral.push({
                                        "id": this.state.vimeo[i].uri.substr(8),
                                        "title": this.state.vimeo[i].name,
                                        "description": this.state.vimeo[i].description,
                                        "img": this.state.vimeo[i].pictures.sizes[2].link,
                                        "link": 'https://player.vimeo.com/video/' + this.state.vimeo[i].uri.substr(8),
                                        "vimeoID": this.state.vimeo[i].uri.substr(8),
                                        "duration": this.state.vimeo[i].duration})
                                }

                                for (let i in this.state.daily) {
                                    array_geral.push({
                                        "id": this.state.daily[i].id,
                                        "title": this.state.daily[i].title,
                                        "description": this.state.daily[i].description,
                                        "img": this.state.daily[i].thumbnail_360_url,
                                        "link": this.state.daily[i].embed_url,
                                        "dailyID": this.state.daily[i].id,
                                        "duration": this.state.daily[i].duration});
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

                            }).catch((error) => {
                            console.error(error)
                        })
                    }).catch((error) => {
                    console.error(error)
                })
            }).catch((error) => {
            console.error(error)
        });
    }

    componentDidUpdate(prevProps) {
        console.log(window.location.hash, "hash é esta")
        if(window.location.pathname + window.location.hash !== '/Favoritos#/modal' && window.location.pathname + window.location.hash !== '/Later#/modal') {
            if(this.props.vimeoID !== null) {
                if(prevProps.vimeoID !== this.props.vimeoID) {
                    this.VideoRecommended(this.props.vimeoID);
                }
            } else if(this.props.dailyID !== null) {
                if(prevProps.dailyID !== this.props.dailyID) {
                    this.VideoRecommended(this.props.dailyID);
                }
            } else if (this.props.youtubeID !== null) {
                if(prevProps.youtubeID !== this.props.youtubeID) {
                    this.VideoRecommended(this.props.youtubeID);

                }
            } else {
                array_geral.length = 0;
                if(this.state.trade == false) {
                    this.setState({trade: true})
                }
            }


        }

        if(this.props.show){
            if(this.state.counter == 0){
                this.setState({
                    altura : $("#descricao").height(),
                    counter : 1
                })
                this.interval = setInterval(() => {
                    this.displayDescricao();
                }, 3000);
            }
            console.log("contador " + this.state.counter)
        }

    }

    displayDescricao(){
        this.setState({
            visibilityDescricao: 'visible'
        })
    }

    btnDescription = () => {
        if(this.state.openDescription !== 'open') {
            this.setState({openDescription: 'open'})
        } else {
            this.setState({openDescription: ''})
        }
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

    addLater = (e) => {
        e.preventDefault();

        console.log("ver mais tarde " + e.currentTarget.id)
    };

    addLike = (e) => {
        e.preventDefault();
    };


    render() {

        console.log(this.props.link, "asdasda");

        const vimeoURL = this.props.vimeoID;

        if(!this.props.show) {
            return null;
        }

        const parseUrl = urlParser.parse(this.props.link[this.props.id].link);

        let videoUrl = '';
        if (parseUrl.provider === 'vimeo') {
            console.log("OLÁAAA   " + this.props.link[this.props.id].link);
            videoUrl = this.props.link[this.props.id].link + '?title=0&byline=0&portrait=0&badge=0&transparent=0&&color=801336&player_id=0&app_id=143800';
            console.log("ADEUSSSs  " + videoUrl)
        }
        else if (parseUrl.provider === 'dailymotion') {
            videoUrl = this.props.link[this.props.id].link + '?sharing-enable=false&ui-start-screen-info=false&ui-logo=false&ui-theme=dark&queue-enable=false';
        }
        else if (parseUrl.provider === 'youtube') {
            let you = this.props.link[this.props.id].link.substr(0,19);
            let tube = this.props.link[this.props.id].link.substr(19);
            videoUrl = you + "-nocookie" + tube;
        }

        return (
            <div className='modal-aberta'>
                <div className='modal-videos'>
                    {(() => {
                        if(window.location.pathname + window.location.hash !== '/Favoritos#/modal' && window.location.pathname + window.location.hash !== '/Later#/modal') {
                            // console.log("no iframe", window.location.pathname + window.location.hash)
                            console.log(console.log("link: "+ window.location.pathname + window.location.hash));
                            if (this.state.trade && this.props.link.length > 0 && this.props.link[this.props.id]) {


                                return(
                                    <div style={{height: '100%'}}>
                                        <iframe style={{width: '100%'}} width={853} height={480} src={videoUrl} frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                        <Slider className="mr-3 ml-3 gallery js-flickity carrossel_desktop"
                                                options={{
                                                    wrapAround: true,
                                                    freeScroll: true
                                                }}
                                                style={{height: "290px"}} id="slider">
                                            {this.state.array_videos.map((item, i) => (
                                                <div className="posicao gallery" onClick={this.tradeVideo} id={i} key={i}>
                                                    <div className="video_window">
                                                        <img src={item.img} className="m-1" style={{
                                                            width: "170px",
                                                            height: "auto",
                                                            padding: "2px"
                                                        }} alt="" />
                                                    </div>
                                                    <div className="titulo_recomendados"><span> {item.title} </span> </div>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div style={{height: '100%'}}>
                                        <iframe style={{width: '100%'}} width={853} height={480} src={array_geral[this.state.id].link} frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                        <Slider className="mr-3 ml-3 gallery js-flickity carrossel_desktop"
                                                options={{
                                                    wrapAround: true,
                                                    freeScroll: true
                                                }}
                                                style={{height: "290px"}} id="slider">
                                            {this.state.array_videos.map((item, i) => (
                                                <div className="posicao gallery" onClick={this.tradeVideo} id={i} key={i}>
                                                    <div className="video_window">
                                                        <img src={item.img} className="m-1" style={{
                                                            width: "170px",
                                                            height: "auto",
                                                            padding: "2px"
                                                        }} alt="" />
                                                    </div>
                                                    <div className="titulo_recomendados"><span> {item.title} </span> </div>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                )
                            }
                        }
                        else {
                            return (
                                <div style={{height: '100%'}}>
                                    <iframe style={{width: '100%'}} width={853} height={480} src={videoUrl} frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                </div>
                            )

                        }
                    })()}
                    <div className='close-videos display-desktop' onClick={this.props.onClose}>
                    </div>
                </div>

                <div style={{position: 'absolute', top: '275px'}} className="display-mobile">
                    {(() => {
                        if(window.location.pathname + window.location.hash !== '/Favoritos#/modal' && window.location.pathname + window.location.hash !== '/Later#/modal') {
                            if (this.state.trade && this.props.link.length > 0 && this.props.link[this.props.id]) {
                                return ( //quando carrega o primeiro video
                                    <div>
                                        <div className="row" style={{marginBottom: '25px'}}>
                                            <div className=" ml-3 mt-4 mb-4 under-videos" style={{width: "100%"}}>
                                                <LikeVideo click={this.state.click}
                                                           addLike={this.addLike} id={this.props.link[this.props.id].id} title={this.props.link[this.props.id].title}
                                                           description={this.props.link[this.props.id].description} img={this.props.link[this.props.id].img} link={this.props.link[this.props.id].link}/>
                                                <SeeLater later={this.state.later}
                                                          addLater={this.addLater} id={this.props.link[this.props.id].id} title={this.props.link[this.props.id].title}
                                                          description={this.props.link[this.props.id].description} img={this.props.link[this.props.id].img} link={this.props.link[this.props.id].link} duration={this.props.link[this.props.id].duration}/>
                                            </div>
                                            <div className="titulo_sugestoes">
                                                <span>{this.props.link[this.props.id].title}</span>
                                            </div>
                                            <div className="abrir-descricao">
                                                {this.state.openDescription == 'open'? <i class="fas fa-sort-up fa-2x" style={{paddingTop: '9px'}} onClick={this.btnDescription}></i>: <i class="fas fa-sort-down fa-2x" onClick={this.btnDescription}></i> }
                                            </div>
                                        </div>
                                        <div id="descricao" className="description-mobile-sugestoes" style={{height: 'auto', visibility: this.state.visibilityDescricao}}>
                                            <span> {this.props.link[this.props.id].description} </span>
                                        </div>
                                        <div className={"sugestoes-mobile " + this.state.openDescription} style={{top: - 20 - this.state.altura + "px"}}>

                                            <div className="row square ">
                                                {this.state.array_videos.map((item, i) => {
                                                    return(
                                                        <div className="card largura quickview aumento" id={i} style={{margin: 'auto'}}>

                                                            {(() => {
                                                                console.log(item)


                                                                if (this.state.idbotao == i) {
                                                                    console.log("-----",item)
                                                                    return (
                                                                        <div className="altura">
                                                                            <div className="card_categoria" onClick={this.tradeVideo} id={i}
                                                                                 key={i}>
                                                                                <img src={item.img} className="card-img-top cartao"/>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-11 titulo-video">
                                                                                    <span> {item.title} </span>
                                                                                </div>
                                                                                <i style={{
                                                                                    color: "white",
                                                                                    position: 'absolute',
                                                                                    right: 0,
                                                                                    padding: "6px"
                                                                                }} class="fas fa-ellipsis-v" onClick={this.displayButtons}
                                                                                   id={i}></i>
                                                                            </div>
                                                                            <div className="botoes-mobile"
                                                                                 style={{display: this.state.mostarBotoes}}>
                                                                                <LikeVideo click={this.state.click} item={item}
                                                                                           addLike={this.addLike} id={i} title={item.title}
                                                                                           description={item.description} img={item.img}/>

                                                                                {/*--- BOTÃO DE INFO */}
                                                                                <div className="botao-info-mobile"
                                                                                     onClick={this.toogleInfo}>
                                                                                    <button style={{
                                                                                        backgroundColor: "transparent",
                                                                                        color: "white", width: '100%'
                                                                                    }} id={item.id} title={item.title}
                                                                                            description={item.description}>
                                                                                        <i className="fas fa-info-circle fa-2x"
                                                                                           style={{float: 'left', marginRight: '1rem'}}></i>
                                                                                        <div className="display-mobile"
                                                                                             style={{padding: '6px', textAlign: 'left'}}>
                                                                        <span style={{
                                                                            textAlign: 'left',
                                                                            marginTop: '5px',
                                                                            width: '90%'
                                                                        }}>Info</span>
                                                                                        </div>
                                                                                    </button>
                                                                                </div>
                                                                                {/*--- BOTÃO DE LATER */}
                                                                                <SeeLater later={this.state.later} items={item}
                                                                                          addLater={this.addLater} id={i} title={item.title}
                                                                                          description={item.description} img={item.img} duration={item.duration}/>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                                else {
                                                                    return (
                                                                        <div className="altura">
                                                                            <div className="card_categoria" onClick={this.tradeVideo} id={i}
                                                                                 key={i}>
                                                                                <img src={item.img} className="card-img-top cartao"/>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-11 titulo-video">
                                                                                    <span> {item.title} </span>
                                                                                </div>
                                                                                <i style={{
                                                                                    color: "white",
                                                                                    position: 'absolute',
                                                                                    right: 0,
                                                                                    padding: "6px"
                                                                                }} class="fas fa-ellipsis-v" onClick={this.displayButtons}
                                                                                   id={i}></i>
                                                                            </div>
                                                                            <div className="botoes-mobile" style={{display: 'none'}}>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            })()}
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (//quando carrega um video sugerido
                                    <div>
                                        <div className="row" style={{marginBottom: '25px'}}>
                                            <div className=" ml-3 mt-4 mb-4 under-videos" style={{width: "100%"}}>
                                                <LikeVideo click={this.state.click}
                                                           addLike={this.addLike} id={array_geral[this.state.id].id} title={array_geral[this.state.id].title}
                                                           description={array_geral[this.state.id].description} img={array_geral[this.state.id].img}/>
                                                <SeeLater later={this.state.later}
                                                          addLater={this.addLater} id={array_geral[this.state.id].id} title={array_geral[this.state.id].title}
                                                          description={array_geral[this.state.id].description} img={array_geral[this.state.id].img} duration={array_geral[this.state.id].duration}/>
                                            </div>
                                            <div className="titulo_sugestoes">
                                                <span>{array_geral[this.state.id].title}</span>
                                            </div>
                                            <div className="abrir-descricao">
                                                {this.state.openDescription == 'open'? <i class="fas fa-sort-up fa-2x" style={{paddingTop: '9px'}} onClick={this.btnDescription}></i>: <i class="fas fa-sort-down fa-2x" onClick={this.btnDescription}></i> }
                                            </div>
                                        </div>
                                        <div id="descricao" className="description-mobile-sugestoes" style={{height: 'auto', visibility: this.state.visibilityDescricao}}>
                                            <span> {array_geral[this.state.id].description} </span>
                                        </div>
                                        <div className={"sugestoes-mobile " + this.state.openDescription} style={{top: - 20 - this.state.altura + "px"}}>
                                            <div className="row square ">
                                                {this.state.array_videos.map((item, i) => {
                                                    return(
                                                        <div className="card largura quickview aumento" id={i} style={{margin: 'auto'}}>
                                                            {(() => {
                                                                console.log(item)
                                                                if (this.state.idbotao == i) {
                                                                    console.log("-----",item)
                                                                    return (
                                                                        <div className="altura">
                                                                            <div className="card_categoria" onClick={this.tradeVideo} id={i}
                                                                                 key={i}>
                                                                                <img src={item.img} className="card-img-top cartao"/>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-11 titulo-video">
                                                                                    <span> {item.title} </span>
                                                                                </div>
                                                                                <i style={{
                                                                                    color: "white",
                                                                                    position: 'absolute',
                                                                                    right: 0,
                                                                                    padding: "6px"
                                                                                }} class="fas fa-ellipsis-v" onClick={this.displayButtons}
                                                                                   id={i}></i>
                                                                            </div>
                                                                            <div className="botoes-mobile"
                                                                                 style={{display: this.state.mostarBotoes}}>
                                                                                <LikeVideo click={this.state.click} item={item}
                                                                                           addLike={this.addLike} id={i} title={item.title}
                                                                                           description={item.description} img={item.img}/>

                                                                                {/*--- BOTÃO DE INFO */}
                                                                                <div className="botao-info-mobile"
                                                                                     onClick={this.toogleInfo}>
                                                                                    <button style={{
                                                                                        backgroundColor: "transparent",
                                                                                        color: "white", width: '100%'
                                                                                    }} id={item.id} title={item.title}
                                                                                            description={item.description}>
                                                                                        <i className="fas fa-info-circle fa-2x"
                                                                                           style={{float: 'left', marginRight: '1rem'}}></i>
                                                                                        <div className="display-mobile"
                                                                                             style={{padding: '6px', textAlign: 'left'}}>
                                                                                            <span style={{
                                                                                                textAlign: 'left',
                                                                                                marginTop: '5px',
                                                                                                width: '90%'
                                                                                            }}>Info</span>
                                                                                        </div>
                                                                                    </button>
                                                                                </div>
                                                                                {/*--- BOTÃO DE LATER */}
                                                                                <SeeLater later={this.state.later} items={item}
                                                                                          addLater={this.addLater} id={i} title={item.title}
                                                                                          description={item.description} img={item.img} duration={item.duration}/>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                                else {
                                                                    return (
                                                                        <div className="altura">
                                                                            <div className="card_categoria" onClick={this.tradeVideo} id={i}
                                                                                 key={i}>
                                                                                <img src={item.img} className="card-img-top cartao"/>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-11 titulo-video">
                                                                                    <span> {item.title} </span>
                                                                                </div>
                                                                                <i style={{
                                                                                    color: "white",
                                                                                    position: 'absolute',
                                                                                    right: 0,
                                                                                    padding: "6px"
                                                                                }} class="fas fa-ellipsis-v" onClick={this.displayButtons}
                                                                                   id={i}></i>
                                                                            </div>
                                                                            <div className="botoes-mobile" style={{display: 'none'}}>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            })()}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                        else{
                            return(//quando carrega um video dos favoritos ou later
                                <div>
                                    <div className="row" style={{marginBottom: '25px'}}>
                                        <div className=" ml-3 mt-4 mb-4 under-videos" style={{width: "100%"}}>
                                            <LikeVideo click={this.state.click}
                                                       addLike={this.addLike} id={this.props.link[this.props.id].id} title={this.props.link[this.props.id].title}
                                                       description={this.props.link[this.props.id].description} img={this.props.link[this.props.id].img}/>
                                            <SeeLater later={this.state.later}
                                                      addLater={this.addLater} id={this.props.link[this.props.id].id} title={this.props.link[this.props.id].title}
                                                      description={this.props.link[this.props.id].description} img={this.props.link[this.props.id].img} duration={this.props.link[this.props.id].duration}/>
                                        </div>
                                        <div className="titulo_sugestoes">
                                            <span>{this.props.link[this.props.id].title}</span>
                                        </div>
                                    </div>
                                    <div id="descricao" className="description-mobile-sugestoes" style={{height: 'auto', visibility: 'visible'}}>
                                        <span> {this.props.link[this.props.id].description} </span>
                                    </div>
                                </div>
                            )
                        }
                    })()}
                </div>
            </div>
        );
    }
}

ModalVideo.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        carrosel: state.carrosel.img
    }
}
export default connect(mapStateToProps)(ModalVideo);
