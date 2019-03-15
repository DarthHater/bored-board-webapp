import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import { messageActions } from '../../../actions/index';

class MessageReply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { dispatch, messageId, userId } = this.props;
    const { value } = this.state;
    dispatch(messageActions.addMessagePost(messageId, userId, value));

    this.setState({ value: '' });

    event.preventDefault();
  }

  render() {
    const { value } = this.state;
    return (
      <ValidatorForm
        // eslint-disable-next-line react/no-string-refs
        ref="form"
        onSubmit={this.handleSubmit}
      >
        <TextValidator
          label="Type something"
          onChange={this.handleChange}
          name="multiline-static"
          multiline
          rows="5"
          defaultValue=""
          margin="normal"
          value={value}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <Button variant="contained" color="primary" type="submit">
          say it!
        </Button>
      </ValidatorForm>
    );
  }
}

MessageReply.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messageId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    messagePost: state.messagePost,
  };
}

export default connect(mapStateToProps)(MessageReply);
