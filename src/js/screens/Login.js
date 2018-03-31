import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import LoginForm from 'grommet/components/LoginForm';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';


import { login } from '../actions/session';
import { pageLoaded } from './utils';

class Login extends Component {
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    pageLoaded('Login');
  }

  componentWillUnmount() {
  }

  _onSubmit(fields) {
    const { dispatch } = this.props;
    const { router } = this.context;
    dispatch(login(fields.username, fields.password, () => {
      router.history.push('/dashboard');
    }));
  }

  render() {
    const { error, isLoggingIn } = this.props;
    return (
      <Split flex='left' separator={true}>

        <Article>
          <Section
            full={true}
            colorIndex='brand'
            texture='url(img/splash.png)'
            pad='large'
            justify='center'
            align='center'
          >
            <Heading tag='h1' strong={true}>Instructions</Heading>
            <Paragraph align='center' size='large' margin='small'>
              1. Use the credentials provided to you by email or SMS to log in.
            </Paragraph>
            <Paragraph align='center' size='large' margin='small'>
              2. Use the check boxes beside participant names to select them for the next round.
            </Paragraph>
            <Paragraph align='center' size='large' margin='small'>
              3. Please verify the current round before clicking on next.
            </Paragraph>
            <Paragraph align='center' size='large' margin='small'>
              4. Select date and time carefully, verify the names of selected
              participants on the left side, and click on submit to send messages.
            </Paragraph>
            <Paragraph align='center' size='large' margin='small'>
              5. After submitting, wait for a while to get delivery status.
              <b>The status is updated automatically. You no longer need to refresh.</b>
            </Paragraph>
            <Paragraph align='center' size='large' margin='small'>
              6. To logout, simply close the browser window.
            </Paragraph>
          </Section>
        </Article>

        <Sidebar justify='between' align='center' pad='none' size='large'>
          <span />
          <LoginForm
            align='start'
            title='Udaan18 Messenger'
            onSubmit={isLoggingIn ? null : this._onSubmit}
            errors={[error]}
            usernameType='text'
          />
          <Footer
            direction='row'
            size='small'
            pad={{ horizontal: 'medium', vertical: 'small' }}
          />
        </Sidebar>

      </Split>
    );
  }
}

Login.defaultProps = {
  error: undefined
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string
};

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};

const select = state => ({
  session: state.session,
  error: state.user.loginError,
  isLoggingIn: state.user.isLoggingIn
});

export default connect(select)(Login);
