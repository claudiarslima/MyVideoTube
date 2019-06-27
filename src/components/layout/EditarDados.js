import React, {Component} from 'react';
import Navbar from '../layout/Navbar.js';
import Footer from '../layout/Footer.js';
import PreviewPicture from '../layout/PreviewPicture.js';
import ChangePassword from '../auth/ChangePassword.js';
import {storage} from '../../config/fbConfig'
import fundo from "../../img/teste_funco_perfil.jpg";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {LogOut} from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import {firebase} from '../../config/fbConfig';
// import { Redirect } from 'react-router-dom';
import {Editar} from '../../store/actions/authActions';
import {EmailUpdate} from '../../store/actions/authActions';
import {Collapse} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Graf  from '../layout/Graf.js';


class EditarDados extends Component {
    constructor(props) {
        super(props);
        // STATE INICIAL
        this.state = {
            open: false,
            email: ' ',
            username: ' ',
            alterar: false,
            visible: false,
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
            picture: null,
            pictureUrl: null,
            image: null,
            url: 'https://via.placeholder.com/150',
            progress: 0,
            autherror: false,
            visibleupload: "hidden",
            notEditMode: true,
            errors: false,

        };
        this.pictureChange = this.pictureChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this)

    }


    componentDidMount() {
        const pictRef = storage.ref(`images/`).child(this.props.auth.uid);
        pictRef.getDownloadURL().then(url => {
            this.setState({url})
        })
    }


    //evento para fazer o click do botão de logout
    logout = (e) => {
        e.preventDefault();
        this.props.LogOut(this.state);
    };



    //eventos para alterar foto de perfil

    pictureChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({image, visibleupload: "visible"}));
        }
    };

    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${this.props.auth.uid}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
//progress function .....
//                 const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
//                 this.setState({progress});
            }
            ,
            (error) => {
                //error function .....

                console.log(error)
            },
            () => {
                //complete function .....
                storage.ref(`images/`).child(this.props.auth.uid).getDownloadURL().then(url => {
                    this.setState({url, visibleupload: "hidden"})
                })
            }
        )
    };


//evento para ler o valor escrito nos inputs: email, password, nome e username e atualizar, assim, o valor do state

    handleChange = (e) => {

        this.setState({
            email: e.target.value

        });

    };

    handleChange1 = (e) => {

        this.setState({
            username: e.target.value,
        });

    };


//evento para submeter o valor escrito nos inputs: nome e username
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.username === ' ' && this.state.email === ' ') {
            this.setState({visible: true});
        }

        else if (this.state.username !== ' ' && this.state.email === ' ') {
            console.log("alterou username");
            this.setState({
                alterar: true, savevisible: "hidden", notEditMode: true, colortextinput: "", autherror: true
            });
            this.props.Editar(this.state);
        }

        else if (this.state.email !== ' ' && this.username === ' ') {
            console.log("alterou email");
            this.setState({
                username: this.props.profile.username,
                alterar: true,
                savevisible: "hidden",
                colortextinput: "",
                notEditMode: true,
                autherror: true
            });
            this.props.Editar(this.state);
            this.props.EmailUpdate(this.state.email);
        }

        else if (this.state.email !== ' ' && this.username !== ' ') {
            console.log("alterou ambos");
            this.props.Editar(this.state);
            this.props.EmailUpdate(this.state.email);
            this.setState({
                alterar: true, savevisible: "hidden", colortextinput: "", notEditMode: true, autherror: true
            })
        }
    };

    // onDismiss = () => {
    //     this.setState({visible: false});
    // }

