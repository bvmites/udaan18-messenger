import React, { Component, PropTypes } from 'react';
import {
  Button,
  DateTime,
  Footer,
  Form,
  FormField,
  FormFields,
  Header,
  Heading,
  Paragraph,
  TextInput } from 'grommet';
import { changeDate, changeTime, changeVenue } from '../actions/promotionData';
import { connect } from 'react-redux';

class RoundDetailsPicker extends Component {
  constructor() {
    super();
    this._onTimeChange = this._onTimeChange.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this._onVenueChange = this._onVenueChange.bind(this);
    this._onBack = this._onBack.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
  }

  _onDateChange(date) {
    const { dispatch } = this.props;
    dispatch(changeDate(date));
  }

  _onTimeChange(time) {
    const { dispatch } = this.props;
    dispatch(changeTime(time));
  }

  _onVenueChange(venue) {
    const { dispatch } = this.props;
    dispatch(changeVenue(venue));
  }

  _onBack() {
    const { router } = this.context;
    router.history.push('/dashboard');
  }

  handleDateTimeChange(dateTime) {
    const date = dateTime.slice(0, 10);
    const time = dateTime.slice(11);
    this._onDateChange(date);
    this._onTimeChange(time);
  }

  render() {
    const footer = !this.props.isLastRound
      ? (<Footer pad={{ vertical: 'medium', between: 'small' }}>
        <Button label='Submit'
          primary={true}
          onClick={this.props.isSending ? null : this.props.onClick} />
        <Button label='Go Back'
          primary={false}
          onClick={this._onBack} />
      </Footer>)
      : (<Footer pad={{ vertical: 'medium', between: 'small' }}>
        <Paragraph>This is the last round. You cannot promote further.</Paragraph>
      </Footer>);
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
              format='DD/MM/YYYY hh:mm a'
              name='datetime'
              onChange={this.handleDateTimeChange}
              value={this.props.dateTime}
            />
          </FormField>
          <FormField label='Venue'>
            <TextInput value={this.props.venue}
              onDOMChange={e => this._onVenueChange(e.target.value)} />
          </FormField>
          {footer}
          <Paragraph margin='none'>
            {this.props.error}
          </Paragraph>
        </FormFields>
      </Form>
    );
  }
}

RoundDetailsPicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  dateTime: PropTypes.string,
  venue: PropTypes.string,
  isSending: PropTypes.bool,
  isLastRound: PropTypes.bool,
  error: PropTypes.string
};

RoundDetailsPicker.defaultProps = {
  onClick: () => {
  },
  dateTime: '',
  venue: '',
  isSending: false,
  isLastRound: false,
  error: null
};

const mapStateToProps = state => ({
  dateTime: `${state.roundData.date || ''} ${state.roundData.time || ''}`,
  venue: state.roundData.venue || '',
  isLastRound: state.event.data.isLastRound,
  error: state.promotionData.sendError,
  isSending: state.promotionData.isSending
});

RoundDetailsPicker.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(RoundDetailsPicker);
