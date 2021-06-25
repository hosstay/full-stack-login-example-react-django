import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import homeButton from './assets/home_button.png';

import './nav-bar.css';

export default function NavBar(props) {
  const match = props.match;

  return (
    <ul id="nav-bar">
      <li><Link to={`${match.url}/home`}><img src={homeButton} alt="Home"></img></Link></li>
      <li><Link to={`${match.url}/name`}>Name Page</Link></li>
      <li><Link to={`${match.url}/surf`}>Surf</Link></li>
      <li><Link to={`${match.url}/logout`}>Log out</Link></li>
    </ul>
  );
}

NavBar.propTypes = {
  match: PropTypes.object
};