import React, {Component} from 'react';
import Navbar from '../layout/Navbar.js';
import Footer from '../layout/Footer.js';
import Loading from '../layout/Loading.js';
import fundo from "../../img/teste_funco_perfil.jpg";
import {connect} from 'react-redux';
import {LogOut} from '../../store/actions/authActions';
import {Link} from 'react-router-dom';
import user from "../../img/user.jpg";
import { Redirect } from 'react-router-dom';
import { firebase } from '../../config/fbConfig';
import { Button } from 'react-bootstrap';
import {storage} from '../../config/fbConfig'
import { Collapse } from 'react-bootstrap';
import Graf  from '../layout/Graf.js';




class Perfil extends Component {
constructor(props) {
    super(props)
    this.state = {
        open: false,
        input: '',
        areadados: 'true',
        areastat: 'false',
        estado: ' ',
        estadodados: 'active',
        estadostat: '',
        activedados: 'show active',
        activestat: '',
        collapsesec: '',
        ariacollapse: 'false',
        loading: true,
        authenticated: false,
        user: null,
        editar: false,
        estadoinput: 'disabled',
        url: 'https://via.placeholder.com/150',

    };
}

componentDidMount () {

  if(!this.props.auth.uid) {
    console.log("n logado")
    this.setState({estado_login: false})
  } else {
    const pictRef = storage.ref(`images/`).child(this.props.auth.uid);
    pictRef.getDownloadURL().then(url => {
        this.setState({url})
    })
    this.setState({estado_login: true})
  }

    console.log(this.props.auth)

    // const pictRef = storage.ref(`images/`).child(this.props.auth.uid);
    // pictRef.getDownloadURL().then(url => {
    //     this.setState({url})
    // })

    this.interval = setInterval(() => {
        this.endLoading();
    }, 3000);
}

    endLoading(){
        this.setState({
            loading: false
        })
    }


    //evento para fazer o click do botão de logout
    logout = (e) => {
        e.preventDefault();
        this.props.LogOut(this.state);
    };

    //evento para fazer o click do botão de editar dados
    editar = () => {
        this.setState({editar: true});

    };

    //eventos para fazer a alteração do estado active das divs
    alterarEstadodados = () => {
        this.setState({estadodados: 'active', estadostat: '', activedados: 'show active', activestat: ''});

    };

    alterarEstadostat = () => {
        this.setState({estadodados: '', estadostat: 'active', activedados: 'show', activestat: 'active show' });
    };




    render() {



        const {voltar, loading, authenticated, editar} = this.state;
        const {auth, profile} = this.props;


        //quando o utilizador não está logado é redirecionado para a página de login



        //quando o utilizador clica no botão "editar dados" é redirecionado para a página onde pode fazê-lo
        if (editar) {
            return <Redirect to='/EditarDados'/>;
        }

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
                <div id="page-content-wrapper" className="pt-5 mt-4">

                    <div className="container" id="div_mobile_prf" style={{padding: 0}}>
                        <div className="row justify-content-center" style={{backgroundColor: "black"}}>
                            <div className="" style={{width: "100%"}}>
                                <div className="justify-content-center text-center"
                                     style={{
                                         backgroundImage: "url(" + fundo + ")",
                                         height: "200px",
                                         width: "100%"
                                     }}>
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(to top, rgba(0, 0, 3, 1)0%, rgba(27, 30, 33, 0) 50%)"
                                    }}/>
                                </div>

                                <div className="justify-content-center text-center m-auto div_dados_pessoais"
                                     style={{height: "80px", width: "100%", top: "-40px", position: "relative"}}>

                                    <img id="img_user" src={this.state.url || 'https://via.placeholder.com/150'} style={{
                                        height: "130px",
                                        width: "130px",
                                        position: "relative",
                                        top: "-80px",
                                        left: "0",
                                        zIndex: "8",
                                        border: "2px solid white",
                                        padding: "3px",
                                        margin: "auto"
                                    }} className="rounded-circle"/>
                                </div>

                                <div style={{position: "relative", top: "-40px"}}>
                                    <div className="text-center">
                                        <p style={{color: "white"}}> {profile.username}</p>

                                    </div>

                                    <div className="row" id="divdados" style={{width: "100%"}}>
                                        <ul className="nav nav-tabs nav-underline" id="myTab" role="tablist"
                                            style={{width: "100%"}}>
                                            <li className="nav-item text-center " style={{width: "50%"}}>
                                                <Link className={'nav-link opt_nav ' + this.state.estadodados} id="profile-tab"
                                                   data-toggle="tab"
                                                   to="#profile" role="tab" aria-controls="home" aria-selected={this.state.areadados} onClick={this.alterarEstadodados}>Profile</Link>
                                            </li>
                                            <li className="nav-item text-center" style={{width: "50%"}}>
                                                <Link className={'nav-link opt_nav ' + this.state.estadostat} id="statistic-tab" data-toggle="tab"
                                                   to="#statistic"
                                                   role="tab" aria-controls="profile"
                                                   aria-selected={this.state.areastat} onClick={this.alterarEstadostat}>Statistics</Link>
                                            </li>
                                        </ul>

                                        <div className="tab-content w-100">
                                            <div id="profile" className={'tab-pane ' + this.state.activedados}>
                                                <div className="mt-3 d-flex justify-content-end"
                                                     style={{position: "relative"}}>
                                                    <span onClick={this.editar}><i className="fas fa-edit mr-4" style={{color: "white"}}/></span>
                                                </div>
                                                <form>
                                                    <div className="ml-4">
                                                        <label className="mb-2" style={{color: "white", width: "80%"}}> NAME
                                                            <br/>
                                                            <input className="mt-2"
                                                                   style={{
                                                                       color: "grey",
                                                                       backgroundColor: "transparent",
                                                                       border: "none",
                                                                       width: "80%"
                                                                   }}
                                                                   placeholder={    profile.username} disabled/>
                                                        </label>
                                                    </div>
                                                    <hr className="ml-3"
                                                        style={{
                                                            backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                                                            border: "0",
                                                            height: "1px"
                                                        }}/>
                                                    <div className="ml-4">
                                                        <label className="mb-2" style={{color: "white", width: "80%"}}> E-MAIL
                                                            <br/>
                                                            <input className="mt-2"
                                                                   style={{
                                                                       color: "grey",
                                                                       backgroundColor: "transparent",
                                                                       border: "none", width: "80%"
                                                                   }}
                                                                   placeholder={auth.email} disabled/>
                                                        </label>
                                                    </div>
                                                </form>


                                            </div>
                                            <div id="statistic" className={'tab-pane fade ' + this.state.activestat}>
                                                <div className="card-body">
                                                    <p className="card-title"
                                                       style={{color: "white", fontsize: "22px"}}>Most viewed categories</p>
                                                    <canvas id="sales-chart"/>
                                                  <Graf />
                                                </div>
                                            </div>
                                        </div>
                                        <input onClick={this.logout} value="LOGOUT" className="btn btn-primary btn-lg btn-block" style={{backgroundColor: "rgb(128, 19, 54)", borderColor: "#233656", color:"white", marginTop: "2rem", padding: "1rem 2.4rem",
                                            fontSize: "0.94rem"}} readOnly={true} />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <Footer/>
            </div>
        )


    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

//faz verificaço do logout
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        LogOut: () => dispatch(LogOut(ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
