import React, { Component, PropTypes } from 'react';

import App from 'grommet/components/App';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import RoundSection from '../components/RoundSection';
import SearchSection from '../components/SearchSection';
import FilteredParticipantsList from '../components/FilteredParticipantsList';
import { loadDashboard } from '../actions/dashboard';
import { connect } from 'react-redux';
import { pageLoaded } from './utils';
import { Box, Button, Section } from 'grommet';
import { clearAllParticipants, selectAllParticipants } from '../actions/participants';

class Dashboard extends Component {
  constructor() {
    super();
    this._onNext = this._onNext.bind(this);
    this._onSelectAll = this._onSelectAll.bind(this);
    this._onClearAll = this._onClearAll.bind(this);
  }

  componentWillMount() {
    const { isLoggedIn } = this.props;
    const { router } = this.context;
    if (!isLoggedIn) {
      router.history.replace('/login');
    } else if (!this.props.loaded) {
      this.props.dispatch(loadDashboard(this.props.eventId));
    }
  }

  componentDidMount() {
    pageLoaded('Dashboard');
  }

  _onNext() {
    const { router } = this.context;
    // TODO validate at least one participant is selected
    router.history.push('/promote');
  }

  _onSelectAll() {
    const { dispatch } = this.props;
    dispatch(selectAllParticipants());
  }

  _onClearAll() {
    const { dispatch } = this.props;
    dispatch(clearAllParticipants());
  }

  render() {
    if (!this.props.isLoggedIn) return null;
    return (
      <App centered={false}>
        <Header colorIndex='grey-4'
          justify='center'
          align='center'>
          <Heading margin='medium' size='small'>
            Udaan18 Messenger
          </Heading>
        </Header>
        <RoundSection />
        <SearchSection />
        <FilteredParticipantsList />
        <Section>
          <Box size='xxlarge' alignSelf='center' direction='row' pad={{ between: 'small' }}>
            <Box size='small' alignSelf='start'>
              <Button
                label='Next'
                onClick={this._onNext}
                primary={true} />
            </Box>
            <Box size='small' alignSelf='start'>
              <Button
                label='Select All'
                onClick={this._onSelectAll}
                primary={true} />
            </Box>
            <Box size='small' alignSelf='start'>
              <Button
                label='Clear All'
                onClick={this._onClearAll}
                primary={false} />
            </Box>
          </Box>
        </Section>
      </App>
    );
  }
}

Dashboard.propTypes = {
  eventId: PropTypes.string,
  dispatch: PropTypes.func,
  loaded: PropTypes.bool,
  isLoggedIn: PropTypes.bool
};

Dashboard.defaultProps = {
  eventId: undefined,
  dispatch: undefined,
  loaded: false,
  isLoggedIn: false
};

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  eventId: state.user.eventId,
  loaded: state.participants.fetched,
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(Dashboard);
