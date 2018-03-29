import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Participant from './Participant';
import { Button } from 'grommet';

class ParticipantsList extends Component {
  render() {
    const { participants } = this.props;
    const listItems = participants.map(p => (
      <Participant key={p._id} {...p} />
    ));
    return (
      <Section>
        <Box size='xxlarge' alignSelf='center'>
          <Table>
            <TableHeader labels={['Select', 'Participant name', 'Phone number', 'Status']} />
            <tbody>
              {listItems}
            </tbody>
          </Table>
        </Box>
      </Section>
    );
  }
}

export default connect()(ParticipantsList);
