import React from 'react';
import PropTypes from 'prop-types';

import SecurityApi from '../../api/security';
import UserApi from '../../api/user';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.goToLogin = props.goToLogin;
    this.securityApi = new SecurityApi();
    this.userApi = new UserApi();
  }

  async componentDidMount() {
    try {
      if (!await this.securityApi.verifyToken()) {
        this.goToLogin();
      }

      const result = await this.userApi.logout();

      if (result) {
        this.goToLogin();
      } else {
        throw new Error('Something went wrong while logging out.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <label>Logging you out...</label>
      </div>
    );
  }
}

Logout.propTypes = {
  goToLogin: PropTypes.func
};