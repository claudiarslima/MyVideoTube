import React, {Component} from 'react';
import Chart from "react-apexcharts";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import firebase from '../../config/fbConfig';

class Graf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desenhar: false,
            categorias: [],
            data: '',
            numeroviews: [],
        };
    }


    componentWillMount() {
        const db = firebase.firestore();
        var array_geral = [];
        var arrayCategorias = [];
        var arrayViews = [];

        db.collection("views").where('userId', '==', this.props.auth.uid).where('nrviews', '>', 0).orderBy('nrviews', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                array_geral.push(doc.data());
            });

            console.log(array_geral.length);

            if (array_geral.length > 0) {
                if (array_geral.length >= 6) {
                    console.log("MAIOR QUE 6");
                    for (let i = 0; i < 6; i++) {
                        arrayCategorias.push(array_geral[i].categoria);
                        arrayViews.push(array_geral[i].nrviews);
                    }
                }
                else if (array_geral.length < 6) {
                    console.log("MENOR QUE 6");
                    for (let i = 0; i < array_geral.length; i++) {
                        arrayCategorias.push(array_geral[i].categoria);
                        arrayViews.push(array_geral[i].nrviews);
                    }
                }
            }

            this.setState({
                categorias: arrayCategorias,
                numeroviews: arrayViews
            });

        });
    }

    render() {
      const options = {
            chart: {
                id: "basic-bar",
                type: 'line',
                height: 'auto',
                width: 'auto',
                shadow: {
                    enabled: false,
                    color: '#bbb',
                    top: 3,
                    left: 2,
                    blur: 3,
                    opacity: 1
                },

            },
            responsive: [{
                breakpoint: 575,

                options: {
                    chart: {
                        height: 250,
                        width: 300,
                    }
                }
            }],

            stroke: {
                width: 7,
                curve: 'smooth'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    gradientToColors: [ '#801336'],
                    shadeIntensity: 1,
                    type: 'horizontal',
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100]
                },
            },
            markers: {
                size: 4,
                opacity: 0.9,
                colors: ["#951539"],
                strokeColor: "#fff",
                strokeWidth: 2,

                hover: {
                    size: 7,
                }
            },

            xaxis: {
                categories: this.state.categorias
            }
            ,

        };

        const series = [
            {
                name: "views",
                data: this.state.numeroviews,
            }
        ];

        if(this.state.categorias == []) {
            return (
                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">

                            <p>You did not see any categories.</p>

                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="app" style={{marginTop: "-173px"}}>
                    <div className="row">
                        <div className="mixed-chart">
                            <Chart
                                options={options}
                                series={series}
                                type="line"
                                width="500"
                            />
                        </div>
                    </div>
                </div>
            );
        }

    }

}


const mapStateToProps = (state) => {
    return {
        views: state.firestore.ordered.views,
        auth: state.firebase.auth,
    }
};


export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {
            collection: 'views',
            where: [['userId', '==', props.auth.uid]],
            orderBy: ['nrviews', 'desc']
        }
    ])
)(Graf);
