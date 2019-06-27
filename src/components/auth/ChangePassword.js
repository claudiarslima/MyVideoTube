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
    autherrorpass: false,
    errors: false,
};

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        event.preventDefault();
        this.setState({
            alterar: true, autherror: true,
        });
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
            <div id="accordion" className="">

                <Button
                    onClick={() => this.setState({open: !this.state.open})}
                    aria-controls="example-collapse-text"
                    aria-expanded={this.state.open}
                    className='security-btn btn-block btn-lg'
                    variant="dark"

                    style={{
                        padding: "1rem 2.4rem",
                        fontSize: "0.94rem"
                    }}
                >
                    CHANGE PASSWORD
                </Button>


                <Collapse in={this.state.open}>
                    <div id="example-collapse-text">
                        <div className="card-body" style={{color: "white"}}>

                            <form onSubmit={this.onSubmit}>
                                <input
                                    className="mt-2"
                                    name="passwordCurrent"
                                    value={passwordCurrent}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder="Current Password"
                                /> <br/>
                                <input
                                    className="mt-2"
                                    name="passwordOne"
                                    value={passwordOne}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder="New Password"
                                /> <br/>
                                <input
                                    className="mt-2"
                                    name="passwordTwo"
                                    value={passwordTwo}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder="Confirm New Password"
                                />
                                <div className="">
                                    <div className="form-group text-danger text-center">

                                        {(() => {
                                            if (authError) {
                                                if (authError === "The password is invalid or the user does not have a password." && (passwordOne !== '' || passwordCurrent !== '') && this.state.autherror === true) {
                                                    return (
                                                        <p style={{
                                                            width: '100%',
                                                            color: 'red',
                                                            fontSize: "x-small",
                                                            marginTop: "3%", marginLeft: "-7%",
                                                        }}> { authError }
                                                        </p>                                                        )
                                                }

                                                else if (authError === "Password should be at least 6 characters" && (passwordOne !== '' || passwordCurrent !== '')) {
                                                    return (
                                                        <p style={{
                                                            width: '100%',
                                                            color: 'red',
                                                            fontSize: "x-small",
                                                            marginTop: "3%", marginLeft: "-22%",
                                                        }}> { authError }
                                                        </p>                                                        )
                                                }

                                            }

                                        })()}

                                    </div>
                                    <button disabled={isInvalid} className="btn" type="submit" style={{
                                        width: "67%",
                                        marginTop: "3%",
                                        marginLeft: "0%",
                                        backgroundColor: "rgb(128, 19, 54)",
                                        borderColor: "#233656",
                                        color: "white"
                                    }}>
                                        Change My Password
                                    </button>
                                </div>

                                {error && <p>{error.message}</p>}
                            </form>


                        </div>
                    </div>
                </Collapse>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
