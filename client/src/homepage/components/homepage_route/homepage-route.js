import React from 'react';
import PropTypes from 'prop-types';

import SecurityApi from '../../../api/security';

export default class HomepageRoute extends React.Component {
  constructor(props) {
    super(props);

    this.goToLogin = props.goToLogin;
    this.securityApi = new SecurityApi();
  }

  async componentDidMount() {
    if (!await this.securityApi.verifyToken()) {
      this.goToLogin();
    }
  }
}

HomepageRoute.propTypes = {
  goToLogin: PropTypes.func
};