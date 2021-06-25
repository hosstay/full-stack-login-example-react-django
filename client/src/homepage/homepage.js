import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from 'react-router-dom';

import NavBar from './components/navbar/navbar';

import Home from './home/home';
import Name from './name/name';
import Surf from './surf/surf';
import Logout from './logout/logout';

export function Homepage() {
  const match = useRouteMatch();
  if (match.path === '/') {
    match.path = '/homepage';
    match.url = '/homepage';
  }

  const history = useHistory();

  function goToLogin() {
    history.push(`/authentication`);
  }

  return (
    <div>
      <NavBar match={match}/>

      <Switch>
        <Route path={`${match.path}/home`}>
          <Home goToLogin={goToLogin}/>
        </Route>
        <Route path={`${match.path}/name`}>
          <Name goToLogin={goToLogin}/>
        </Route>
        <Route path={`${match.path}/surf`}>
          <Surf goToLogin={goToLogin}/>
        </Route>
        <Route path={`${match.path}/logout`}>
          <Logout goToLogin={goToLogin}/>
        </Route>

        <Route path={match.path}>
          <Home goToLogin={goToLogin}/>
        </Route>
        <Route path='/'>
          <Home goToLogin={goToLogin}/>
        </Route>
      </Switch>
    </div>
  );
}