import React, { Component, PropTypes } from 'react';

import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

import { connect } from 'react-redux';

class RoundSection extends Component {
  render() {
    return (
      <Section pad={{ horizontal: 'small', vertical: 'small' }}
        full='false'
        margin='none'
        colorIndex='brand'
      >
        <Box size='xxlarge' alignSelf='center'>
          <Box direction='row' justify='between'>
            <Heading tag='h2' margin='none'>
              Round Promotion
            </Heading>
            <Heading tag='h2' margin='none'>
              Event: <b>{this.props.eventName}</b>
            </Heading>
          </Box>
        </Box>
      </Section>
    );
  }
}

RoundSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventName: PropTypes.string
};

RoundSection.defaultProps = {
  eventName: undefined
};

const mapStateToProps = state => ({
  eventName: state.event.data.eventName,
  eventId: state.event.eventId
});

export default connect(mapStateToProps)(RoundSection);
