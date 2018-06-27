import React, {Component} from 'react';
import { HashRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import ThreadList from './components/ThreadList/ThreadList';
import ThreadPost from './components/ThreadPost/ThreadPost';
import UserProfile from './components/UserProfile/UserProfile';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Login from './components/Login/Login';
import * as auth from './auth/authentication';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [
                {
                    id: 457,
                    name: 'CoolGuy420',
                    bio: 'Im so dope i am the best'
                }
            ]
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <div>
                        <header>
                            <NavigationBar />
                        </header>

                        <main>
                            <Route 
                                exact={true} 
                                path="/"
                                render={() => (
                                    auth.isLoggedIn() ? (
                                        <ThreadList />
                                    ) : (
                                        <Redirect to="/login" />
                                    )
                                )}
                            />

                            <Route
                                path="/login"
                                component={Login}
                            />

                            <Route
                                path="/thread/:id"
                                component={ThreadPost}
                            />

                            <Route
                                path="/user/:id"
                                render={({match}) => (
                                    <UserProfile
                                        {...this.state.users.find(user => user.id === parseInt(match.params.id))}
                                    />
                                )}
                            />
                        </main>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
