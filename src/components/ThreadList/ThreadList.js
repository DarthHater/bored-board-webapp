import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as auth from '../../auth/authentication';
import { threadActions } from '../../actions';
import * as permissions from '../../constants/permissions';
import ThreadAdd from './ThreadAdd/ThreadAdd';
import debounce from '../../helpers/debounce';

class ThreadList extends Component {
  loading = false;

  handleScroll = debounce(() => {
    const { threads, threadsNull, dispatch } = this.props;

    const doc =
      document.scrollingElement || document.documentElement || document.body;

    const scrollPosition = doc.scrollTop;
    const scrollBottom = document.body.clientHeight;
    const height = scrollPosition + window.innerHeight;

    if (
      scrollBottom - height < 300 &&
      !this.loading &&
      threads.length >= 20 &&
      !threadsNull
    ) {
      this.loading = true;
      dispatch(
        threadActions.loadThreads(new Date(threads[0].LastPostedAt).valueOf())
      );
      this.state.loading = false;
    }
  }, 250);

  constructor(props) {
    super(props);

    this.state = {
      userId: auth.getUserId(),
      canDeleteThreads: auth.userHasPermission(permissions.deleteThread),
      loading: false,
      scrollPosition: 0,
    };
  }

  componentDidMount() {
    const { dispatch, threads } = this.props;
    dispatch(threadActions.enterThreadList(false));
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    if (threads.length === 0) {
      dispatch(threadActions.loadThreads(new Date().valueOf()));
    }
  }

  componentDidUpdate() {
    const { scrollPosition } = this.state;
    window.scrollTo(0, scrollPosition);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    window.removeEventListener('scroll', this.handleScroll);
    dispatch(threadActions.exitThreadList());
  }

  deleteThread = id => {
    const { dispatch } = this.props;
    dispatch(threadActions.deleteThread(id));
  };

  render() {
    const { thread, threads } = this.props;
    const { canDeleteThreads, userId } = this.state;
    if (!thread) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <div
        style={{
          paddingLeft: '20px',
          paddingRight: '20px',
          marginTop: 64,
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowY: 'auto',
        }}
      >
        <ThreadAdd userId={userId} />
        {threads.map(t => (
          <Card
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
            }}
            key={t.Id}
          >
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
                        pathname: `/thread/${t.Id}`,
                      }}
                    >
                      {t.Title}
                    </Link>
                  </Typography>
                  <Typography component="p">
                    by:
                    <Link to={`/user/${t.UserId}`}>{t.UserName}</Link> on
                    <Timestamp time={t.PostedAt} format="full" />
                    , last post on
                    <Timestamp time={t.LastPostedAt} format="full" />
                  </Typography>
                </Grid>
                {canDeleteThreads && (
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => this.deleteThread(t.Id)}
                    >
                      Delete Thread
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

ThreadList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  thread: PropTypes.object,
  threads: PropTypes.arrayOf(PropTypes.object),
  threadsNull: PropTypes.bool.isRequired,
};

ThreadList.defaultProps = {
  thread: null,
  threads: [],
};

function mapStateToProps(state) {
  return {
    threads: state.threads,
    thread: state.thread,
    threadsNull: state.threadsNull,
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(ThreadList);
