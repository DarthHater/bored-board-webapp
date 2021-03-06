import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { userActions } from '../../actions';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      emailaddress: '',
      password: '',
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    const { username, emailaddress, password } = this.state;
    const { dispatch } = this.props;

    const body = JSON.stringify({
      username,
      emailaddress,
      password,
    });

    dispatch(userActions.register(body));
  };

  handleUserNameChange = event => {
    this.setState({ username: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ emailaddress: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { username, emailaddress, password } = this.state;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
          <h2>Welcome to VLV!</h2>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
          <h3>Enter your details to register as a new user</h3>
          <ValidatorForm
            // eslint-disable-next-line react/no-string-refs
            ref="form"
            onSubmit={this.handleSubmit}
          >
            <TextValidator
              label="Username"
              onChange={this.handleUserNameChange}
              name="username"
              margin="normal"
              value={username}
              className={classes.textField}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <br />
            <TextValidator
              label="Email Address"
              onChange={this.handleEmailChange}
              name="emailaddress"
              margin="normal"
              value={emailaddress}
              className={classes.textField}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
            <br />
            <TextValidator
              label="Password"
              onChange={this.handlePasswordChange}
              name="password"
              margin="normal"
              value={password}
              className={classes.textField}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <br />
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </ValidatorForm>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
          <h3>Have an account already?</h3>
          <p>
            Go
            <Link to="/login">here</Link> to login.
          </p>
        </Grid>
      </Grid>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Register));
