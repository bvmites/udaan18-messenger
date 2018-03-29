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

class Dashboard extends Component {
  constructor() {
    super();
    this._onNext = this._onNext.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadDashboard(this.props.eventId));
    pageLoaded('Dashboard');
  }

  _onNext() {
    const { router } = this.context;
    // TODO validate at least one participant is selected
    router.history.push('/promote');
  }

  render() {
    return (
      <App centered={false}>
        <Header colorIndex='grey-4'
          justify='center'
          align='center'>
          <Heading margin='medium' size='small'>
            Udaan18 SMS App
          </Heading>
        </Header>
        <RoundSection />
        <SearchSection />
        <FilteredParticipantsList />
        <Section>
          <Box size='xxlarge' alignSelf='center'>
            <Box size='small' alignSelf='start'>
              <Button
                label='Next'
                onClick={this._onNext}
                primary={true} />
            </Box>
          </Box>
        </Section>
      </App>
    );
  }
}

Dashboard.propTypes = {
  eventId: PropTypes.string,
  dispatch: PropTypes.func
};

Dashboard.defaultProps = {
  eventId: undefined,
  dispatch: undefined
};

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  eventId: state.user.eventId
});

export default connect(mapStateToProps)(Dashboard);
