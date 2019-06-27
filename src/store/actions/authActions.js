// -------------------------- PÁGINA QUE PROCESSA VERIFICAÇÕES A NÍVEL DO LOGIN, LOGOUT, REGISTO E EDIÇÃO DE DADOS -------------------------------------------------//
import { push } from 'react-router-redux';

//faz a verificação do login
export const LogIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_EFETUADO'})
        }).catch((err) => {
            dispatch({type: 'ERRO_LOGIN', err})
        });
    }
};

//faz a verificação do resgisto
export const Registar = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                username: newUser.username,
                email: newUser.email
            })
        }).then(() => {
            dispatch({type: 'USER_REGISTADO'})
        }).catch(err => {
            dispatch({type: 'ERRO_REGISTO', err})
        })
    }
};


//faz a alteração do email de autenticação
export const EmailUpdate = (dataemail, ownProps) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        console.log(dataemail);

        if (user) {
            user.updateEmail(dataemail).then(function () {
                console.log("email alterado"); // Email sent.
                ownProps.history.push(`/perfil`);

                // Update successful.
                user.sendEmailVerification().then(function () {
                    console.log("email enviado") // Email sent.
                }).catch(function (error) {
                    console.log(error)
                    // An error happened.
                });
            }).catch(function (err) {
                dispatch({type: 'ERRO_EMAIL', err});
                console.log(err)
                // An error happened.
            });
        }

    }
};


//reautentica o utilizador e faz a alteração da password
export const changePass = (credent) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            credent.email, credent.passwordCurrent);

        if (user) {

            user.reauthenticateAndRetrieveDataWithCredential(cred).then(function () {
                // User re-authenticated.

                user.updatePassword(credent.passwordOne).then(() => {
                    console.log("Password updated!");
                    window.location.href = '/perfil'


                }).catch((err) => {
                    dispatch({type: 'ERRO_UPDATEPASS', err});

                    console.log(err)
                })

            }).catch(function (err) {
                dispatch({type: 'ERRO_PASSWORD', err});

                console.log(err)
                // An error happened.
            });
        }
        else {
            console.log("Não existe user");
        }

    }
};


//faz a verificação da edição de dados
export const Editar = (data, ownProps) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        const user = firebase.auth().currentUser;
        if (user) {
            if (data.email === ' ') {
                firestore.collection('users').doc(user.uid).update({
                    username: data.username,
                }).then(() => {
                    console.log("username alterado");
                    dispatch({type: 'DADOS_ALTERADOS'})
                    ownProps.history.push(`/perfil`);

                }).catch(err => {
                    dispatch({type: 'ERRO_ALTERAR'})
                });
            }
            else if (data.username === ' ') {
                firestore.collection('users').doc(user.uid).update({
                    email: data.email,
                }).then(() => {
                    console.log("email alterado");

                    dispatch({type: 'DADOS_ALTERADOS'})
                }).catch(err => {
                    dispatch({type: 'ERRO_ALTERAR'})
                });
            }
            else {
                firestore.collection('users').doc(user.uid).update({
                    username: data.username,
                    email: data.email,
                }).then(() => {
                    console.log("dados alterados");

                    dispatch({type: 'DADOS_ALTERADOS'})
                    ownProps.history.push(`/perfil`);

                }).catch(err => {
                    dispatch({type: 'ERRO_ALTERAR'})
                });
            }


        } else {
            console.log("erro ao alterar");
        }
    }
};

export const ResetPassword = (authemail, ownProps) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();

        const auth = firebase.auth();

        auth.sendPasswordResetEmail(authemail.email).then(function () {
            // Email sent.
            console.log("email enviado", authemail.email);
            // ;

            let email_certo = authemail.email;

            dispatch({type:'RESET_FEITO', email_certo});

            ownProps.history.push(`/verificaremail/`);

        }).catch(function (err) {
            // An error happened.
            dispatch({type: 'ERRO_RESET', err});

        });
    }
};


//faz a verificação do logout
export const LogOut = (ownProps) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});

            ownProps.history.push(`/Dashboard`);
            window.location.reload();
            console.log ('eiiii')
        });
    }
};
