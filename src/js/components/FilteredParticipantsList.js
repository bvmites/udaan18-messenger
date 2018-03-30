import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ParticipantsList from './ParticipantsList';

class FilteredParticipantsList extends Component {
  render() {
    const participants = this.props.participants;
    const filteredParticipants = participants
      .filter(participant =>
        participant.name.toLowerCase()
          .startsWith(this.props.filter.toLowerCase())
      );
    return (
      <ParticipantsList participants={filteredParticipants} />
    );
  }
}

FilteredParticipantsList.propTypes = {
  participants: PropTypes.array,
  filter: PropTypes.string
};

FilteredParticipantsList.defaultProps = {
  participants: [],
  filter: ''
};

const mapStateToProps = state => ({
  participants: state.participants.data,
  filter: state.participants.searchText
});

export default connect(mapStateToProps)(FilteredParticipantsList);
