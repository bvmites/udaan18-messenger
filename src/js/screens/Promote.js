import React, { Component } from 'react';
import { Article, Heading, Section, Sidebar, Split } from 'grommet';
import RoundDetailsPicker from '../components/RoundDetailsPicker';
import SelectedParticipantsList from '../components/SelectedParticipantsList';

class Promote extends Component {
  render() {
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
          fixed='true'
          justify='between'
          align='right'
          pad='none'
          size='large'
        >
          <RoundDetailsPicker />
        </Sidebar>

      </Split>
    );
  }
}

export default Promote;
