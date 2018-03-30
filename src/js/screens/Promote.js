import React, { Component, PropTypes } from 'react';
import { Article, Heading, Section, Sidebar, Split } from 'grommet';
import RoundDetailsPicker from '../components/RoundDetailsPicker';
import SelectedParticipantsList from '../components/SelectedParticipantsList';
import { connect } from 'react-redux';

import { promoteParticipants } from '../actions/participants';

class Promote extends Component {
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillMount() {
    const { isLoggedIn } = this.props;
    const { router } = this.context;
    if (!isLoggedIn) {
      router.history.replace('/login');
    }
  }

  _onSubmit() {
    const { dispatch } = this.props;
    const { router } = this.context;
    const { date, time, venue, ids, eventId } = this.props.promotionData;
    dispatch(promoteParticipants(ids, eventId, date, time, venue, () => {
      router.history.replace('/dashboard');
    }));
  }

  render() {
    if (!this.props.isLoggedIn) { return null; }
    return (
      <Split flex='left' separator={true}>

        <Article>
          <Section
            pad='medium'>
            <Heading tag='h2' strong={true}>Selected Participants</Heading>
          </Section>
          <Section
            pad='medium'>
            <SelectedParticipantsList />
          </Section>
        </Article>

        <Sidebar colorIndex='neutral-3-a'
          fixed={true}
          justify='between'
          align='end'
          pad='none'
          size='large'
        >
          <RoundDetailsPicker onClick={this._onSubmit} />
        </Sidebar>

      </Split>
    );
  }
}

Promote.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  promotionData: PropTypes.object
};

Promote.defaultProps = {
  isLoggedIn: false,
  promotionData: {}
};

Promote.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  promotionData: {
    date: state.roundData.date,
    time: state.roundData.time,
    venue: state.roundData.venue,
    ids: state.participants.data.filter(p => p.isSelected).map(p => p._id),
    eventId: state.user.eventId
  },
  isLastRound: state.event.isLastRound
});

export default connect(mapStateToProps)(Promote);
