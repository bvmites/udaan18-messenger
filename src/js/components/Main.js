import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';

import { apiBaseUrl } from '../config';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Responsive from 'grommet/utils/Responsive';

import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import NotFound from '../screens/NotFound';
import Promote from '../screens/Promote';
import { updateDeliveryStatus } from '../actions/participants';
import { Box, Heading } from 'grommet';
import { connect } from 'react-redux';

class Main extends Component {
  constructor() {
    super();
    this._onResponsive = this._onResponsive.bind(this);
    this.state = {};
  }

  componentDidMount() {
    this._responsive = Responsive.start(this._onResponsive);
    const socketClient = io(`${apiBaseUrl}/receipts`);
    const { dispatch } = this.props;
    socketClient.on('connect', () => console.log('Connected.'));
    socketClient.on('receipt', (receipt) => {
      const { customID, number, status } = receipt;
      if (customID && customID === this.props.eventId) {
        dispatch(updateDeliveryStatus(number.slice(2), status));
      }
    });
  }

  componentWillUnmount() {
    this._responsive.stop();
  }

  _onResponsive(small) {
    this.setState({ small });
  }

  render() {
    const nav = null; // Fix horizontal scrolling
    const { small } = this.state;
    return (
      <App centered={false}>
        {!small
          ? (<Router>
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
          </Router>)
          : (<Box full={true} alignContent='center'>
            <Box alignSelf='center'>
              <Heading align='center' margin='large'>Please use this app on Laptop.</Heading>
            </Box>
          </Box>)
        }
      </App>
    );
  }
}

const mapStateToProps = state => ({
  eventId: state.user.eventId,
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(Main);
