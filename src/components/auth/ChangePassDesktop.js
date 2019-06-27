import React, {Component} from 'react';

import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {changePass} from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import {Collapse} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


const INITIAL_STATE = {
    passwordCurrent: '',
    passwordOne: '',
    passwordTwo: '',
    email: '',
    error: null,
    open: false,
    alterar: false,

};

class ChangePassDesktop extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        event.preventDefault();
        this.setState({alterar: true});
        this.props.changePass(this.state);

    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.setState({email: this.props.auth.email})
    };

    render() {

  
        const {passwordCurrent, passwordOne, passwordTwo, error} = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '' || passwordCurrent === '';

        const {auth, authError} = this.props;

        return (

            <div>
                <form onSubmit={this.onSubmit}>
                    <label className="mb-2"
                           style={{color: "white", width: "100%"}}>CURRENT PASSWORD<br/>
                        <input
                            style={{
                                backgroundColor: "transparent",
                                width: "200px",
                                borderRadius: "17px",
                                height: "40px",
                                border: "1px solid grey",
                                fontSize: "12px"
                            }}
                            className="mt-2 styleinput"
                            name="passwordCurrent"
                            value={passwordCurrent}
                            onChange={this.onChange}
                            type="password"
                            placeholder="  Current Password"
                        /></label>
                    <hr style={{
                        backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                        border: 0,
                        height: "1px"
                    }}/>
                    <label className="mb-2"
                           style={{color: "white", width: "100%"}}>NEW PASSWORD<br/>
                        <input
                            style={{
                                backgroundColor: "transparent",
                                width: "200px",
                                borderRadius: "17px",
                                height: "40px",
                                border: "1px solid grey",
                                fontSize: "12px"
                            }}
                            className="mt-2"
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="   New Password"
                        /></label>
                    <hr style={{
                        backgroundImage: "linear-gradient(90deg, #801336, transparent)",
                        border: 0,
                        height: "1px"
                    }}/>
                    <label className="mb-2"
                           style={{color: "white", width: "100%"}}>CONFIRM NEW PASSWORD<br/>
                        <input
                            style={{
                                backgroundColor: "transparent",
                                width: "200px",
                                borderRadius: "17px",
                                height: "40px",
                                border: "1px solid grey",
                                fontSize: "12px"
                            }}
                            className="mt-2"
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="   Confirm New Password"
                        /></label>
                    <div className="d-flex justify-content-center">
                        <button disabled={isInvalid} className="btn" style={{
                            width: "35%",
                            marginTop: "-4%",
                            marginLeft: "65%",
                            backgroundColor: "rgb(128, 19, 54)",
                            color: "white",
                            borderRadius: "12px"
                        }} type="submit">
                            Change My Password
                        </button>
                    </div>

                    {error && <p>{error.message}</p>}
                </form>


                <div className="form-group text-danger text-center">

                    {(() => {
                        if (authError) {
                            if (authError === "The password is invalid or the user does not have a password." || authError === "Password should be at least 6 characters") {
                                return (
                                    <p style={{
                                        marginTop: '-8%',
                                        marginLeft: '-26.5%',
                                        width: '100%', color: 'red',
                                        fontSize: "x-small"
                                    }}> {authError}
                                    </p>)
                            }


                        }
                    })()}

                </div>

            </div>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePass: (credent) => dispatch(changePass(credent))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassDesktop);
