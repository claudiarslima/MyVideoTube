import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Button} from 'reactstrap';
import Modal from 'react-bootstrap/Modal'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {LogOut} from '../../store/actions/authActions';
import UserPageDesktop from "../auth/UserPageDesktop";
import SearchBar_nLogado from '../dash/SearchBar_nLogado.js';
import SearchBar from '../dash/SearchBar.js';
import Later from '../layout/Later.js';
import logo from "../../img/logo.png"
import dash from "../../img/icons_navbar/lol.png"
import categorias from "../../img/icons_navbar/lol2.png"
import search from "../../img/icons_navbar/lol3.png"
import favs from "../../img/icons_navbar/like.png"
import user from "../../img/icons_navbar/user.png"
import SearchResult from "../dash/SearchResults";
import Agregador from "../dash/Agregador";
import ModalCriarconta from "../layout/ModalCriarconta";
import ModalVideo from "./ModalVideo";
import McriarConta from "../dash/McriarConta.js"
import later from "../../img/icons_navbar/later.png"
import searchicon from "../../img/icons_navbar/lol3.png"
import {storage} from '../../config/fbConfig'


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            estado: ' ',
            loading: true,
            authenticated: false,
            user: null,
            editar: false,
            displaydados: 'block',
            displayfotodados: 'block',
            displaydivpass: 'none',
            displayestat: 'none',
            bntdados: '#212529',
            bntpass: '#212529',
            bntest: '#212529',
            show: false,
            display: 'none',
            estado_div: true,
            url: 'https://via.placeholder.com/150',
            id_click: '',
            reload: ''

        };
        this.ViewAction = this.ViewAction.bind(this);
        this.verModal = this.verModal.bind(this);
    }


    verModal() {
        if (this.state.display == 'none') {
            this.setState({display: 'block'})
        }
        else {
            this.setState({display: 'none'})
        }
        this.props.showModal()
    }

    ViewAction(viewToShow) {
        this.props.showView(viewToShow);
    }


    ola = () => {
        this.setState({
            estado_div: false
        });
    };

    handleScroll = () => {
        // alert("logou?"+this.state.estado_div)
        let menu_top = document.getElementById("menu-top");
        let perfil = document.getElementById("perfil");
        let favoritos = document.getElementById("favoritos");
        let later = document.getElementById("later");
        let barra_pesquisa2 = document.getElementById("barra-pesquisa2");
        let barra_pesquisa = document.getElementById("barra-pesquisa");
        let criar_conta = document.getElementById("criar_conta");
        let icon_pesquisa = document.getElementById("icon-pesquisa");
        let img_logo = document.getElementById("img_logo");
        let placeholder = document.getElementById("placeholder");

        if (window.scrollY > 80) {

            menu_top.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
            perfil.style.height = "40px";
            perfil.style.width = "40px";


            if (this.state.estado_div) {
                favoritos.style.height = "40px";
                favoritos.style.width = "40px";
                favoritos.style.right = "9rem";

                later.style.height = "40px";
                later.style.width = "40px";
                later.style.right = "5rem";

                barra_pesquisa.style.height = "40px";
                barra_pesquisa.style.right = "13rem";
            }
            else {
                favoritos.style.height = "40px";
                favoritos.style.width = "40px";
                favoritos.style.right = "16rem";

                later.style.height = "40px";
                later.style.width = "40px";
                later.style.right = "12rem";

                barra_pesquisa2.style.height = "40px";
                barra_pesquisa2.style.right = "20rem";


                criar_conta.style.height = "40px";
                criar_conta.style.right = "0.5rem";
            }


            icon_pesquisa.style.height = "20px";
            icon_pesquisa.style.width = "20px";

            img_logo.style.height = "40px";

            placeholder.style.lineHeight = "20px";
        }
        else {
            menu_top.style.backgroundColor = "rgba(0, 0, 0, 0)";

            perfil.style.height = "60px";
            perfil.style.width = "60px";


            if (this.state.estado_div) {
                favoritos.style.height = "60px";
                favoritos.style.width = "60px";
                favoritos.style.right = "11rem";

                later.style.height = "60px";
                later.style.width = "60px";
                later.style.right = "6rem";

                barra_pesquisa.style.height = "60px";
                barra_pesquisa.style.right = "16rem";
            }
            else {
                favoritos.style.height = "60px";
                favoritos.style.width = "60px";
                favoritos.style.right = "18rem";

                later.style.height = "60px";
                later.style.width = "60px";
                later.style.right = "13rem";

                barra_pesquisa2.style.height = "60px";
                barra_pesquisa2.style.right = "23rem";

                criar_conta.style.height = "60px";
                criar_conta.style.right = "0.5rem";
            }


            icon_pesquisa.style.height = "40px";
            icon_pesquisa.style.width = "40px";

            img_logo.style.height = "60px";

            placeholder.style.lineHeight = "40px";
        }
    }

    //evento para fazer o click do botão de logout
    logout = (e) => {
        e.preventDefault();
        this.props.LogOut(this.state);
    };

    //evento para fazer o click do botão de editar dados
    editar = (e) => {
        this.setState({editar: true});
    };

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    mostrarDados = () => {
        this.setState({
            displaydados: 'block',
            displayfotodados: 'block',
            displaydivpass: 'none',
            displayestat: 'none',
            bntdados: '#343a40',
            bntpass: '#212529',
            bntest: '#212529',
        });
    };

    password = () => {
        this.setState({
            displaydados: 'none',
            displayfotodados: 'none',
            displaydivpass: 'block',
            displayestat: 'none',
            bntdados: '#212529',
            bntpass: '#343a40',
            bntest: '#212529',
        });
    };

    estatisticas = () => {
        this.setState({
            displaydados: 'none',
            displayfotodados: 'none',
            displaydivpass: 'none',
            displayestat: 'block',
            bntdados: '#212529',
            bntest: '#343a40',
            bntpass: '#212529',
        });
    };

    componentDidMount() {

        window.addEventListener('scroll', this.handleScroll);

        window.addEventListener('hashchange', this.handleRouteChange, false);

        if (!this.props.auth.uid) {
            this.ola();
        }

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentWillMount() {
        if (!this.props.auth.uid) {
        } else {
            const pictRef = storage.ref(`images/`).child(this.props.auth.uid);
            pictRef.getDownloadURL().then(url => {
                this.setState({url})
            })
        }
    }

    handleRouteChange = (event) => {

        const destination = event.newURL;

        this.setState({reload: '_self'})


        if (window.location.hash !== "#/modal") {
            window.location.reload();
            // this.setState({ redirect: 1 });
        }
    }

    render() {

        const {auth} = this.props;
        const {search} = this.props;
        const {open} = this.state;
        const {voltar, loading, authenticated, editar} = this.state;
        const {profile} = this.props;

        return (

            <div>

                {/*BARRA MENU TOP E LOGO*/}
                <div style={{
                    width: "100%",
                    height: "72px",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    position: "fixed",
                    zIndex: "1300"
                }} id="menu-top" className="display-desktop">
                    <NavLink to="/paginainicial" style={{textDecoration: "none"}}>
                        <img src={logo} className="display-desktop"
                             style={{position: "fixed", top: "1rem", left: "1rem", height: "60px"}}
                             id="img_logo"/></NavLink>
                </div>
                {/*FIM BARRA MENU TOP E LOGO*/}

                {/*// MENU TOPO LADO DIREITO*/}

                {(() => {
                    if (this.state.estado_div) {
                        return (
                            <div style={{height: "50px", zIndex: "1300"}} className="div_botao_pesquisa">
                                <div>
                                    <div className="d-flex toggled float-right h-100 pr-4 pt-3">
                                        <SearchBar showView={this.ViewAction}/>
                                        <NavLink to="/Favoritos" style={{textDecoration: "none"}}>
                                            <button type="button" className="ml-3" style={{
                                                borderRadius: "50px",
                                                backgroundColor: "rgb(128, 19, 54)",
                                                height: "60px",
                                                width: "60px",
                                                border: "none",
                                                zIndex: "1300",
                                                position: "fixed",
                                                right: "11rem"
                                            }} id="favoritos">
                                                <i className="icones_fontawsome fas fa-heart"/></button>
                                        </NavLink>
                                        <NavLink to="/Later" style={{textDecoration: "none"}}>
                                            <button type="button" className="ml-3" style={{
                                                borderRadius: "50px",
                                                backgroundColor: "rgb(128, 19, 54)",
                                                height: "60px",
                                                width: "60px",
                                                border: "none",
                                                zIndex: "1300",
                                                position: "fixed",
                                                right: "6rem"
                                            }} id="later">
                                                <i className="icones_fontawsome far fa-clock"/></button>
                                        </NavLink>

                                        <UserPageDesktop/>

                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (

                            <div style={{height: "50px", zIndex: "1300"}} className="div_botao_pesquisa">

                                <div>
                                    <div className="d-flex toggled float-right h-100 pr-4 pt-3">
                                        <SearchBar_nLogado showView={this.ViewAction}/>

                                        <button onClick={this.verModal} type="button" className="ml-3" style={{
                                            borderRadius: "50px",
                                            backgroundColor: "rgb(128, 19, 54)",
                                            height: "60px",
                                            width: "60px",
                                            border: "none",
                                            zIndex: "1300",
                                            position: "fixed",
                                            right: "18rem"
                                        }} id="favoritos">
                                            <i className="icones_fontawsome fas fa-heart"/></button>


                                        <button onClick={this.verModal} type="button" className="ml-3" style={{
                                            borderRadius: "50px",
                                            backgroundColor: "rgb(128, 19, 54)",
                                            height: "60px",
                                            width: "60px",
                                            border: "none",
                                            zIndex: "1300",
                                            position: "fixed",
                                            right: "13rem"
                                        }} id="later">
                                            <i className="icones_fontawsome far fa-clock"/></button>


                                        {/*---------MODAL PERFIL ----------*/}
                                        <button onClick={this.verModal} className="ml-3" style={{
                                            borderRadius: "50px",
                                            backgroundColor: "rgba(128, 19, 54)",
                                            height: "60px",
                                            width: "60px",
                                            border: "4px solid rgb(128, 19,54)",
                                            padding: "2px",
                                            zIndex: "1300",
                                            position: "fixed",
                                            right: "8rem"
                                        }} id="perfil">
                                            <i className="icones_fontawsome far fa-user"/></button>

                                        <NavLink to="/Dashboard" style={{textDecoration: "none"}}>
                                            <button type="button" className="ml-3" style={{
                                                borderRadius: "10px",
                                                backgroundColor: "rgb(128, 19, 54)",
                                                height: "60px",
                                                width: "100px",
                                                border: "solid 4px rgb(128, 19, 54)",
                                                color: "white",
                                                fontSize: "12px",
                                                zIndex: "1300",
                                                top: "15px",
                                                position: "fixed",
                                                right: "0.5rem"
                                            }} id="criar_conta"
                                            >
                                                <span>CREACT ACCOUNT</span></button>
                                        </NavLink>
                                        <div style={{display: this.state.display}}>
                                            <McriarConta ver={this.verModal}/>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        )
                    }
                })()}


                <div style={{width: '100%', zIndex: -90, height: '400px', top: '0', position: 'absolute'}}>
                    <div style={{
                        width: '100%',
                        zIndex: 2,
                        background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)',
                        height: '100%'
                    }}>
                    </div>
                </div>

                {/*----- Menu mobile ----------*/}
                {/*-- navbar que aparece no topo quando está em mobile (media queries no ficheiro CSS)--*/}

                <nav className="justify-content-center navbar navbar-light"
                     style={{
                         backgroundColor: "rgb(128, 19, 54)",
                         zIndex: 100,
                         position: 'fixed',
                         width: '100%',
                         top: '0'
                     }}
                     id="navbar_mobile">

                    {this.props.auth.uid ? (

                        <div className="justify-content-center" id="navbarSupportedContent">
                            <NavLink activeStyle={{borderBottom: '2px solid grey', paddingBottom: '11px'}}
                                     className="nav-link mt-2" style={{float: "left"}} target={this.state.reload}
                                     to="/paginainicial">
                                <img src={dash} style={{height: "20px", width: "23px"}}/>
                            </NavLink>
                            <NavLink activeStyle={{borderBottom: '2px solid grey', paddingBottom: '11px'}}
                                     className="nav-link mt-2" style={{float: "left"}} to="/later">
                                <img src={later} style={{width: "26px"}}/>
                            </NavLink>
                            <NavLink activeStyle={{borderBottom: '2px solid grey', paddingBottom: '11px'}}
                                     className="nav-link" style={{float: "left"}} to="/Perfil">
                                <img src={this.state.url} style={{
                                    height: "40px",
                                    width: "40px",
                                    zIndex: 8,
                                    border: "2px solid white",
                                    padding: "3px"
                                }} className="rounded-circle" alt="Cinque Terre"/>
                            </NavLink>
                            <NavLink activeStyle={{borderBottom: '2px solid grey', paddingBottom: '11px'}}
                                     class="nav-link mt-2" style={{float: "left"}} to="/searchmobile">
                                <img src={searchicon} style={{width: "23px"}}/>
                            </NavLink>
                            <NavLink activeStyle={{borderBottom: '2px solid grey', paddingBottom: '11px'}}
                                     class="nav-link mt-2" style={{float: "left"}} to="/Favoritos">
                                <img src={favs} style={{width: "23px"}}/>
                            </NavLink>
                        </div>

                    ) : (
                        <div className="justify-content-center" id="navbarSupportedContent">
                            <NavLink activeStyle={{borderBottom: '2px solid grey', paddingBottom: '11px'}}
                                     className="nav-link mt-2" style={{float: "left"}} target={this.state.reload}
                                     to="/criarconta">
                                <img src={dash} style={{height: "20px", width: "23px"}}/>
                            </NavLink>
                            <NavLink activeStyle={{borderBottom: '2px solid grey', paddingBottom: '11px'}}
                                     className="nav-link mt-2" style={{float: "left"}}  to="/criarconta">
                                <img src={later} style={{width: "26px"}}/>
                            </NavLink>
                            <NavLink activeStyle={{borderBottom: '2px solid grey', paddingBottom: '11px'}}
                                     className="nav-link pt-3" style={{float: "left"}}  to="/criarconta">
                                <img src={user} style={{width: "26px"}}/>
                            </NavLink>
                            <NavLink activeStyle={{borderBottom: '2px solid grey', paddingBottom: '11px'}}
                                     class="nav-link mt-2" style={{float: "left"}}  to="/criarconta">
                                <img src={searchicon} style={{width: "23px"}}/>
                            </NavLink>
                            <NavLink activeStyle={{borderBottom: '2px solid grey', paddingBottom: '11px'}}
                                     class="nav-link mt-2" style={{float: "left"}}  to="/criarconta">
                                <img src={favs} style={{width: "23px"}}/>
                            </NavLink>
                        </div>

                    )}
                </nav>


            </div>


        );
    }


}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,

    }
};

export default connect(mapStateToProps)(Navbar);
