import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Button} from 'reactstrap';
import user from "../../img/user.jpg"
import Modal from 'react-bootstrap/Modal'
import {LogOut} from '../../store/actions/authActions';
import {storage} from '../../config/fbConfig';
import {Editar} from '../../store/actions/authActions';
import {EmailUpdate} from '../../store/actions/authActions';
import ChangePassDesktop from '../auth/ChangePassDesktop.js'
import {Link} from 'react-router-dom';
import Graf  from '../layout/Graf.js';


class UserPageDesktop extends Component {
    constructor(props) {
        super(props);
        // STATE INICIAL
        this.state = {
            estado: ' ',
            loading: true,
            authenticated: false,
            user: null,
            editar: false,
            open: false,
            alterar: false,
            displaydados: 'block',
            displayfotodados: 'block',
            displaydivpass: 'none',
            displayestat: 'none',
            bntdados: '#212529',
            bntpass: '#212529',
            bntest: '#212529',
            url: 'https://via.placeholder.com/150',
            estadoinput: 'disabled',
            picture: null,
            pictureUrl: null,
            image: null,
            progress: 0,
            visibleupload: "hidden",
            notEditMode: true,
            savevisible: "hidden",
            email: ' ',
            username: ' ',
            colortextinput: "",
            borderinput: "",
            autherror: false,
            estado_login: ''
        };
        this.pictureChange = this.pictureChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this)
    }


    componentDidMount() {

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
    }


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
//                this.setState({progress});
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


    //evento para fazer o click do botão de logout
    logout = (e) => {
        e.preventDefault();
        this.props.LogOut(this.state);
    };


    changeEditMode = () => {
        this.setState({
            notEditMode: false,
            savevisible: "visible",
            colortextinput: "lightgrey",
        })
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


    //evento para ler o valor escrito nos inputs: email, password, nome e username e atualizar, assim, o valor do state

    handleChange = (e) => {

        this.setState({
            email: e.target.value

        });

    };

    handleChange1 = (e) => {

        this.setState({
            username: e.target.value,
            // email: this.props.auth.email
        });

    };


    //eventos para abrir e fechar modal

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false, savevisible: "hidden", colortextinput: "", notEditMode: true, autherror: false});



    };

    //

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

    render() {
      // if (this.state.estado_login == false) {

      // }
        //quando o utilizador não está logado é redirecionado para a página de login


        const {open} = this.state;
        const {voltar, loading, authenticated, editar} = this.state;
        const {auth, authError, profile} = this.props;

        // if (this.state.alterar === true) {
        //     return window.location.reload();
        // }

        return (
            <div>
                <button onClick={this.onOpenModal} className="ml-3" style={{
                    borderRadius: "50px",
                    backgroundColor: "rgba(0,0,0,0)",
                    height: "60px",
                    width: "60px",
                    border: "4px solid rgb(128, 19,54)",
                    padding: "2px",
                    zIndex: 1300,
                    position: "fixed",
                    right: "1rem"
                }} id="perfil">
                    <img src={this.state.url}
                         style={{
                             height: "100%",
                             width: "100%",
                             zIndex: 8,
                             position: "relative",
                             top: "0px"
                         }}
                         className="rounded-circle" alt="Cinque Terre"/>
                </button>
                <Modal dialogClassName="modal-dialog-centered" show={this.state.open}
                       onHide={this.onCloseModal} style={{zIndex: 1800}} center>

                    <div className="" style={{maxWidth: "5000px"}}>
                        <div className="" style={{backgroundColor: "rgba(0,0,0, 0.8)"}}>

                            <div className="" style={{padding: 0, boxShadow: "1px 1px 15px #801336"}}>

                                {/*div que tem os dados pesssoais */}
                                <div className="col-md-10 col-sm-2 " id="dfs_perf"
                                     style={{
                                         float: "right",
                                         height: "400px",
                                         backgroundColor: "rgba(0,0,0, 0.8)"
                                     }}>
                                    <Button className="close pt-2 pr-1" onClick={this.onCloseModal}
                                            style={{color: "white"}}>
                                        <span aria-hidden="true">&times;</span>
                                    </Button>
                                    <div className="row">
                                        {/*imagem do utilizador */}
                                        <div className="ml-2 col-md-5 mt-4" style={{
                                            display: this.state.displayfotodados
                                        }
                                        } id="p_div_foto_dados_pessoais">
                                            <img src={this.state.url}
                                                 style={{
                                                     height: "130px",
                                                     width: "130px",
                                                     top: "70px",
                                                     zIndex: 8,
                                                     border: "2px solid white",
                                                     padding: "3px",
                                                     margin: "auto",

                                                 }}
                                                 className="rounded-circle mt-5 mb-3"/>
                                            <br/>


                                            <input type="file" ref={this.setRef}
                                                   style={{width: "100%", position: "relative", top: "10px"}}
                                                   onChange={this.pictureChange}/>
                                            <button className="my_button" onClick={this.handleUpload} style={{
                                                marginTop: "15%",
                                                marginLeft: "15%",
                                                visibility: this.state.visibleupload
                                            }}>Upload
                                            </button>
                                        </div>
                                        {/* div com os dados do utilizador*/}
                                        <div className="col-md-6 mt-5 ml-3" style={{
                                            display: this.state.displaydados
                                        }} id="p_div_dados_pessoais">
                                            <form
                                                onSubmit={this.handleSubmit} className="mt-4" style={{width: "100%"}}>
                                                <label className="mb-2"
                                                       style={{color: "white", width: "100%"}}>NAME<br/>
                                                    <div onDoubleClick={this.changeEditMode}>
                                                        <input type="text" id="username"
                                                               className="mt-2"
                                                               style={{
                                                                   border: "none",
                                                                   borderRadius: "5px",
                                                                   backgroundColor: "transparent",
                                                                   width: "100%",
                                                                   color: this.state.colortextinput,
                                                               }}
                                                               placeholder={profile.username}
                                                               disabled={this.state.notEditMode}
                                                               onChange={this.handleChange1}/></div>
                                                </label>
                                                <hr style={{
                                                    backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                                                    border: 0,
                                                    height: "1px"
                                                }}/>
                                                <label className="mb-2"
                                                       style={{color: "white", width: "100%"}}>EMAIL<br/>
                                                    <div onDoubleClick={this.changeEditMode}>
                                                        <input type="email" id="email" className="mt-2"
                                                               style={{
                                                                   border: "none",
                                                                   borderRadius: "5px",
                                                                   backgroundColor: "transparent",
                                                                   width: "100%",
                                                                   color: this.state.colortextinput
                                                               }}
                                                               placeholder={auth.email}
                                                               disabled={this.state.notEditMode}
                                                               onChange={this.handleChange}/></div>
                                                </label>
                                                <hr style={{
                                                    backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                                                    border: 0,
                                                    height: "1px"
                                                }}/>

                                                <input type="submit" value="SAVE"
                                                       className="btn" style={{
                                                    width: "35%",
                                                    marginTop: "3%",
                                                    marginLeft: "65%",
                                                    backgroundColor: "rgb(128, 19, 54)",
                                                    borderRadius: "12px",
                                                    color: "white", visibility: this.state.savevisible
                                                }} readOnly/>
                                            </form>
                                            <div className="form-group text-danger text-center">

                                                {(() => {
                                                    if (authError) {
                                                        if (authError === "This operation is sensitive and requires recent authentication. Log in again before retrying this request." && this.state.notEditMode === true && this.state.autherror === true) {
                                                            return (
                                                                <p style={{
                                                                    marginTop: '-15%',
                                                                    width: '100%',
                                                                    color: 'red',
                                                                    fontSize: "x-small"
                                                                }}> { authError }
                                                                    <div style={{cursor: "pointer"}} onClick={this.logout}>
                                                                        Login here
                                                                    </div>
                                                                </p>                                                        )
                                                        }
                                                        else if (authError === "The email address is already in use by another account." && this.state.notEditMode === true && this.state.autherror === true) {
                                                            return (  <p style={{
                                                        marginTop: '-15%',
                                                            marginLeft: '-6.5%',
                                                            width: '100%',
                                                            color: 'red',
                                                            fontSize: "x-small"
                                                    }}> { authError }
                                                    </p>    )
                                                        }

                                                    }
                                                })()}


                                            </div>
                                            <input readOnly={true} onClick={this.logout} value="LOGOUT"
                                                   className="btn btn-sm"
                                                   style={{
                                                       width: "35%",
                                                       marginTop: "0%",
                                                       padding: "8px",
                                                       marginLeft: "65%",
                                                       backgroundColor: "rgb(128, 19, 54)",
                                                       color: "white",
                                                       borderRadius: "12px"
                                                   }}/>
                                        </div>

                                        {/*<!-- div da password (só abre ao click do botão - definido em js no fundo da pág.) -->*/}
                                        <div className="col-md-12 mt-5 ml-3" id="p_div_password"
                                             style={{display: this.state.displaydivpass}}>

                                            <ChangePassDesktop/>

                                        </div>

                                        <div className="col-md-12 mt-5" id="p_div_estatistica"
                                             style={{display: this.state.displayestat}}>
                                            <div className="card-body" style={{padding: 0, marginTop: "-2%"}}>
                                                <p className="card-title"
                                                   style={{color: "white", fontSize: "22px"}}>
                                                    Most Viewed Categories</p>
                                                <canvas id="sales-chart"/>
                                                <Graf />
                                            </div>
                                        </div>



                                    </div>
                                    {/*<!-- fim da row que engloba todas as infos (as que vão trocando conforme os clicks nos btns) -->*/}

                                </div>
                                {/*<!-- fim da div que engloba todas as infos (as que vão trocando conforme os clicks nos btns) -->*/}

                                {/*<!-- botões laterais -->*/}
                                <div className="col-md-2"
                                     style={{padding: 0, backgroundColor: "rgba(0,0,0,0.8)"}}>

                                    {/*<!-- botão dos dados pessoais-->*/}
                                    <Button
                                        style={{
                                            height: "133.33px",
                                            width: "100px",
                                            padding: "15px",
                                            backgroundColor: this.state.bntdados,
                                            border: "none",
                                            outline: 0
                                        }}
                                        id="p_btn_dados_pessoais" onClick={this.mostrarDados}><i
                                        style={{color: "white", fontSize: "1.3rem"}}
                                        className="fas fa-user"/>
                                    </Button>

                                    {/*<!-- botão do gráfico das categorias -->*/}
                                    <Button
                                        style={{
                                            height: "133.33px",
                                            width: "100px",
                                            padding: "15px",
                                            backgroundColor: this.state.bntest,
                                            border: "none",
                                            outline: 0
                                        }}
                                        id="p_btn_estatisticas" onClick={this.estatisticas}><i
                                        style={{color: "white", fontSize: "1.3rem"}}
                                        className="fas fa-chart-bar"/> </Button>
                                    <br/>
                                    {/*<!-- botão da password -->*/}
                                    <Button
                                        style={{
                                            height: "133.33px",
                                            width: "100px",
                                            padding: "15px",
                                            backgroundColor: this.state.bntpass,
                                            border: "none",
                                            outline: 0
                                        }}
                                        id="p_btn_password" onClick={this.password}><i
                                        style={{color: "white", fontSize: "1.3rem"}}
                                        className="fas fa-key"/>
                                    </Button>


                                </div>
                                {/*<!-- fim da div dos botões -->*/}

                            </div>
                            {/*<!-- fim do corpo da modal -->*/}




                        </div>
                    </div>


                </Modal>
            </div>

        )
    }
}

