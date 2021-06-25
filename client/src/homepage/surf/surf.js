import React from 'react';

import surf from './assets/carnaby-gilany-WgN9RDdyGjA-unsplash.jpg';

import HomepageRoute from '../components/homepage_route/homepage-route';

export default class Surf extends HomepageRoute {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={surf} style={{height: '93vh'}} alt="Surfing"></img>
      </div>
    );
  }
}