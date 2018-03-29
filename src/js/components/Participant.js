import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectParticipant, deselectParticipant } from '../actions/participants';

import TableRow from 'grommet/components/TableRow';
import CheckBox from 'grommet/components/CheckBox';

class Participant extends Component {
  constructor() {
    super();
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleCheckBoxChange(e) {
    if (e.target.checked) {
      this.props.dispatch(selectParticipant(this.props._id));
    } else {
      this.props.dispatch(deselectParticipant(this.props._id));
    }
  }

  render() {
    return (
      <TableRow>
        <td><CheckBox onChange={this.handleCheckBoxChange} checked={this.props.isSelected} /></td>
        <td>{this.props.name}</td>
        <td>{this.props.phone}</td>
        <td className={this.props.isDelivered ? 'grommetux-color-index-ok' : 'grommetux-color-index-critical'}>
          <b>{this.props.isDelivered ? 'Delivered' : 'Not Delivered'}</b>
        </td>
      </TableRow>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Participant);