//---------- DIV'S COM DOS DADOS (DADOS PESSOAIS, GRÁFICO, PASSWORD) ----------------
var p_div_foto_dados_pessoais = document.getElementById("p_div_foto_dados_pessoais");
var p_div_dados_pessoais = document.getElementById("p_div_dados_pessoais");
var p_div_password = document.getElementById("p_div_password");
var p_div_estatistica = document.getElementById("p_div_estatistica");


//---------- BOTÕES ----------------
var p_btn_password = document.getElementById("p_btn_password");
var p_btn_dados_pessoais = document.getElementById("p_btn_dados_pessoais");
var prf_btn_estatisticas = document.getElementById("p_btn_estatisticas");


// AO CLIQUE DO BOTÃO DOS DADOS PESSOAIS MOSTRA OS DADOS
function mostrarDados() {
    p_div_foto_dados_pessoais.style.display = "block";
    p_div_dados_pessoais.style.display = "block";
    p_div_password.style.display = "none";
    p_div_estatistica.style.display = "none";
    p_btn_dados_pessoais.style.backgroundColor = "#343a40";
    p_btn_password.style.backgroundColor = "#212529";
    prf_btn_estatisticas.style.backgroundColor = "#212529";

};

// AO CLIQUE DO BOTÃO DA PASSWORD MOSTRA OS DADOS DA MESMA
function password() {
    p_div_foto_dados_pessoais.style.display = "none";
    p_div_dados_pessoais.style.display = "none";
    p_div_estatistica.style.display = "none";
    p_div_password.style.display = "block";
    p_btn_password.style.backgroundColor = "#343a40";
    p_btn_dados_pessoais.style.backgroundColor = "#212529";
    prf_btn_estatisticas.style.backgroundColor = "#212529";
};


function estatisticas() {
    p_div_foto_dados_pessoais.style.display = "none";
    p_div_dados_pessoais.style.display = "none";
    p_div_password.style.display = "none";
    p_div_estatistica.style.display = "block";
    prf_btn_estatisticas.style.backgroundColor = "#343a40";
    p_btn_dados_pessoais.style.backgroundColor = "#212529";
    p_btn_password.style.backgroundColor = "#212529";
};

const mapStateToProps = (state) => {

    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
        profile: state.firebase.profile,

    }
};

//faz verificaço do logout
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        LogOut: () => dispatch(LogOut(ownProps)),
        Editar: (data) => dispatch(Editar(data)),
        EmailUpdate: (dataemail) => dispatch(EmailUpdate(dataemail))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPageDesktop));
