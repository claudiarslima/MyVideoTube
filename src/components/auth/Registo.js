import React, { Component } from 'react';
import lol from '../../img/lol.mp4';
import { connect } from 'react-redux';
import { Registar } from '../../store/actions/authActions';


class Registo extends Component {
    //ESTADO INICIAL
      state = {
        username: ' ',
        email: ' ',
        password: ' '
      };

  //evento para ler o valor escrito nos inputs: email, password, nome e username e atualizar, assim, o valor do state
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  //evento para submeter o valor escrito nos inputs: email, password, nome e username
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.Registar(this.state);
    console.log(this.state);
  }

    render() {

      //usamos a const para fazer a verificação da autenticação na web-app e para processar eventuais erros no login
      const { auth, authError } = this.props;

      return(

      <section className="page-section" id="registo" style={{ height: 100 + '%', minHeight: 565 + 'px'}}>
          <div className="" style={{ minWidth: 100 + '%', height: 100 + '%', minHeight: 565 + 'px', zIndex: -99, position: 'absolute' }}>
              <video autoPlay muted loop id="video">
                  <source src={ lol } type="video/mp4" />
              </video>
          </div>
          <div style={{ width: 100 + '%',  height: 100 + 'vh',  minHeight: 565 + 'px', zIndex: 8, position: 'relative' }}>
              <div className="col-md-6 m-auto align-middle d-flex" style={{ height: 100 + '%'}}>
                  <div className="user_card m-auto">
                      <div className="text-center">
                          <h2 className="titulos_login">Sign Up</h2>
                      </div>

                      <form className="mt-4" onSubmit={this.handleSubmit}>
                          <div className="input-group mb-3">
                              <div className="input-group-append">
                                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                              </div>
                              <input type="text"  id="username" className="form-control input_user" placeholder="name" onChange={this.handleChange} />
                          </div>
                          <div className="input-group mb-3">
                              <div className="input-group-append">
                                  <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                              </div>
                              <input type="text" id="email" className="form-control input_user" placeholder="e-mail" onChange={this.handleChange}/>
                          </div>

                          <div className="input-group mb-2">
                              <div className="input-group-append">
                                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                              </div>
                              <input type="password" id="password" className="form-control input_pass"
                                     placeholder="password" onChange={this.handleChange}/>
                          </div>

                          <div className="d-flex justify-content-center mt-4 login_container">
                              <a href="#login" style={{ color: 'white' }}>
                                  <button type="submit" name="button" style={{ width: 100 + '%' }} className="btn login_btn">Sign Up
                                  </button>
                              </a>
                          </div>
                      </form>
                      <div className="form-group text-danger text-center">
                          {authError ? <p style={{marginTop: '10px',marginBottom: '0px'}}> { authError } </p> : null}
                      </div>
                      <div className="mt-4">
                          <div className="d-flex justify-content-center links legendas_login">
                              Already have an account? Sign in <a href="#login" className="ml-1">here</a>.
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </section>
      )
  }
}

//faz ligação aos dados da firebase
//dispara erros do reducer
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

//faz a verificação do registo
const mapDispatchToProps = (dispatch) => {
  return {
    Registar: (newUser) => dispatch(Registar(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registo);