//eventos para fazer a alteração do estado active das divs
    alterarEstadodados = () => {
        this.setState({estadodados: 'active', estadostat: '', activedados: 'show active', activestat: '',             autherror: false
        });

    };

    alterarEstadostat = () => {
        this.setState({estadodados: '', estadostat: 'active', activedados: 'show', activestat: 'active show',             autherror: false  });
    };


    render() {

        const {voltar, loading, authenticated, editar} = this.state;
        //usamos a const para fazer a verificação da autenticação na web-app e para processar eventuais erros no login
        const {auth, authError, profile, autherrorpass} = this.props;

        // quando o utilizador não está logado é redirecionado para a página de login
        if (!auth.uid) {
            return <Redirect to='/Dashboard'/>;
        }




        return (
            <div>
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
                                     style={{height: "100px", width: "100%", top: "-40px", position: "relative"}}>

                                    <PreviewPicture pictureUrl={this.state.url || 'https://via.placeholder.com/150'}/>

                                    <input type="file" ref={this.setRef}
                                           style={{width: "50%", position: "relative", top: "10px", left: "-10%"}}
                                           onChange={this.pictureChange}/>


                                </div>

                                <div style={{position: "relative", top: "-9px"}}>
                                    <div className="text-center">
                                        <button className="my_button" onClick={this.handleUpload} style={{
                                            visibility: this.state.visibleupload
                                        }}>Upload</button>

                                    </div>

                                    <div className="row" id="divdados" style={{width: "100%"}}>
                                        <ul className="nav nav-tabs nav-underline" id="myTab" role="tablist"
                                            style={{width: "100%"}}>
                                            <li className="nav-item text-center " style={{width: "50%"}}>
                                                <Link className={'nav-link opt_nav ' + this.state.estadodados}
                                                      id="profile-tab"
                                                      data-toggle="tab"
                                                      to="#profile" role="tab" aria-controls="home"
                                                      aria-selected={this.state.areadados}
                                                      onClick={this.alterarEstadodados}>Profile</Link>
                                            </li>
                                            <li className="nav-item text-center" style={{width: "50%"}}>
                                                <Link className={'nav-link opt_nav ' + this.state.estadostat}
                                                      id="statistic-tab" data-toggle="tab"
                                                      to="#statistic"
                                                      role="tab" aria-controls="profile"
                                                      aria-selected={this.state.areastat}
                                                      onClick={this.alterarEstadostat}>Statistics</Link>
                                            </li>
                                        </ul>

                                        <div className="tab-content w-100">
                                            <div id="profile" className={'tab-pane ' + this.state.activedados}>
                                                <div className="mt-3 d-flex justify-content-end"
                                                     style={{position: "relative"}}>
                                                    <span className="mr-4"/>
                                                </div>
                                                <form onSubmit={this.handleSubmit} style={{marginTop: "25px"}}>
                                                    <div className="ml-4">
                                                        <label htmlFor="nome" className="mb-2" style={{color: "white"}}>
                                                            NAME
                                                            <br/>
                                                            <input type="text" className="mt-2"
                                                                   placeholder={profile.username}
                                                                   onChange={this.handleChange1} maxLength="20"
                                                                   id="username"
                                                                   style={{
                                                                       backgroundColor: "transparent",
                                                                       width: "200px",
                                                                       borderRadius: "17px",
                                                                       height: "40px",
                                                                       border: "1px solid grey",
                                                                       fontSize: "12px",
                                                                       color: "white"
                                                                   }}
                                                                   />
                                                        </label>
                                                    </div>
                                                    <hr className="ml-3"
                                                        style={{
                                                            backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                                                            border: "0",
                                                            height: "1px"
                                                        }}/>
                                                    <div className="ml-4">
                                                        <label className="mb-2" style={{color: "white", width: "80%"}}>
                                                            E-MAIL
                                                            <br/>
                                                            <input type="email" className="mt-2"
                                                                   placeholder={auth.email} id="email"
                                                                   onChange={this.handleChange}/>
                                                        </label>
                                                    </div>
                                                    <div className="form-group text-danger">

                                                        {(() => {
                                                            if (authError) {
                                                                if (authError === "This operation is sensitive and requires recent authentication. Log in again before retrying this request." &&  this.state.autherror === true) {
                                                                    return (
    <div>                                                                    <p style={{
                                                                            marginLeft: '6.5%',
                                                                            width: '85%',
                                                                            color: 'red',
                                                                            fontSize: "x-small"
                                                                        }}> { authError }
    </p>               <input onClick={this.logout} value="Login Here" className="btn btn-block" style={{backgroundColor: "transparent", borderColor: "rgb(128, 19, 54)", border: "1px double rgb(128, 19, 54)", color:"white", marginBottom: "-4%", padding: "3%"}} readOnly={true} />              </div>                           )
                                                                }
                                                                else if (authError === "The email address is already in use by another account." && this.state.autherror === true) {
                                                                    return (  <p style={{
                                                                        marginLeft: '6.5%',
                                                                        width: '100%',
                                                                        color: 'red',
                                                                        fontSize: "x-small"
                                                                    }}> { authError }
                                                                    </p>    )
                                                                }

                                                            }
                                                        })()}


                                                    </div>
                                                    <input type="submit" value="SAVE"
                                                           className="btn btn-primary btn-lg btn-block" style={{
                                                        backgroundColor: "rgb(128, 19, 54)",
                                                        borderColor: "#801336",
                                                        color: "white",
                                                        padding: "1rem 2.4rem",
                                                        fontSize: "0.94rem"
                                                    }} readOnly/>

                                                </form>


                                                <ChangePassword/>


                                            </div>
                                            <div id="statistic" className={'tab-pane fade ' + this.state.activestat}>
                                                <div className="card-body">
                                                    <p className="card-title"
                                                       style={{color: "white", fontsize: "22px"}}>Most viewed
                                                        categories</p>
                                                    <canvas id="sales-chart"/>
                                                    <Graf />
                                                </div>
                                            </div>
                                        </div>

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
        authError: state.auth.authError,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
};

//faz a verificação da edição de dados
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        LogOut: () => dispatch(LogOut()),
        Editar: (data) => dispatch(Editar(data, ownProps)),
        EmailUpdate: (dataemail) => dispatch(EmailUpdate(dataemail, ownProps))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditarDados);
