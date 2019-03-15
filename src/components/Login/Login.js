import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Grid } from '@material-ui/core';
import { userActions } from '../../actions';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  container: {
    alignContent: 'center',
  },
  item: {
    textAlign: 'right',
  },
  santaDog: {
    textAlign: 'center',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    const { actions } = this.props;

    const body = JSON.stringify({
      username,
      password,
    });

    actions.login(body);
  };

  handleEmailChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { classes, user } = this.props;
    const { username, password } = this.state;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} className="text-center">
          <h2>Welcome to VLV!</h2>
        </Grid>
        <Grid item xs={12} sm={12} className="text-center">
          <img src="http://i.imgur.com/yTLWX.jpg" alt="santa dog" />
        </Grid>
        <Grid item xs={12} sm={6} className="text-center">
          <h4>Enter your credentials to login and start shit posting</h4>
          {user.error && (
            <FormHelperText error className="text-center">
              {user.error}
            </FormHelperText>
          )}
          <ValidatorForm
            // eslint-disable-next-line react/no-string-refs
            ref="form"
            onSubmit={this.handleSubmit}
          >
            <TextValidator
              label="Username"
              onChange={this.handleEmailChange}
              name="username"
              margin="normal"
              value={username}
              className={classes.textField}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <br />
            <TextValidator
              label="Password"
              onChange={this.handlePasswordChange}
              name="password"
              type="password"
              margin="normal"
              value={password}
              className={classes.textField}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <br />
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </ValidatorForm>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
          <h4>Don&#39;t have an account?</h4>
          <p>
            Go&nbsp;
            <Link to="/register">here</Link> to register.
          </p>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
