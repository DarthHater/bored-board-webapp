import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';

import ThreadReply from './ThreadReply/ThreadReply';
import ThreadPost from './ThreadPost/ThreadPost';

import { threadActions } from '../../actions/index';
import * as auth from '../../auth/authentication';

const styles = {
  fab: {
    margin: '10px',
    width: 'auto',
    borderRadius: '30px',
    paddingLeft: '0px',
    paddingRight: '16px',
    height: '48px',
    position: 'fixed',
    top: 'auto',
    right: '20px',
    bottom: '20px',
    left: 'auto',
    zIndex: '100',
  },
  extendedIcon: {
    marginRight: '8px',
    marginLeft: '8px',
  },
};

class Thread extends Component {
  constructor(props) {
    super(props);

    const { match, dispatch } = props;
    this.state = {
      threadId: match.params.id,
      userId: auth.getUserId(),
      postBody: '',
    };

    dispatch(threadActions.loadThread(match.params.id));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(threadActions.exitThreadView());
    dispatch(threadActions.exitPostsView());
  }

  quotePostSendToThreadReply = body => {
    this.setState({ postBody: body });
  };

  render() {
    const { classes, history, thread } = this.props;
    const { threadId, postBody, userId } = this.state;
    return (
      <div
        style={{
          paddingLeft: '20px',
          paddingRight: '20px',
          marginTop: 64,
          overflowY: 'auto',
        }}
      >
        <header>
          <Fab
            color="secondary"
            aria-label="Back to it"
            className={classes.fab}
            onClick={() => history.go(-1)}
          >
            <NavigationIcon className={classes.extendedIcon} />
            Back to it
          </Fab>
          <h1>{thread.Title}</h1>
          <h4>
            Created by&nbsp;
            <Link to={`/user/${thread.UserId}`}>{thread.UserName}</Link>{' '}
            on&nbsp;
            <Timestamp time={thread.PostedAt} format="full" />
          </h4>
        </header>
        <ThreadPost
          threadId={threadId}
          quotePostCallback={this.quotePostSendToThreadReply}
        />
        <ThreadReply userId={userId} threadId={thread.Id} value={postBody} />
      </div>
    );
  }
}

Thread.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  thread: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    thread: state.thread,
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Thread));
