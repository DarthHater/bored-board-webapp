/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import { threadActions } from '../../../actions/index';

class ThreadReply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateValue: props.value,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    const { stateValue } = this.state;
    if (value !== prevProps.value) {
      if (stateValue === '') {
        this.setState({
          stateValue: value,
        });
      } else {
        this.setState({
          stateValue: `${stateValue}\n\n${value}`,
        });
      }
    }
  }

  handleChange(event) {
    this.setState({ stateValue: event.target.value });
  }

  handleSubmit(event) {
    const { dispatch, threadId, userId } = this.props;
    const { stateValue } = this.state;
    dispatch(threadActions.addPost(threadId, userId, stateValue));

    this.setState({ stateValue: '' });

    event.preventDefault();
  }

  render() {
    const { stateValue } = this.state;
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
          value={stateValue}
          validators={['required']}
          errorMessages={['this field is required']}
          style={{ width: '95%' }}
        />
        <br />
        <Button variant="contained" color="primary" type="submit">
          say it!
        </Button>
      </ValidatorForm>
    );
  }
}

ThreadReply.propTypes = {
  value: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  threadId: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

ThreadReply.defaultProps = {
  value: '',
  threadId: '',
};

function mapStateToProps(state) {
  return {
    post: state.post,
  };
}

export default connect(mapStateToProps)(ThreadReply);
