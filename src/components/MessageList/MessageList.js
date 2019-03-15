import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import * as auth from '../../auth/authentication';
import { messageActions } from '../../actions';
import MessageAdd from './MessageAdd/MessageAdd';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: auth.getUserId(),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { userId } = this.state;
    dispatch(messageActions.loadMessages(userId));
  }

  render() {
    const { location, messages } = this.props;
    const { userId } = this.state;

    let maybeToUserId;
    let maybeToUserName;

    if (location.state) {
      const {
        state: { toUserId, toUserName },
      } = location;
      maybeToUserId = toUserId;
      maybeToUserName = toUserName;
    }

    let inner;
    if (!messages) {
      inner = <div>No Messages</div>;
    } else {
      inner = messages.map(message => (
        <Card key={message.Id}>
          <CardContent>
            <Grid
              container
              spacing={16}
              alignItems="center"
              direction="row"
              justify="space-between"
            >
              <Grid item>
                <Typography variant="headline" component="h3">
                  <Link
                    to={{
                      pathname: `/message/${message.Id}`,
                    }}
                  >
                    {message.Title}
                  </Link>
                </Typography>
                <Typography component="p">
                  by:
                  <Link to={`/user/${message.UserId}`}>
                    {message.UserName}
                  </Link>{' '}
                  on
                  <Timestamp time={message.PostedAt} format="full" />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ));
    }
    return (
      <div className="container">
        {inner}
        <MessageAdd
          toUserId={maybeToUserId}
          toUserName={maybeToUserName}
          userId={userId}
        />
      </div>
    );
  }
}

MessageList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape),
};

MessageList.defaultProps = {
  messages: [],
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
    message: state.message,
    messagePosts: state.messagePosts,
  };
}

export default connect(mapStateToProps)(withRouter(MessageList));
