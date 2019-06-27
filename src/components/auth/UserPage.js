import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faChartBar} from "@fortawesome/free-solid-svg-icons";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {Button} from 'reactstrap';


class UserPage extends Component {

    // STATE INICIAL
    state = {
        estado: ' ',
        loading: true,
        authenticated: false,
        user: null,
        editar: false
    };

    //evento para fazer o click do botão de logout
    logout = (e) => {
        e.preventDefault();
        this.props.LogOut(this.state);
    };

    //evento para fazer o click do botão de editar dados
    editar = (e) => {
        this.setState({editar: true});
    };

    render () {

        return (
            <div>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{maxWidth: "800px"}} role="document">
                    <div className="modal-content" style={{backgroundColor: "rgba(0,0,0, 0.8)"}}>

                        <div className="modal-body" style={{padding: 0, boxShadow: "1px 1px 15px #801336"}}>

                            {/*div que tem os dados pesssoais */}
                            <div className="col-md-10 col-sm-2 " id="dfs_perf"
                                 style={{float: "right", height: "400px", backgroundColor: "rgba(0,0,0, 0.8)"}}>
                                <Button type="button" className="close pt-2 pr-1" data-dismiss="modal"
                                        aria-label="Close"
                                        style={{color: "white"}}>
                                    <span aria-hidden="true">&times;</span>
                                </Button>
                                <div className="row">
                                    {/*imagem do utilizador */}
                                    <div className="ml-2 col-md-5 mt-4" id="p_div_foto_dados_pessoais">
                                        <img src="img/user.jpg"
                                             style={{
                                                 height: "130px",
                                                 width: "130px",
                                                 top: "70px",
                                                 zIndex: 8,
                                                 border: "2px solid white",
                                                 padding: "3px",
                                                 margin: "auto"
                                             }}
                                             className="rounded-circle mt-5 mb-3"/>
                                        <br/>
                                        <span className="mt-4 ml-4" style={{color: "whitesmoke"}}>
                                           <FontAwesomeIcon
                                               icon={faCamera} style={{color: "white"}}/>Alterar</span>
                                    </div>
                                    {/* div com os dados do utilizador*/}
                                    <div className="col-md-6 mt-5 ml-3" id="p_div_dados_pessoais">
                                        <form className="mt-4" style={{width: "100%"}}>
                                            <label className="mb-2" style={{color: "white", width: "100%"}}>NOME <br/>
                                                <input className="mt-2"
                                                       style={{
                                                           border: "none",
                                                           borderRadius: "5px",
                                                           backgroundColor: "transparent",
                                                           width: "100%"
                                                       }}
                                                       placeholder="user1" disabled/>
                                            </label>
                                            <hr style={{
                                                backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                                                border: 0,
                                                height: "1px"
                                            }}/>
                                                <label className="mb-2" style={{color: "white", width: "100%"}}>USERNAME<br/>
                                                    <input className="mt-2"
                                                           style={{
                                                               border: "none",
                                                               borderRadius: "5px",
                                                               backgroundColor: "transparent",
                                                               width: "100%"
                                                           }}
                                                           placeholder="user1" disabled/>
                                                </label>
                                                <hr style={{
                                                    backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                                                    border: 0,
                                                    height: "1px"
                                                }}/>
                                                <label className="mb-2" style={{color: "white", width: "100%"}}>EMAIL<br/>
                                                    <input className="mt-2"
                                                           style={{
                                                               border: "none",
                                                               borderRadius: "5px",
                                                               backgroundColor: "transparent",
                                                               width: "100%"
                                                           }}
                                                           placeholder="user1@ua.pt" disabled/>
                                                </label>
                                        </form>
                                    </div>

                                    {/*<!-- div da password (só abre ao click do botão - definido em js no fundo da pág.) -->*/}
                                    <div className="col-md-12 mt-5 ml-3" id="p_div_password" style={{display: "none"}}>
                                        <form className="mt-4">
                                            {/*<!-- input da password -->*/}
                                            <label className="mb-2" style={{color: "white"}}>PASSWORD<br/>
                                                <input type="password" className="mt-2"
                                                       style={{
                                                           border: "none",
                                                           borderRadius: "5px",
                                                           backgroundColor: "transparent"
                                                       }}
                                                       placeholder="*********" disabled/>
                                            </label>
                                            <hr style={{
                                                backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                                                border: 0,
                                                height: "1px"
                                            }}/>
                                        </form>
                                    </div>

                                    <div className="col-md-12 mt-5" id="p_div_estatistica" style={{display: "none"}}>
                                        <div className="card-body" style={{padding: 0}}>
                                            <p className="card-title" style={{color: "white", fontSize: "22px"}}>
                                                Categorias mais vistas</p>
                                            <canvas id="sales-chart"/>
                                        </div>
                                    </div>

                                    {/*<!-- botão que edita os dados -->*/}

                                    {/*<!--<div className="col-md-1">-->*/}
                                    {/*<!--<i style="color: white; float: right;" className=" mt-3 fas fa-pen-square fa-2x"></i>-->*/}
                                    {/*<!--<span></span>-->*/}

                                    {/*<!--</div>-->*/}
                                    {/*<!--<div className="col-md-1">-->*/}
                                    {/*<!--<i style="color: white; float: right;" className=" mt-3 fas fa-times fa-2x"></i>-->*/}
                                    {/*<!--</div>-->*/}


                                </div>
                                {/*<!-- fim da row que engloba todas as infos (as que vão trocando conforme os clicks nos btns) -->*/}

                            </div>
                            {/*<!-- fim da div que engloba todas as infos (as que vão trocando conforme os clicks nos btns) -->*/}

                            {/*<!-- botões laterais -->*/}
                            <div className="col-md-2" style={{padding: 0, backgroundColor: "rgba(0,0,0,0.8)"}}>

                                {/*<!-- botão dos dados pessoais-->*/}
                                <Button
                                    style={{
                                        height: "133.33px",
                                        width: "100px",
                                        padding: "15px",
                                        backgroundColor: "#343a40",
                                        border: "none",
                                        outline: 0
                                    }}
                                    id="p_btn_dados_pessoais"><FontAwesomeIcon icon={faUser} style={{
                                    color: "white",
                                    fontSize: "1.3rem"
                                }}/>
                                </Button>

                                {/*<!-- botão do gráfico das categorias -->*/}
                                <Button
                                    style={{
                                        height: "133.33px",
                                        width: "100px",
                                        padding: "15px",
                                        backgroundColor: "#212529",
                                        border: "none",
                                        outline: 0
                                    }}
                                    id="p_btn_estatisticas"><FontAwesomeIcon icon={faChartBar} style={{
                                    color: "white",
                                    fontSize: "1.3rem"
                                }}/> </Button>
                                <br/>
                                {/*<!-- botão da password -->*/}
                                <Button
                                    style={{
                                        height: "133.33px",
                                        width: "100px",
                                        padding: "15px",
                                        backgroundColor: "#212529",
                                        border: "none",
                                        outline: 0
                                    }}
                                    id="p_btn_password"><FontAwesomeIcon icon={faKey} style={{
                                    color: "white",
                                    fontSize: "1.3rem"
                                }}/>
                                </Button>

                            </div>
                            {/*<!-- fim da div dos botões -->*/}

                        </div>
                        {/*<!-- fim do corpo da modal -->*/}

                        {/*<!-- botões finais da modal (para já desativados) -->*/}

                        {/*<!--<hr style="background-image: linear-gradient(90deg, #801336, transparent); border: 0; height: 1px">-->*/}
                        {/*<!--<div class="modal-footer" style="border-top: none">-->*/}
                        {/*<!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->*/}
                        {/*<!--<button type="button" class="btn btn-primary">Save changes</button>-->*/}
                        {/*<!--</div>-->*/}

                    </div>
                </div>
            </div>
            </div>

    )
    }
    }

    export default UserPage;
