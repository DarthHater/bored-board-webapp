import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import { threadActions } from '../../../actions';

class ThreadAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.handlePostChange = this.handlePostChange.bind(this);
    this.handleThreadChange = this.handleThreadChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleThreadChange(event) {
    this.setState({ title: event.target.value });
  }

  handlePostChange(event) {
    this.setState({ body: event.target.value });
  }

  handleSubmit(event) {
    const date = new Date(Date.now());
    const { userId, dispatch } = this.props;
    const { body, title } = this.state;

    const data = {
      Thread: {
        UserId: userId,
        Title: title,
        PostedAt: date,
      },
      Post: {
        UserId: userId,
        Body: body,
        PostedAt: date,
      },
    };
    dispatch(threadActions.addThread(data));

    this.setState({ title: '', body: '' });

    event.preventDefault();
  }

  render() {
    const { title, body } = this.state;

    return (
      <div className="container">
        <h3>Submit a new thread</h3>
        <ValidatorForm
          // eslint-disable-next-line react/no-string-refs
          ref="form"
          onSubmit={this.handleSubmit}
          // eslint-disable-next-line no-console
          onError={errors => console.log(errors)}
        >
          <TextValidator
            label="Title"
            onChange={this.handleThreadChange}
            name="title"
            value={title}
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <p />
          <TextValidator
            label="Say something"
            onChange={this.handlePostChange}
            name="multiline-static"
            value={body}
            multiline
            rows="5"
            margin="normal"
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <p />
          <Button type="submit">say it!</Button>
        </ValidatorForm>
      </div>
    );
  }
}

ThreadAdd.propTypes = {
  userId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    threads: state.threads,
    thread: state.thread,
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(ThreadAdd);
