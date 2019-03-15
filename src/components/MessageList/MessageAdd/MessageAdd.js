/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import { messageActions } from '../../../actions';
import MultiSelect from '../../Common/MultiSelect';

class MessageAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.handlePostChange = this.handlePostChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { toUserName, toUserId, dispatch } = this.props;

    ValidatorForm.addValidationRule('multiSelectNotEmpty', () => {
      const { messageUsers } = this.props;
      if (messageUsers.length === 0) {
        return false;
      }
      return true;
    });

    if (toUserId && toUserName) {
      dispatch(
        messageActions.updateMessageUsers([
          { ID: toUserId, Username: toUserName },
        ])
      );
      this.scrollDiv.focus();
    }
  }

  handleMessageChange = event => {
    this.setState({ title: event.target.value });
  };

  handlePostChange = event => {
    this.setState({ body: event.target.value });
  };

  handleSubmit(event) {
    const date = new Date(Date.now());
    const { userId, messageUsers, dispatch } = this.props;
    const { title, body } = this.state;

    const data = {
      Message: {
        UserId: userId,
        Title: title,
        PostedAt: date,
      },
      MessagePost: {
        UserId: userId,
        Body: body,
        PostedAt: date,
      },
      MessageMember: messageUsers.map(user => ({
        UserId: user.ID,
      })),
    };
    data.MessageMember.push({
      UserId: userId,
    });
    dispatch(messageActions.addMessage(data));

    this.setState({ title: '', body: '' });

    event.preventDefault();
  }

  render() {
    const { title, body } = this.state;
    return (
      <div className="container">
        <h3>Submit a new message</h3>
        <div ref={div => (this.scrollDiv = div)}>
          <ValidatorForm
            // eslint-disable-next-line react/no-string-refs
            ref="form"
            onSubmit={this.handleSubmit}
          >
            <MultiSelect />
            <TextValidator
              label="Title"
              onChange={this.handleMessageChange}
              name="title"
              value={title}
              validators={['required']}
              errorMessages={['this field is required']}
              ref={text => (this.text = text)}
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
      </div>
    );
  }
}

MessageAdd.propTypes = {
  userId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  messageUsers: PropTypes.arrayOf(PropTypes.shape).isRequired,
  toUserName: PropTypes.string,
  toUserId: PropTypes.string,
};

MessageAdd.defaultProps = {
  toUserName: '',
  toUserId: '',
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
    message: state.message,
    messagePosts: state.messagePosts,
    messageUsers: state.messageUsers,
  };
}

export default connect(mapStateToProps)(MessageAdd);
