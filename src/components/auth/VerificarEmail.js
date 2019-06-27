import React, { Component } from 'react';
import logo from '../../img/logo.png';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {ResetPassword} from '../../store/actions/authActions';
import {Link} from 'react-router-dom';
import fundo from "../../img/my1.png";



class VerificarEmail extends Component {

    constructor(props) {
        super(props);
    }

    // STATE INICIAL
    state = {
        email: ' ',
    };

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
        const {auth, authError, email} = this.props;

        console.log(this.props.email);
        return (

            <div>

            <section className="page-section" id="login" style={{height: 100 + 'vh', maxWidth: 100 + 'vw', minHeight: 565 + 'px'}}>

                <div className=" display-desktop" style={{height: 100 + '%', minHeight: 565 + 'px'}}>

                    <div className="" style={{ minWidth: 100 + '%', height: 50 + 'vh', minHeight: 565 + 'px',  position: 'absolute' }}>
                        <img src={fundo} style={{minWidth: 100 + '%', height: 100 + 'vh', minHeight: 565 + 'px', opacity: '0.5'}}/>
                    </div>
                    <div className="row align-middle d-flex" style={{height: 100 + '%', minHeight: 565 + 'px'}}>

                        <div className="col-md-6 m-auto">
                            <div className="user_card m-auto" style={{backgroundColor: 'rgba(0,0, 0, 0.8)', width: "550px", height: "400px"}}>
                                <h2 className=" titulos_login text-center" style={{}}>Reset Password </h2>

                                <p style={{color: "lightgrey", marginTop: "4%", textAlign: "justify", fontSize: "small", width: "80%", marginLeft: "10%"}}>

                                    We sent an email to {this.props.email}. Click the email link to reset your password.
                                    <br/><br/>

                                    If you can not see the email, check other places where it may be, such as your junk, spam, social, or others.

                                </p>

                                <div className="d-flex justify-content-center mt-3 login_container">
                                    <button name="button" className="btn login_btn">
                                          <a href="/Dashboard" style={{width: "100%" , color: "white", textDecoration: "none"}}> Back </a>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


                {/*-------- MOBILE -------------*/}

                <div className="display-mobile" style={{height: 100 + '%'}}>
                    <section className="page-section" id="login" style={{height: 100 + 'vh', maxWidth: 100 + 'vw', minHeight: 565 + 'px'}}>
                    <div className="col-md-6 m-auto align-middle d-flex" style={{height: 100 + '%'}}>
                        <Link style={{width: '25%', height: '10%'}} to='./dashboard'><img src={logo} style={{width: "75%", height: "75%", position: "relative", top: "10px", left: "-1%"}} className="img-fluid"/></Link>
                        <div className="user_card m-auto login_moblie" style={{backgroundColor: 'rgb(128, 19, 54)'}}>
                            <div className="">
                                <h2 className=" titulos_login text-center">Reset Password</h2>
                            </div>

                            <p style={{color: "lightgrey", textAlign: "justify", fontSize: "small", width: "110%", marginLeft: "-20%", marginTop: "4%"}}>

                                We sent an email to {this.props.email}. Click the email link to reset your password.
                                <br/><br/>

                                If you can not see the email, check other places where it may be, such as your junk, spam, social, or others.

                            </p>


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
        auth: state.firebase.auth,
        email: state.auth.email
    }
};


export default connect(mapStateToProps)(VerificarEmail);


