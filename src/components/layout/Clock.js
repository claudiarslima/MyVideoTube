
import React, {Component} from 'react';
import '../../css/clock.css';
import LikeVideo from "./LikeVideo";
import SeeLater from "./SeeLater";
import SearchResult from "../dash/SearchResults";
import McriarConta from "../dash/McriarConta";
import Agregador from "../dash/Agregador";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {getFirebase} from 'react-redux-firebase';
import {getFirestore} from 'redux-firestore';
import firebase from '../../config/fbConfig';


let lol = 0;
let conta = 0;
let segundos = 0;
let minutos = 0;
let horas = 0;

class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rita: [],
            data: [],
            size: '',
            firstTime: false
        }


        this.state = this.getDate();


        this.updateArray = this.updateArray.bind(this);
    }



    getDate = () => {
        var newDate = new Date();
        var date = {};

       // date.hours = newDate.getHours();
        //date.minutes = newDate.getMinutes();
       //date.seconds = newDate.getSeconds();
        return date;
    }

    updateDate = () => {

        this.setState(this.getDate());
    }

    timeInterval = () => {
       this.timeInterval = setInterval(() => {
            this.updateDate();
            this.updateClock();
        }, 1000);
    }

    updateClock = () => {

        // const array_rita = [this.props.lol];
        // this.setState({rita: array_rita})



        let angleSeconds = segundos * 60 / 10 ;
        let angleMinutes = minutos * 6;
        let angleHours = horas/ 12 * 360;


        document.getElementById("js-seconds").style.transform =
            "translate(-50%, -100%) rotate(" + angleSeconds + "deg)";
        document.getElementById("js-minutes").style.transform =
            "translate(-50%, -100%) rotate(" + angleMinutes + "deg)";
        document.getElementById("js-hours").style.transform =
            "translate(-50%, -100%) rotate(" + angleHours + "deg)";
    }

    updateArray() {

        const arrayrita = this.props.lol;


        this.setState({rita: arrayrita})

    }

    componentDidMount() {
        this.intervalDidMount = setInterval(() => {
            this.updateClock();
            this.setState({firstTime: true})
        }, 3700);


        const db = firebase.firestore();
        var array_geral = [];

        db.collection("later").where('userId', '==', this.props.auth.uid).orderBy('createdAt', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                array_geral.push(doc.data().duration);
                const count = querySnapshot.size;

                  console.log(querySnapshot.size)

                if (querySnapshot.size >= 1) {

                  console.log(querySnapshot.size)

                    console.log(querySnapshot.size + 'estou maior que 0');
                    this.setState({size: querySnapshot.size, estado: true});

                    console.log(array_geral)

                    const l = array_geral.length;

                        console.log(l)

                        conta = 0;

                        for (let i = 0; i < l; i++) {
                             console.log(array_geral[i])

                            conta = conta + array_geral[i];

                            horas = parseInt(conta / 3600) ; //passar de segundos para horas
                            minutos = parseInt(60*((conta/3600)-Math.floor(conta/3600))); //passar de segundos para minutos
                            segundos = parseInt(60*((conta/60)-Math.floor(conta/60))); // saber quantos segundo sobram


                            console.log(horas, minutos, segundos, "dá isto2222")
                        }
                }
            });

            this.setState({
                data: array_geral
            });
        });


    }

    componentDidUpdate(prevProps) {

        if(this.props.lol !== undefined) {
            if (prevProps.lol !== this.props.lol) {

              const db = firebase.firestore();
              var array_geral = [];

              db.collection("later").where('userId', '==', this.props.auth.uid).orderBy('createdAt', 'desc').get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      array_geral.push(doc.data().duration);
                      const count = querySnapshot.size;

                        console.log(querySnapshot.size)

                      if (querySnapshot.size >= 1) {

                          console.log(querySnapshot.size + 'estou maior que 0');
                          this.setState({size: querySnapshot.size, estado: true});

                          console.log(array_geral)

                          const l = array_geral.length;

                              console.log(l)

                              conta = 0;

                              for (let i = 0; i < l; i++) {
                                   console.log(array_geral[i])

                                  conta = conta + array_geral[i];

                                  horas = parseInt(conta / 3600) ; //passar de segundos para horas
                                  minutos = parseInt(60*((conta/3600)-Math.floor(conta/3600))); //passar de segundos para minutos
                                  segundos = parseInt(60*((conta/60)-Math.floor(conta/60))); // saber quantos segundo sobram


                                  console.log(conta, minutos, segundos, "dá isto2222")
                              }


                      }
                  });

                  this.setState({
                      data: array_geral,
                      size: querySnapshot.size
                  });
              });

            }
        }else {
            // console.log("não vai dar")
        }

        if(this.state.firstTime){//condicao para que so faça o update ao relogio depois da primeira animacao no componentDidMount
            if(this.state.size == 0){
                horas = 0;
                minutos = 0;
                segundos = 0;
            }
            this.updateClock();
        }


    }

    componentWillUnmount() {
        clearInterval(this.intervalDidMount);
        clearInterval(this.timeInterval);

    }

    render() {
        console.log("Time: " + horas + ", "+minutos+", "+segundos)
        return (
            <div>
            <div className="c-clock">

                <div id="js-hours" className="c-clock__tick c-clock__tick--hours" />
                <div id="js-minutes" className="c-clock__tick c-clock__tick--minutes" />
                <div id="js-seconds" className="c-clock__tick c-clock__tick--seconds" />
            </div>

            <div className="m-auto d-flex" style={{width: "100%", color: "white"}}>

                {(() => {
                  console.log("size: "+this.state.size)
                  if(this.state.size > 0) {
                    if (horas > 1) { // caso o tempo seja superior a uma hora
                        return (
                            <div className="m-auto" style={{position: 'relative', zIndex: 2}}> <span>Tem {horas} horas, {minutos} min {segundos}  segundos de vídeo para ver.</span> </div>
                        )
                    } else if (minutos > 1) { // caso o tempo seja superior a um minuto e menor que uma hora
                        return (
                            <div className="m-auto" style={{position: 'relative', zIndex: 2}}> <span>Tem  {minutos } minutos e {segundos} segundos de vídeo para ver.</span> </div>
                        )
                    }else {
                        return ( // caso o tempo seja inferior a 1 minuto
                            <div className="m-auto" style={{position: 'relative', zIndex: 2}}> <span>Tem {segundos} segundos de vídeo para ver.</span> </div>
                        )
                    }
                  } else {
                    return ( // caso o tempo seja 0
                        <div className="m-auto" style={{position: 'relative', zIndex: 2}}> <span>Tem 0 segundos de vídeo para ver.</span> </div>
                    )
                  }
                })()}
            </div>

            </div>

        );
    }


}

const mapStateToProps = (state) => {
    return {
        likes: state.firestore.ordered.likes,
        auth: state.firebase.auth,
    }
}

const app = document.getElementById("application");


export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {
            collection: 'later',
            where: [['userId', '==', props.auth.uid]],
            orderBy: ['createdAt', 'desc']
        }
    ])
)(Clock);
