import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import { connect } from 'react-redux';
import config from 'react-global-configuration';
import parser from 'bbcode-to-react';
import { Grid, Button } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

import { threadActions } from '../../../actions/index';
import * as auth from '../../../auth/authentication';
import * as permissions from '../../../constants/permissions';

const styles = {
    button: {
        background: grey[400],
        marginTop: "15px",
        marginBottom: "15px",
        marginRight: "15px"
    }
};

class ThreadPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            baseUrl: config.get('WS_ROOT'),
            userCanEditPost: auth.userHasPermission(permissions.canEditPost)
        }

        this.props.dispatch(threadActions.loadPosts(this.props.threadId));
    }

    handleSocket(data) {
        let result = JSON.parse(data);
        if (result.ThreadId == this.props.threadId) {
            this.props.dispatch(threadActions.recievePost(data));
        }
    }

    handleQuote = id => {
        const body = document.getElementById(`post_body_input_${id}`).value;
        const header = document.getElementById(`post_info_${id}`).innerText;
        const post = `[quote]${header}${body}[/quote]`;
        this.props.quotePostCallback(post);
    }

    editPost = id => {
        alert(id);
    }

    render() {
        return (
        <div className="posts">
                {this.props.posts.map(post => {
                    return (
                        <Grid container spacing={0} key={post.Id}>
                            <Grid item xs={12} sm={8} className="post header info" id={`post_info_${post.Id}`}>
                                <h4>
                                    Posted by <Link to={`/user/${post.UserId}`}>
                                        {post.UserName}
                                    </Link>
                                    &nbsp;on <Timestamp time={post.PostedAt} format="full" />
                                </h4>
                            </Grid>
                            <Grid item xs={12} sm={4} className="post header controls" >
                                <Button 
                                    style={styles.button}
                                    size="small"
                                    onClick={() => this.handleQuote(post.Id)}
                                >
                                    » Quote
                                </Button>
                                {this.state.userCanEditPost && (
                                    <Button
                                        style={styles.button}
                                        size="small"
                                        onClick={() => this.editPost(post.Id)}
                                    >
                                        » Edit Post
                                    </Button>
                                )}
                            </Grid> 
                            <Grid item xs={12} className="post body">
                                {parser.toReact(post.Body)}
                            </Grid>
                            <input type="hidden" value={post.Body} id={`post_body_input_${post.Id}`} />
                        </Grid>
                        
                    )
                })}

                <WebSocket url={this.state.baseUrl}
                    onMessage={this.handleSocket.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps)(ThreadPost);
