import React from 'react';

import doggo from './assets/maksym-tymchyk-RwvwxBjPnsI-unsplash.jpg';

import HomepageRoute from '../components/homepage_route/homepage-route';

export default class Home extends HomepageRoute {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>Welcome to my test webpage!</label>
        <br />
        <br />

        <img src={doggo} style={{height: '84vh'}} alt="Doggo"></img>
      </div>
    );
  }
}