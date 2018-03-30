import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box, Table, TableHeader, TableRow } from 'grommet';

class SelectedParticipantsList extends Component {
  render() {
    const { participants } = this.props;
    return (
      <Box>
        <Table>
          <TableHeader labels={['Name', 'Phone']} />
          <tbody>
            {participants.map(p =>
              (<TableRow key={p._id}>
                <td>{p.name}</td>
                <td>{p.phone}</td>
              </TableRow>)
            )}
          </tbody>
        </Table>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  participants: state.participants.data.filter(p => p.isSelected)
});

export default connect(mapStateToProps)(SelectedParticipantsList);
