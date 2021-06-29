import React from 'react';
import PropTypes from 'prop-types';

import './login.css';
import AuthenticationRoute from '../components/authentication_route/authentication-route';

export default class Login extends AuthenticationRoute {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.login = props.login;
    this.goToRegister = props.goToRegister;
    this.goToHomepage = props.goToHomepage;
  }

  async loginSubmit(e) {
    try {
      e.preventDefault();
      const cleanUsername = this.sanitizeLogin(this.state.username, 'username', 6, 32);
      const cleanPassword = this.sanitizeLogin(this.state.password, 'password', 8, 18);

      await this.userApi.logIn(cleanUsername, cleanPassword, this.goToHomepage);
    } catch (err) {
      document.getElementById('error-text').innerHTML = err.message;
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <img id="background-img" src={this.backgroundImg} alt="Icy River"></img>
        <form id="login-div" onSubmit={(e) => this.loginSubmit(e)}>
          <label id="title">Test Website</label>
          <br />
          <br />

          <label>Username:</label>
          <input id="username" type="text" className="float-right" autoComplete="username" value={this.state.username} onChange={(event) => this.handleChange(event)}></input>
          <br />
          <br />

          <label>Password:</label>
          <input id="password" type="password" className="float-right" autoComplete="current-password" value={this.state.password} onChange={(event) => this.handleChange(event)}></input>
          <br />
          <br />

          <input id="submit-button" type="submit" className="float-right" value="Login"></input>
          <input id="register-button" type="button" className="float-left" value="Register" onClick={this.goToRegister}></input>
          <br />
          <br />

          <p id="error-text"></p>
          <br />
          <br />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  goToRegister: PropTypes.func,
  goToHomepage: PropTypes.func
};