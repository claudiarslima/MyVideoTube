import React, {Component} from 'react';
import { connect } from 'react-redux';

const array_geral = [];

class Search extends Component {
  constructor(props) {
    super(props)


  this.state = {
      ytvideo: [],
      vimeovideo: [],
      array_videos: []
  }
  this.VideoList = this.VideoList.bind(this);
}

// VideoList(url) {
//   const finalURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + url + '&key=AIzaSyDhsERNhsX0wnS3dW-Vc9eMykFvrLKeqQ8'
//
//   fetch(finalURL)
//   .then((resp) => resp.json())
//   .then((resp) => {
//     this.setState({ytvideo: resp.items})
//
//     for(let i in this.state.ytvideo) {
//       // console.log(this.state.ytvideo[i].snippet.title)
//       // console.log(this.state.ytvideo[i].id.videoId)
//       // console.log(this.state.ytvideo[i].snippet.thumbnails.medium.url)
//          array_geral.push({"id": this.state.ytvideo[i].id, "title": this.state.ytvideo[i].snippet.title, "img": this.state.ytvideo[i].snippet.thumbnails.medium.url});
//          console.log(this.state.ytvideo[i].id)
//     }
//
//     this.setState({array_videos: array_geral, display: "block"})
//     console.log(this.state.display)
//     console.log(this.state.array_videos)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// }

VideoList(url) {
  const vimeoURL = 'https://api.vimeo.com/videos?query=' + url + '&per_page=10&access_token=d2f6be440960fe41b9766ffafcbe6bdd'

  fetch(vimeoURL)
  .then((resp) => resp.json())
  .then((resp) => {
    this.setState({vimeovideo: resp.data})

    for(let i in this.state.vimeovideo) {
      // console.log(this.state.ytvideo[i].snippet.title)
      // console.log(this.state.ytvideo[i].id.videoId)
      // console.log(this.state.ytvideo[i].snippet.thumbnails.medium.url)
        array_geral.push({"id": this.state.vimeovideo[i].uri, "title": this.state.vimeovideo[i].name, "img": this.state.vimeovideo[i].pictures.sizes[3].link});
         console.log(this.state.array_videos)
    }

    this.setState({array_videos: array_geral, display: "block"})
    console.log(this.state.display)
    console.log(this.state.array_videos)
  })
  .catch((error) => {
    console.error(error)
  })
  .catch((error) => {
    console.error(error)
  })
}

getinfo = (s) => {

  if(s !== this.search && s.length > 2){
    this.search = s
  this.VideoList(s)
}
}
//
// componentDidMount() {
// this.VideoList();
// }

componentDidUpdate(prevProps){
  if(prevProps.text !== this.props.text){

    this.getinfo(this.props.text)
  }
}

  render() {
    return(
      <div>
      {this.state.array_videos.map((item, i) => {
                console.log(item);

                const player = "https://www.youtube.com/embed/" + item.id;
                return(
                  <div class="card largura quickview aumento" id={i}  >
                    <div class="card_categoria" >
                      <img class="card-img-top cartao " src={item.img} />
                      </div>
                      <span class=""> {item.title} </span>
                  </div>
                )
              })}
      </div>
    )
  }
}

export default Search;
