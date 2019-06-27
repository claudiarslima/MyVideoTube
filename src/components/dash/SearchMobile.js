import React, {Component} from 'react';
import Navbar from '../layout/Navbar.js';
import Footer from '../layout/Footer.js';
import Loading from '../layout/Loading.js';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import SearchResMob from "./SearchResMob";


class SearchMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: '',
            result: false,
            loading: true
        };
        this.onChange = this.onChange.bind(this);
    }



    onChange(event) {
        this.setState({dados: event.target.value});

    }

    endLoading(){
        this.setState({
            loading: false
        })
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this.endLoading();
        }, 3000);
    }

    render() {

      console.log(this.props.location.key)
        // const { auth } = this.props;
        //
        // if (!auth.uid) {
        //     return <Redirect to='/login'/>;
        // }


        return (
            <div>
                {(() => {
                    if (this.state.loading) {
                        return(
                            <Loading />
                        )
                    }
                })()}

                <div className="d-flex toggled tamanho_pesquisa_mobile" id="wrapper" style={{minHeight: "93vh"}}>
                    <Navbar/>
                    <div id="page-content-wrapper" className="display-mobile">

                        <div className="container d-flex justify-content-center mt-5">
                            <svg style={{display: "none"}}>
                                <symbol id="magnify" viewBox="0 0 18 18" height="100%" width="100%">
                                    <path
                                        d="M12.5 11h-.8l-.3-.3c1-1.1 1.6-2.6 1.6-4.2C13 2.9 10.1 0          6.5 0S0 2.9 0 6.5 2.9 13 6.5 13c1.6 0 3.1-.6 4.2-1.6l.3.3v.8l5 5          1.5-1.5-5-5zm-6 0C4 11 2 9 2 6.5S4 2 6.5 2 11 4 11 6.5 9 11 6.5            11z"
                                        fill="#fff" fillRule="evenodd"/>
                                </symbol>
                            </svg>

                            <div className="seacrh_search-bar mt-5">
                                <input type="text" className="seacrh_input" onChange={(event) => this.onChange(event)}
                                       placeholder="Search for a video"/>
                                <span className="seacrh_highlight"/>
                                <div className="seacrh_search-btn">
                                    <svg className="seacrh_icon seacrh_icon-18">
                                        <use xlinkHref="#magnify"/>
                                    </svg>
                                </div>
                            </div>

                        </div>
                        <span className="text-center d-flex justify-content-center mt-3"
                              style={{color: "white", fontSize: "10px"}}> Can't find the video you want to watch? Search here. </span>
                        <SearchResMob result={this.state.dados} />

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(SearchMobile);
