import React from 'react';

import HomepageRoute from '../components/homepage_route/homepage-route';
import NameForm from '../components/name_form/name-form';

export default class Name extends HomepageRoute {
  constructor(props) {
    super(props);

    this.labelText = 'Enter Name:';
  }

  render() {
    return (
      <div>
        <NameForm labelText={this.labelText}></NameForm>
      </div>
    );
  }
}