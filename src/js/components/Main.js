import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';

import { apiBaseUrl } from '../config';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';

import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import NotFound from '../screens/NotFound';
import Promote from '../screens/Promote';
import { connect } from 'react-redux';
import { updateDeliveryStatus } from '../actions/participants';

class Main extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const socketClient = io(`${apiBaseUrl}/receipts`);
    const { dispatch } = this.props;
    socketClient.on('connect', () => console.log('Connected.'));
    socketClient.on('receipt', (receipt) => {
      console.log('RECEIPT', receipt);
      const { customID, number, status } = receipt;
      if (customID && customID === this.props.eventId) {
        console.log('UPDATE');
        dispatch(updateDeliveryStatus(number.slice(2), status));
      }
    });
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

const mapStateToProps = state => ({
  eventId: state.user.eventId
});

export default connect(mapStateToProps)(Main);
