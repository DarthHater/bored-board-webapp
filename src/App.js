import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import ThreadList from './components/ThreadList/ThreadList';
import MessageList from './components/MessageList/MessageList';
import Thread from './components/Thread/Thread';
import Message from './components/Message/Message';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';
import { isLoggedIn } from './auth/authentication';

const theme = createMuiTheme();

const App = ({ threads, history, messages }) => (
  <MuiThemeProvider theme={theme}>
    <ConnectedRouter history={history}>
      <div>
        <NavigationBar />
        <main style={{ marginTop: '74px' }}>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                isLoggedIn() ? <ThreadList threads={threads} /> : <Login />
              }
            />
            <Route
              path="/messages"
              render={() =>
                isLoggedIn() ? <MessageList messages={messages} /> : <Login />
              }
            />
            <Route
              path="/message/:id"
              render={props =>
                isLoggedIn() ? <Message {...props} /> : <Login />
              }
            />
            <Route
              path="/login"
              render={() => (isLoggedIn() ? <Redirect to="/" /> : <Login />)}
            />
            <Route
              path="/register"
              render={() => (isLoggedIn() ? <Redirect to="/" /> : <Register />)}
            />
            <Route
              path="/thread/:id"
              render={props =>
                isLoggedIn() ? <Thread {...props} /> : <Login />
              }
            />
            <Route
              exact
              path="/user/:userid"
              render={props =>
                isLoggedIn() ? <UserProfile {...props} /> : <Login />
              }
            />
          </Switch>
        </main>
      </div>
    </ConnectedRouter>
  </MuiThemeProvider>
);

App.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  threads: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object.isRequired,
};

App.defaultProps = {
  messages: [],
  threads: [],
};

const mapStateToProps = state => ({
  messages: state.messages,
  threads: state.threads,
  user: state.user,
});

export default connect(mapStateToProps)(App);
