import React from 'react';
import PropTypes from 'prop-types';

import './login.css';
import AuthenticationRoute from '../components/authentication_route/authentication-route';

import ValidationInput from '../../components/validation_input/validation-input';
import {
  inputUsernameColorValidator,
  pasteUsernameColorValidator,
  inputPasswordColorValidator,
  pastePasswordColorValidator
} from '../../components/validation_input/validators/validators';

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
      const cleanUsername = this.sanitizeLogin(this.state.username, 'Username');
      const cleanPassword = this.sanitizeLogin(this.state.password, 'Password');

      await this.userApi.logIn(cleanUsername, cleanPassword, this.goToHomepage);
    } catch (err) {
      document.getElementById('login-error-text').innerHTML = err.message;
      document.getElementById('login-error-text').style.display = 'block';
      console.log(err);
    }
  }

  render() {
    let imgStyle = {
      backgroundImage: 'url(' + this.backgroundImg + ')'
    }

    this.usernameValidators = {
      id: 'username',
      type: 'text',
      autoComplete: 'username',
      class: 'form-control',
      onInput: inputUsernameColorValidator,
      onPaste: pasteUsernameColorValidator,
      onChange: (event) => {this.handleChange(event)}
    };

    this.passwordValidators = {
      id: 'password',
      type: 'password',
      autoComplete: 'current-password',
      class: 'form-control',
      onInput: inputPasswordColorValidator,
      onPaste: pastePasswordColorValidator,
      onChange: (event) => {this.handleChange(event)}
    };

    return (
      <div>
        <div id="login-background-img" style={imgStyle} alt="Icy River"></div>
        <form id="login-div" onSubmit={(e) => this.loginSubmit(e)}>
          <label id="login-title">Test Website</label>

          <div id="login-error-text" className="alert alert-danger" role="alert"></div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <ValidationInput params={this.usernameValidators}></ValidationInput>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <ValidationInput params={this.passwordValidators}></ValidationInput>
          </div>

          <input id="submit-button" type="submit" className="btn btn-primary btn-block" value="Log in"></input>
          <div id="register-button" className="card-footer text-muted text-center" onClick={this.goToRegister}>
            New? <a href="">Register</a>
          </div>
          <small><a href="" className="text-muted text-decoration-underline">Forgot your password?</a></small>
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