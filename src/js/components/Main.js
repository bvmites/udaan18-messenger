import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';


import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import NotFound from '../screens/NotFound';
import Promote from '../screens/Promote';

class Main extends Component {
  constructor() {
    super();
  }

  render() {
    const nav = null; // Fix horizontal scrolling
    return (
      <App centered={false}>
        <Router>
          <Split flex='right' priority='right'>
            {nav}
            <Switch>
              <Route exact={true} path='/' component={Login} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/login' component={Login} />
              <Route path='/promote' component={Promote} />
              <Route path='/*' component={NotFound} />
            </Switch>
          </Split>
        </Router>
      </App>
    );
  }
}

export default Main;
