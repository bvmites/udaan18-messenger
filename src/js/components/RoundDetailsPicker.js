import React, { Component, PropTypes } from 'react';
import { Button, DateTime, Footer, Form, FormField, FormFields, Header, Heading, TextInput } from 'grommet';

class RoundDetailsPicker extends Component {
  render() {
    return (
      <Form pad='medium'>
        <Header>
          <Heading>
            Round Details
          </Heading>
        </Header>
        <FormFields>
          <FormField label='Date and Time'>
            <DateTime id='id'
              name='datetime'
              onChange={() => {}} />
          </FormField>
          <FormField label='Venue'>
            <TextInput />
          </FormField>
        </FormFields>
        <Footer pad={{ vertical: 'medium' }}>
          <Button label='Submit'
            type='submit'
            primary={true}
            onClick={() => {}} />
        </Footer>
      </Form>
    );
  }
}

export default RoundDetailsPicker;
