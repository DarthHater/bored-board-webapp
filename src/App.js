import React, {Component} from 'react';
import {HashRouter as Router, Link, Route} from 'react-router-dom';

import './App.scss';

import ThreadList from './components/ThreadList/ThreadList';
import ThreadPost from './components/ThreadPost/ThreadPost';
import UserProfile from './components/UserProfile/UserProfile';

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
            <Router>
                <div>
                    <header>
                        <nav>
                            <ul>
                                <li>
                                    <strong>VLV:</strong>
                                </li>

                                <li>
                                    <Link to="/">Threads</Link>
                                </li>
                            </ul>
                        </nav>
                    </header>

                    <main>
                        <Route exact={true} path="/" render={() => <ThreadList threads={this.state.threads} />} />

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
        );
    }
}

export default App;
