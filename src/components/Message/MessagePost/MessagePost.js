import React, { Component } from 'react';
import WebSocket from 'react-websocket';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from 'react-global-configuration';
import lightBlue from '@material-ui/core/colors/lightBlue';
import grey from '@material-ui/core/colors/grey';
import * as auth from '../../../auth/authentication';
import { messageActions } from '../../../actions/index';

const style = {
  messages: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    flexGrow: 1,
    padding: '20px',
    message: {
      display: 'flex',
      marginBottom: '20px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      fromMe: {
        messageInfo: {
          display: 'none',
        },
        body: {
          backgroundColor: lightBlue[300],
          color: 'white',
          maxWidth: '80%',
          display: 'inline-block',
          padding: '20px',
          border: '1px',
          borderRadius: '5px',
          paddingRight: '50px',
        },
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: '5px',
      },
      messageInfo: {
        fontWeight: 'bold',
        fontSize: '0.9rem',
        color: '#999',
        marginBottom: '5px',
      },
      body: {
        maxWidth: '80%',
        display: 'inline-block',
        padding: '20px',
        backgroundColor: grey[200],
        border: '1px',
        borderRadius: '5px',
        paddingRight: '50px',
      },
    },
  },
};

class MessagePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseUrl: config.get('WS_ROOT'),
      userId: auth.getUserId(),
    };
    const { dispatch, messageId } = this.props;
    dispatch(messageActions.loadMessagePosts(messageId));
  }

  handleSocket = data => {
    const { messageId, dispatch } = this.props;
    const result = JSON.parse(data);
    if (result.MessageId === messageId) {
      dispatch(messageActions.recieveMessagePost(data));
    }
  };

  messageFromMe(id) {
    const { userId } = this.state;
    if (id === userId) {
      return true;
    }
    return false;
  }

  render() {
    const { messagePosts } = this.props;
    const { baseUrl } = this.state;
    return (
      <div style={style.messages}>
        {messagePosts.map(post => {
          const fromMe = this.messageFromMe(post.UserId);
          return (
            <div
              key={`message-post-${post.Id}`}
              style={
                fromMe ? style.messages.message.fromMe : style.messages.message
              }
            >
              <div
                style={
                  fromMe
                    ? style.messages.message.fromMe.messageInfo
                    : style.messages.message.messageInfo
                }
              >
                {/* <Link to={`/user/${post.UserId}`}> */}
                {post.UserName}
                {/* </Link> */}
              </div>
              <div style={style.messages.message.messageInfo}>
                {new Date(post.PostedAt).toLocaleString()}
              </div>
              <div
                style={
                  fromMe
                    ? style.messages.message.fromMe.body
                    : style.messages.message.body
                }
              >
                {post.Body}
              </div>
            </div>
          );
        })}

        <WebSocket url={baseUrl} onMessage={this.handleSocket} />
      </div>
    );
  }
}

MessagePost.propTypes = {
  messagePosts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
  messageId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    messagePosts: state.messagePosts,
  };
}

export default connect(mapStateToProps)(MessagePost);
