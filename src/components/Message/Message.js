import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import People from '@material-ui/icons/People';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MessageReply from './MessageReply/MessageReply';
import MessagePost from './MessagePost/MessagePost';
import { messageActions } from '../../actions/index';
import * as auth from '../../auth/authentication';

const liStyle = {
  display: 'inline-block',
  marginLeft: 2,
  marginRight: 2,
};

const ulStyle = {
  display: 'block',
};

const iconStyle = {
  float: 'left',
};

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  h2: {
    textAlign: 'center',
    padding: '20px 0',
    margin: 0,
    borderBottom: '1px solid #ddd',
    backgroundColor: '#eee',
  },
};

class Message extends Component {
  constructor(props) {
    super(props);

    const { match, dispatch } = props;
    this.state = {
      messageId: match.params.id,
      userId: auth.getUserId(),
    };

    dispatch(messageActions.loadMessage(match.params.id));
  }

  render() {
    const { message } = this.props;
    const { messageId, userId } = this.state;

    let output;
    if (message.Members) {
      output = message.Members.map(member => (
        <li key={member.UserId} style={liStyle}>
          <a href={`/user/${member.UserId}`}>{member.UserName}</a>
        </li>
      ));
    }

    return (
      <div style={style.container}>
        <header>
          <h3 className="backToIt">
            <Link to="/messages">Back to it</Link>
          </h3>
          <h2 style={style.h2}>{message.Title}</h2>
          <div className="members">
            <People style={iconStyle} />
            <ul style={ulStyle}>{output}</ul>
          </div>
        </header>
        <MessagePost messageId={messageId} />
        <MessageReply userId={userId} messageId={message.Id} value="" />
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    message: state.message,
    messagePosts: state.messagePosts,
  };
}

export default connect(mapStateToProps)(Message);
