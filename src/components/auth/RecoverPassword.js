import React, { Component } from 'react';
import logo from '../../img/logo.png';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {ResetPassword} from '../../store/actions/authActions';
import {Link} from 'react-router-dom';
import fundo from "../../img/my1.png";

class RecoverPassword extends Component {

    constructor(props) {
        super(props);
        // STATE INICIAL
        this.state = {
            email: ' ',
            errors: false,
        };
    }



    //evento para ler o valor escrito nos inputs: email e password e atualizar, assim, o valor do state
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    //evento para submeter o valor escrito nos inputs: email e password
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.ResetPassword(this.state);
        console.log(this.state);

    };


    render() {

        //usamos a const para fazer a verificação da autenticação na web-app e para processar eventuais erros no login
        const {auth, authError} = this.props;



        return (
            <div>
            <section className="page-section" id="login" style={{height: 100 + 'vh', maxWidth: 100 + 'vw', minHeight: 565 + 'px'}}>

                <div className=" display-desktop animated slideInRight " style={{height: 100 + '%', minHeight: 565 + 'px'}}>

                    <div className="" style={{ minWidth: 100 + '%', height: 50 + 'vh', minHeight: 565 + 'px',  position: 'absolute' }}>
                        <img src={fundo} style={{minWidth: 100 + '%', height: 100 + 'vh', minHeight: 565 + 'px', opacity: '0.5'}}/>
                    </div>
                    <div className="row align-middle d-flex" style={{height: 100 + '%', minHeight: 565 + 'px'}}>

                        <div className="col-md-6 m-auto">
                            <div className="user_card m-auto" style={{backgroundColor: 'rgba(0,0, 0, 0.8)', width: "550px", height: "400px"}}>
                                <h2 className=" titulos_login text-center" style={{}}>Reset Password </h2>

                                <form style={{marginTop: "10%", marginBottom: "29px"}} onSubmit={this.handleSubmit}>
                                    <div className="input-group mb-3">
                                        <input type="email" id="email" className="form-control input_user"
                                               style={{backgroundColor: "transparent"}} placeholder="your email account" onChange={this.handleChange}/>
                                    </div>

                                    <div className="d-flex justify-content-center mt-3 login_container">
                                        <button type="submit" name="button" className="btn login_btn">
                                            Reset
                                        </button>
                                    </div>
                                </form>

                                {(() => {
                                    if (authError) {
                                            return (
                                                <div className="text-danger text-center">
                                                <p style={{marginTop: '10px', marginLeft: "10%", width: "80%", fontSize: "small"}}> { authError } </p>                                         </div>
                                            )



                                    }
                                })()}

                              </div>
                        </div>
                    </div>
                </div>
            </section>


                {/*-------- MOBILE -------------*/}

                <div className="display-mobile" style={{height: 100 + '%'}}>
                    <section className="page-section bgcor" id="login" style={{height: 100 + 'vh', maxWidth: 100 + 'vw', minHeight: 565 + 'px'}}>
                    <div className="col-md-6 m-auto align-middle d-flex" style={{height: 100 + '%'}}>
                        <div className="user_card m-auto login_moblie" style={{backgroundColor: 'rgb(128, 19, 54)'}}>
                            <div className="text-center">
                                <h2 className=" titulos_login">Reset Password</h2>
                            </div>

                            <form className="mt-4" onSubmit={this.handleSubmit}>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"/></span>
                                    </div>
                                    <input type="email" id="email" className="form-control input_user"
                                           placeholder="email" onChange={this.handleChange}/>
                                </div>

                                <div className="d-flex justify-content-center mt-3 login_container">
                                    <button type="submit" name="button" className="btn login_btn"> Reset</button>
                                </div>
                            </form>
                            <div className="form-group text-danger text-center"> {authError ?
                                <p style={{marginTop: '5%', marginLeft: '5%', width: "90%", fontSize: "small"}}> { authError } </p> : null} </div>

                        </div>
                    </div>
                    </section>
                </div>

        </div>

        )
    }


}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
};

//faz a verificação do login
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ResetPassword: (creds) => dispatch(ResetPassword(creds, ownProps))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);

