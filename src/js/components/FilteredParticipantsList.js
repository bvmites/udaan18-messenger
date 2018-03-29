import React, { Component } from 'react';
import { connect } from 'react-redux';
import ParticipantsList from './ParticipantsList';

class FilteredParticipantsList extends Component {
  render() {
    const participants = this.props.participants;
    const filteredParticipants = participants
      .filter(participant => participant.name.startsWith(this.props.filter));
    return (
      <ParticipantsList participants={filteredParticipants} />
    );
  }
}

const mapStateToProps = state => ({
  participants: state.participants.data,
  filter: state.participants.searchText
});

export default connect(mapStateToProps)(FilteredParticipantsList);
