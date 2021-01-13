import React from 'react';
import md5 from 'md5';
import firebase from '../../firebase';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    userRef: firebase.database().ref('users')
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (passwordConfirmation !== password) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors => {
    return errors.map((error, i) => (
      <p key={i} style={{ color: 'red' }}>
        {error.message}
      </p>
    ));
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password is not valid' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };
  handleSubmit = event => {
    if (this.isFormValid()) {
      event.preventDefault();
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                this.setState({ loading: false });
                console.log('user saved');
              });
            })
            .catch(err => {
              console.log(err);
              this.setState({
                loading: false,
                errors: this.state.errors.concat(err)
              });
            });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      console.log(this.state.errors);
    }
  };

  saveUser = createdUser => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  handleInputError = (errors, inputName) => {
    return this.state.errors.some(error =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };
  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      loading
    } = this.state;
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' icon color='orange' textAlign='center'>
            <Icon name='puzzle piece' color='orange' />
            Regiter for VenDChat
          </Header>
          <Form onSubmit={this.handleSubmit} size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                name='username'
                icon='user'
                iconPosition='left'
                placeholder='Username'
                onChange={this.handleChange}
                type='text'
                value={username}
              />
              <Form.Input
                fluid
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder='Email Address'
                onChange={this.handleChange}
                type='email'
                value={email}
                className={this.handleInputError(this.state.errors, 'email')}
              />
              <Form.Input
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                onChange={this.handleChange}
                type='password'
                value={password}
                className={this.handleInputError(this.state.errors, 'password')}
              />
              <Form.Input
                fluid
                name='passwordConfirmation'
                icon='repeat'
                iconPosition='left'
                placeholder='Confirm Password'
                onChange={this.handleChange}
                type='password'
                value={passwordConfirmation}
                className={this.handleInputError(this.state.errors, 'password')}
              />
              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color='orange'
                fluid
                size='large'
              >
                Submit
              </Button>
            </Segment>
            {this.state.errors.length > 0 && (
              <Message>
                <h3 style={{ color: 'red' }}>Error</h3>
                {this.displayErrors(this.state.errors)}
              </Message>
            )}
          </Form>
          <Message>
            Already a user? <Link to='/login'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
