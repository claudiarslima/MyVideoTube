// ----------- IMPORTS --------------------//
import React, {Component} from 'react';
import {connect} from 'react-redux';
import teste2 from '../../img/teste2.png';
import fundo from '../../img/my1.png';
import {LogIn} from '../../store/actions/authActions';
import {Link} from 'react-router-dom';
import Registo from './Registo';
import {Redirect} from 'react-router-dom';
import lol from "../../img/lol.mp4";


class Login extends Component {
    constructor(props) {
        super(props);

    }

    // STATE INICIAL
    state = {
        email: ' ',
        password: ' ',
    };

    //evento para ler o valor escrito nos inputs: email e password e atualizar, assim, o valor do state
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //evento para submeter o valor escrito nos inputs: email e password
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.LogIn(this.state);
        console.log(this.state);
    }

    render() {

        //usamos a const para fazer a verificação da autenticação na web-app e para processar eventuais erros no login
        const {auth, authError} = this.props;

        if (auth.uid) {
            return <Redirect to='/paginainicial'/>;
        }

        return (
            <section className="page-section "  id="login" style={{
               maxWidth: 100 + 'vw', minHeight: 565 + 'px'
            }}>

                <div className=" display-desktop" style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    width: 100 + '%',
                    height: 100 + 'vh',
                    minHeight: 565 + 'px',
                    zIndex: 8,
                    position: 'relative'
                }}>
                    <div className=""
                         style={{minWidth: 100 + '%', height: 100 + 'vh', minHeight: 565 + 'px', position: 'absolute'}}>
                        <img src={fundo}
                             style={{minWidth: 100 + '%', height: 100 + 'vh', minHeight: 565 + 'px', opacity: '0.5'}}/>
                    </div>
                    <div className="row align-middle d-flex"
                         style={{backgroundColor: 'rgba(0, 0, 0, 0.9)', height: 100 + '%', minHeight: 565 + 'px'}}>

                        <div className="col-md-6 m-auto d-flex  display-none" style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            height: 100 + "%",
                            width: 100 + "%",
                            padding: "2rem"
                        }}>

                            <div className="text-center m-auto">
                                <div className="m-auto">
                                    <div className="text-center">
                                        <h2 className=" titulos_login">Do You Already know the advantages of having an
                                            account?</h2>
                                    </div>


                                    <div className="mt-4 ml-5">
                                        <div className="d-flex  links legendas_login mb-3">
                                            Have a Personalized Experience.
                                        </div>
                                        <div className="d-flex  links legendas_login mb-3">
                                            Add Videos to a Watch Later List.
                                        </div>
                                        <div className="d-flex  links legendas_login mb-3">
                                            Add Videos to a Favorite List.
                                        </div>
                                        <div className="d-flex  links legendas_login mb-3">
                                            See Recommended Videos for You.
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center" style={{marginTop: "70px"}}>
                                        <a href="#registo">
                                            <button type="submit" name="button" className="btn btn-danger" style={{
                                                backgroundColor: "rgb(128, 19, 54)",
                                                border: "solid 4px rgb(128, 19, 54)"
                                            }}>I want to try it!
                                            </button>
                                        </a>

                                    </div>
                                    <div className="d-flex justify-content-center login_container"
                                         style={{marginTop: "20px"}}>
                                        <a href="/paginainicial">
                                            <button type="submit" name="button" className="btn btn-secondary"
                                                    style={{}}> Continue without Account
                                            </button>
                                        </a>
                                    </div>
                                </div>
                                {/*<img src={ teste2 } className="mb-3" style={{width: 100 + '%', margin: 'auto'}}/>*/}

                                {/*<h4 className="legendas_login mt-3">Vê todos os vídeos de que gostas num só lugar!</h4>*/}
                            </div>
                        </div>

                        <div className="col-md-6 m-auto" style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            height: 100 + "%",
                            width: 100 + "%",
                            padding: "8rem"
                        }}>
                            <div className="user_card m-auto " style={{backgroundColor: 'rgb(128, 19, 54)'}}>
                                <div className="text-center">
                                    <h2 className=" titulos_login">Sign In</h2>
                                </div>

                                <form className="mt-4" onSubmit={this.handleSubmit}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" id="email" className="form-control input_user"
                                               placeholder="name" onChange={this.handleChange}/>
                                    </div>
                                    <div className="input-group mb-2">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" id="password" className="form-control input_pass"
                                               placeholder="password" onChange={this.handleChange}/>
                                    </div>

                                    <div className="mt-3 d-flex justify-content-center mt-3 login_container">
                                        <button type="submit" name="button" className="btn login_btn"> Sign In</button>
                                    </div>
                                </form>
                                <div className="form-group text-danger text-center"> {authError ?
                                    <p style={{marginTop: '10px', marginBottom: '0px'}}> {authError} </p> : null} </div>
                                <div className="mt-4">
                                    <div className="d-flex justify-content-center links legendas_login">
                                        <Link to="/recoverpassword" className="ml-1">Did you forget your
                                            password?</Link>.
                                    </div>
                                    <div className="mt-3 d-flex justify-content-center links legendas_login">
                                        No account yet? Sign up <a href="#registo" className="ml-1">here</a>.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="display-mobile"
                     style={{width: "100%", height: 100 + 'vh', minHeight: 565 + 'px', position: 'absolute'}}>
                    <img src={fundo}
                         style={{width: "100%", height: 100 + 'vh', minHeight: 565 + 'px', opacity: '0.5'}}/>
                </div>
                <div className="col-md-6 display-mobile" style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    height: 100 + "vh",
                    minHeight: 565 + "px",
                    width: 100 + "%",
                    padding: "2rem"
                }}>

                    <div className="text-center d-flex" style={{marginTop: "92px"}}>
                        <div className="text-center m-auto ">
                            <div className="text-center">
                                <h2 className=" titulos_login">Do You Already know the advantages of having an
                                    account?</h2>
                            </div>


                            <div className="mt-4 ml-5">
                                <div className="d-flex  links legendas_login mb-3">
                                    Have a Personalized Experience.
                                </div>
                                <div className="d-flex  links legendas_login mb-3">
                                    Add Videos to a Watch Later List.
                                </div>
                                <div className="d-flex  links legendas_login mb-3">
                                    Add Videos to a Favorite List.
                                </div>
                                <div className="d-flex  links legendas_login mb-3">
                                    See Recommended Videos for You.
                                </div>
                            </div>
                            <div className="d-flex justify-content-center" style={{marginTop: "70px"}}>
                                <a href="#registo">
                                    <button type="submit" name="button" className="btn btn-danger" style={{
                                        backgroundColor: "rgb(128, 19, 54)",
                                        border: "solid 4px rgb(128, 19, 54)"
                                    }}> I want to try it!
                                    </button>
                                </a>

                            </div>
                            <div className="d-flex justify-content-center  login_container" style={{marginTop: "20px"}}>
                                <a href="/paginainicial">
                                    <button type="submit" name="button" className="btn btn-secondary"
                                            style={{}}>Continue without Account
                                    </button>
                                </a>
                            </div>
                        </div>
                        {/*<img src={ teste2 } className="mb-3" style={{width: 100 + '%', margin: 'auto'}}/>*/}

                        {/*<h4 className="legendas_login mt-3">Vê todos os vídeos de que gostas num só lugar!</h4>*/}
                    </div>
                </div>


                <div className="display-mobile" style={{height: 100 + 'vh', minHeight: 565 + 'px', backgroundColor: 'black'}}>

                    <div className="col-md-6 m-auto align-middle d-flex" style={{height: 100 + 'vh', minHeight: 565 + 'px'}}>
                        <div className="user_card m-auto login_moblie" style={{backgroundColor: 'rgb(128, 19, 54)'}}>
                            <div className="text-center">
                                <h2 className=" titulos_login">Sign In</h2>
                            </div>

                            <form className="mt-4" onSubmit={this.handleSubmit}>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" id="email" className="form-control input_user"
                                           placeholder="username" onChange={this.handleChange}/>
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" id="password" className="form-control input_pass"
                                           placeholder="password" onChange={this.handleChange}/>
                                </div>

                                <div className="d-flex justify-content-center mt-3 login_container">
                                    <button type="submit" name="button" className="btn login_btn">Sign In</button>
                                </div>
                            </form>
                            <div className="form-group text-danger text-center"> {authError ?
                                <p style={{marginTop: '10px', marginBottom: '0px'}}> {authError} </p> : null} </div>
                            <div className="mt-4">
                                <div className="d-flex justify-content-center links legendas_login">
                                    <Link to="/recoverpassword" className="ml-1">Did you forget your password?</Link>.
                                </div>
                                <div className="mt-3 d-flex justify-content-center links legendas_login">
                                    No account yet? Sign up <a href="#registo" className="ml-1">here</a>.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }




}




const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}


//faz a verificação do login
const mapDispatchToProps = (dispatch) => {
    return {
        LogIn: (creds) => dispatch(LogIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
