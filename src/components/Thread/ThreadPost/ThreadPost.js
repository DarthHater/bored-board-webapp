import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import { connect } from 'react-redux';
import config from 'react-global-configuration';
import parser from 'bbcode-to-react';
import { Grid, Button, TextField } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { canEditPost } from '../../../helpers/PostHelper';
import { threadActions } from '../../../actions/index';
import * as auth from '../../../auth/authentication';
import * as permissions from '../../../constants/permissions';

const styles = {
  button: {
    background: grey[400],
    marginTop: '15px',
    marginBottom: '15px',
    marginRight: '15px',
  },
};

class ThreadPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseUrl: config.get('WS_ROOT'),
      userCanEditPost: auth.userHasPermission(permissions.canEditPost),
      currentPostEditingId: null,
    };
    const { actions, threadId } = this.props;
    actions.loadPosts(threadId);
  }

  handleQuote = id => {
    const { quotePostCallback } = this.props;
    const body = document.getElementById(`post_body_input_${id}`).value;
    const header = document.getElementById(`post_info_${id}`).innerText;
    const post = `[quote]${header}${body}[/quote]`;
    quotePostCallback(post);
  };

  handleKeyPress = ev => {
    if (ev.key === 'Enter' && ev.shiftKey) {
      return;
    }

    const { currentPostEditingId } = this.state;

    if (ev.key === 'Enter' && currentPostEditingId !== null) {
      this.editPost(null);
    }
  };

  editPost = id => {
    if (id === null) {
      const { currentPostEditingId } = this.state;
      const { actions } = this.props;
      const editedBody = document.getElementById(
        `post_body_edit_input_${currentPostEditingId}`
      ).value;
      actions.editPost(editedBody, currentPostEditingId);
    }

    this.setState({
      currentPostEditingId: id,
    });
  };

  handleSocket = data => {
    const { actions, threadId } = this.props;
    const result = JSON.parse(data);
    if (result.ThreadId === threadId) {
      actions.recievePost(data);
    }
  };

  render() {
    const { posts } = this.props;
    const { userCanEditPost, baseUrl } = this.state;
    return (
      <div className="posts">
        {posts.map(post => {
          const { currentPostEditingId } = this.state;

          const editIsOpen = currentPostEditingId === post.Id;

          return (
            <Grid container spacing={0} key={post.Id}>
              <Grid
                item
                xs={12}
                sm={8}
                className="post header info"
                id={`post_info_${post.Id}`}
              >
                <h4>
                  Posted by&nbsp;
                  <Link to={`/user/${post.UserId}`}>{post.UserName}</Link>
                  &nbsp;on&nbsp;
                  <Timestamp time={post.PostedAt} format="full" />
                </h4>
              </Grid>
              <Grid item xs={12} sm={4} className="post header controls">
                <Button
                  style={styles.button}
                  size="small"
                  onClick={() => this.handleQuote(post.Id)}
                >
                  » Quote
                </Button>
                {(userCanEditPost ||
                  (auth.checkUser(post.UserId) && canEditPost(post))) && (
                  <Button
                    style={styles.button}
                    size="small"
                    onClick={() =>
                      editIsOpen ? this.editPost(null) : this.editPost(post.Id)
                    }
                  >
                    »&nbsp;{editIsOpen ? 'Done' : 'Edit Post'}
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} className="post body">
                {editIsOpen ? (
                  <TextField
                    id={`post_body_edit_input_${post.Id}`}
                    className="w-100"
                    defaultValue={post.Body}
                    margin="normal"
                    variant="outlined"
                    onKeyPress={this.handleKeyPress}
                    multiline
                    rows={4}
                    rowsMax={24}
                  />
                ) : (
                  parser.toReact(post.Body)
                )}
              </Grid>
              <input
                type="hidden"
                value={post.Body}
                id={`post_body_input_${post.Id}`}
              />
            </Grid>
          );
        })}

        <WebSocket url={baseUrl} onMessage={this.handleSocket} />
      </div>
    );
  }
}

ThreadPost.propTypes = {
  actions: PropTypes.object.isRequired,
  quotePostCallback: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(threadActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadPost);
