import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import SearchBar from './SearchBar';

class SearchSection extends Component {
  render() {
    return (
      <Section pad={{ horizontal: 'small', vertical: 'small' }}
        full='false'
        margin='none'
        colorIndex='light-2'
      >
        <Box size='xxlarge' alignSelf='center'>
          <Box direction='row' justify='between'>
            <Heading tag='h3' margin='none'>
              Current Round: <b>{this.props.round}</b>
            </Heading>
            <Heading tag='h3' margin='none'>
              <SearchBar />
            </Heading>
          </Box>
        </Box>
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  round: state.event.data.currentRound,
  searchText: state.participants.searchText
});

export default connect(mapStateToProps)(SearchSection);
