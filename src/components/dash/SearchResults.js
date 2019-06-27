import React, {Component} from 'react';
import ModalVideo from '../layout/ModalVideo';
import LikeVideo from "../layout/LikeVideo";
import SeeLater from "../layout/SeeLater";
import '../../css/quadrados.css';
import '../../css/css_myvideotube.css';
import '../../css/stylesheet_carrossel.css';



const array_geral = [];

class SearchResult extends Component {

    constructor(props) {
        super(props)

        this.state = {
            vimeovideo: ' ',
            ytvideo: ' ',
            array_videos: [],
            isOpen: false,
            id: ' ',
            info: false,
            click: false,
            later: false,
            idlike: '',
            dailyvideo: [],
            array_shuffle: [],
            title: ' ',
            description: ' ',
            img: ' ',
            vimeoID: ' ',
            dailyID: '',
            youtubeID: '',
            mostarBotoes: 'none',
            idbotao: ' ',
            videomobile: 'none',
            loading: true,
            duration: '',
        }


        console.log(this.props)
    }

    addLike = (e) => {
        e.preventDefault();
    }


    addLater = (e) => {
        e.preventDefault();

        console.log("ver mais tarde " + e.currentTarget.id)
    }

    toggleModal = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        });

        console.log(e.currentTarget.id)
        this.setState({id: e.currentTarget.id})
    }

    fetchFirst(url) {
        if (url) {

            //  console.log(url)

            const vimeoURL = 'https://api.vimeo.com/videos?query=' + url + '&per_page=10&access_token=d2f6be440960fe41b9766ffafcbe6bdd&maxResults=3';
            const finalURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + url + '&key=AIzaSyDhsERNhsX0wnS3dW-Vc9eMykFvrLKeqQ8'
            const dailyURL = 'https://api.dailymotion.com/videos?fields=id,thumbnail_360_url,title,embed_url,description,duration&thumbnail_ratio=widescreen&language=eng&search=' + url + '';

            fetch(finalURL)
                .then((resp) => resp.json())
                .then((resp) => {
                        this.setState({ytvideo: resp.items})
                        //  console.log(resp.data)
                        //    console.log(this.state.vimeovideo)

                        fetch(vimeoURL)
                            .then((resp) => resp.json())
                            .then((resp) => {
                                this.setState({vimeovideo: resp.data})

                                fetch(dailyURL)
                                    .then((resp) => resp.json())
                                    .then((resp) => {
                                        this.setState({dailyvideo: resp.list})
                                        //      console.log(this.state.dailyvideo)

                                        for (let i in this.state.dailyvideo) {
                                          array_geral.push({"id": this.state.dailyvideo[i].id, "title": this.state.dailyvideo[i].title, "description": this.state.dailyvideo[i].description, "img": this.state.dailyvideo[i].thumbnail_360_url, "link": this.state.dailyvideo[i].embed_url, "dailyID": this.state.dailyvideo[i].id, "duration": this.state.dailyvideo[i].duration});

                                            //      console.log(this.state.dailyvideo[i].embed_url)
                                        }

                                        for (let i in this.state.vimeovideo) {
                                          array_geral.push({"id": this.state.vimeovideo[i].uri.substr(8), "title": this.state.vimeovideo[i].name, "description": this.state.vimeovideo[i].description, "img": this.state.vimeovideo[i].pictures.sizes[2].link, "link": 'https://player.vimeo.com/video/' + this.state.vimeovideo[i].uri.substr(8), "vimeoID": this.state.vimeovideo[i].uri.substr(8), "duration": this.state.vimeovideo[i].duration});


                                            //      console.log(this.state.vimeovideo[i].uri.substr(8))
                                        }

                                        for (let i in this.state.ytvideo) {
                                            // console.log(this.state.ytvideo[i].snippet.title)
                                            // console.log(this.state.ytvideo[i].id.videoId)
                                            // console.log(this.state.ytvideo[i].snippet.thumbnails.medium.url)
                                            array_geral.push({"id": this.state.ytvideo[i].id, "title": this.state.ytvideo[i].snippet.title, "description": this.state.ytvideo[i].snippet.description, "img": this.state.ytvideo[i].snippet.thumbnails.medium.url, "link": "https://www.youtube.com/embed/" + this.state.ytvideo[i].id, "youtubeID": this.state.ytvideo[i].id});

                                            //    console.log("https://www.youtube.com/embed/" + this.state.ytvideo[i].id.videoId)
                                        }

                                        this.setState({array_videos: array_geral})
                                        //      console.log(array_geral.length)

                                        const videos = this.state.array_videos;

                                        //    console.log(videos)

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
//  console.log(this.state.array_shuffle)


                                    }).catch((error) => {
                                    console.error(error)
                                })
                            })
                            .catch((error) => {
                                console.error(error)
                            })


                    }
                )
        } else {
            this.array_geral = null;

            console.log("aqui")

        }

    }


    render() {
        return (
            <div id="ola" style={{backgroundColor: "red", zIndex: 1000}}>

                {/*as classes "animated slideInUp e delay" dfazem a aniamção da div a subir quando se pesquisa*/}
                <div className="col-lg-12 display-desktop animated slideInUp delay-4" id="teste" style={{
                    backgroundColor: "black",
                    marginTop: -158 + "px",
                    position: "absolute",
                    zIndex: 1200,
                    display: "block"
                }}>

                    {/*quando se clica neste botão a div dos resultados da pesquisa fica em none*/}
                    <button onClick={this.props.action} id="" style={{
                        float: "right", marginTop: 30 + "px", paddding: 20 + "px", backgroundColor: "transparent"
                    }}><i className="fas fa-times" style={{color: "white"}}></i>
                    </button>

                    {/*titulo*/}
                    <h4 className="mt-5 ml-2" id="lo" style={{color: 'white'}}>Searched By "{this.props.result}"</h4>

                    <hr className="ml-2"
                        style={{background: 'linear-gradient(90deg, #801336, transparent)', height: '1px', border: 0}}/>


                    <div class="row mt-5 square" id="content"
                         style={{paddingLeft: 1.4 + 'rem', paddingRight: 1.4 + 'rem'}}>
                        {this.state.array_videos.length === 0 || this.props.result == " " ?
                            <div className="col-lg-12 mx-auto" style={{
                                height: "100px",
                                border: "1px solid rgba(0,0,0,.125)",
                                padding: "35px",
                                color: "lightgray"
                            }}>Video not found.</div>
                            :
                            this.state.array_videos.map((item, i) => {

                                const player = "https://www.youtube.com/embed/" + item.id;
                                return (
                                    <div className="card largura quickview aumento fade_cartoes" id={i} key={i}
                                         onClick={this.toggleModal}>
                                        <div className="card_categoria">
                                            <img className="card-img-top cartao " src={item.img}/>
                                            <span className="caption fade-caption">
                                                             <div className="text-center">
                                                             <button style={{
                                                                 backgroundColor: "transparent",
                                                                 color: "white"
                                                             }} id={i} title={item.title} description={item.description}
                                                                     dailyID={item.dailyID} vimeoID={item.vimeoID}
                                                                     onClick={this.toggleModal}
                                                                     youtubeID={item.youtubeID}>
                                                                 <i className="fas fa-play fa-5x"
                                                                    style={{marginTop: 50 + "px",}}></i>
                                                             </button>
                                                             </div>
                                                {/*--- DIV QUE ENGLOBA OS COMANDOS RÁPIDOS DO VÍDEO (ex. like) */}
                                                <div className="text-right mb-2"
                                                     style={{
                                                         width: 270 + "px",
                                                         paddingRight: 20 + "px",
                                                         paddingTop: 10 + "px"
                                                     }}>

                                                    {/*--- BOTÃO DE LIKE */}

                                                   <LikeVideo click={this.state.click} item={item} addLike={this.addLike}
                                                   id={item.id} title={item.title} description={item.description}
                                                   img={item.img}/>


                                                    {/*--- BOTÃO DE INFO */}
                                                    <button style={{backgroundColor: "transparent", color: "white"}}
                                                            click={this.state.click} item={item} addLike={this.addLike}
                                                            id={item.id}
                                                            title={item.title} description={item.description}
                                                            img={item.img}
                                                            onClick={this.toogleInfo}>
                                                                 <i className="fas fa-info-circle fa-2x"></i></button>

                                                    {/*--- BOTÃO DE LATER */}
                                                    <SeeLater later={this.state.later} items={item}
                                                              addLater={this.addLater}
                                                              id={item.id} title={item.title}
                                                              description={item.description}
                                                              img={item.img} duration={item.duration}/>
                                                             </div>

                                                         </span>
                                        </div>
                                        <span className=""> {item.title} </span>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
                <ModalVideo show={this.state.isOpen} onClose={this.toggleModal} link={array_geral} id={this.state.id}/>
            </div>
        )
    }

    componentDidUpdate(prevProps) {

        if (prevProps.result !== this.props.result) {

            this.getinfo(this.props.result)

            console.log("s " + prevProps.result)
            console.log("s11 " + this.props.result)
        }
    }

    getinfo = (s) => {

        if (s !== this.search) {
            this.search = s
            this.fetchFirst(s)
        } else {
            array_geral.length = 0;
            //  this.fetchFirst(null)
            console.log(array_geral)
        }
    }
}


export default SearchResult;
