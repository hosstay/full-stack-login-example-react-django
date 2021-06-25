import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './resources/bootstrap.min.css';
import './index.css';
import {Homepage} from './homepage/homepage';
import {Authentication} from './authentication/authentication';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/authentication" component={Authentication} />
          <Route path="/" component={Homepage} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);