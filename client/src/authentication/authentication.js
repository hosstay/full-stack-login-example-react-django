import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from 'react-router-dom';

import Login from './login/login';
import Register from './register/register';

export function Authentication() {
  const match = useRouteMatch();
  if (match.path === '/') {
    match.path = '/authentication';
    match.url = '/authentication';
  }

  const history = useHistory();

  function goToHomepage() {
    history.push(`/homepage`);
  }

  function goToLogin() {
    history.push(`${match.url}/login`);
  }

  function goToRegister() {
    history.push(`${match.url}/register`);
  }

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/login`}>
          <Login goToRegister={goToRegister} goToHomepage={goToHomepage}/>
        </Route>
        <Route path={`${match.path}/register`}>
          <Register goToLogin={goToLogin}/>
        </Route>

        <Route path={match.path}>
          <Login goToRegister={goToRegister} goToHomepage={goToHomepage}/>
        </Route>
        <Route path='/'>
          <Login goToRegister={goToRegister} goToHomepage={goToHomepage}/>
        </Route>
      </Switch>
    </div>
  );
}