import React from 'react';

import icyRiver from '../../assets/vladimir-fedotov-GWggAB8uAlA-unsplash.jpg';

import {sanitizeLogin} from '../../../utility/security';
import UserApi from '../../../api/user';

export default class AuthenticationRoute extends React.Component {
  constructor(props) {
    super(props);

    this.backgroundImg = icyRiver;
    this.sanitizeLogin = sanitizeLogin;
    this.userApi = new UserApi();
  }

  handleChange(event) {
    if (event.target.id === 'username') {
      this.setState({username: event.target.value});
    } else if (event.target.id === 'password') {
      this.setState({password: event.target.value});
    } else if (event.target.id === 'confirm-password') {
      this.setState({confirmPassword: event.target.value});
    }
  }

  // Allows the user to hit enter to submit the form
  handleEnter(event) {
    event = event || window.event;

    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById('submit-button').click();
    }
  }

  // Informs the user when capslock is on.
  handleCapsLock(event) {
    event = event || window.event;
    const char = String.fromCharCode(event.keyCode || event.which);

    if (char.toUpperCase() === char && char.toLowerCase() !== char && !event.shiftKey) {
      document.getElementById('error-text').innerHTML = 'Caps Lock is on.';
    } else {
      document.getElementById('error-text').innerHTML = '';
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleEnter);
    document.addEventListener('keypress', this.handleCapsLock);
    document.getElementById('username').focus();
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleEnter);
    document.removeEventListener('keypress', this.handleCapsLock);
  }
}