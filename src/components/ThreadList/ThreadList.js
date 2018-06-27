import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from 'react-global-configuration';

class ThreadList extends Component {

    constructor() {
        super();
        this.state = { threads: [] };
    }

    componentDidMount() {
        let baseUrl = config.get('API_ROOT');
        fetch(`${baseUrl}/threads`)
            .then(result => result.json())
            .then(threads => this.setState({threads}));
    }

    render() {
        return (
            <div className='container'>
                <ul>
                    {this.state.threads.map(thread => {
                        return (
                            <li key={thread.Id}>
                                <h3>
                                    <Link to={`/thread/${thread.Id}`}>
                                        {thread.Title}
                                    </Link>
                                </h3>

                                <p>
                                    <Link to={`/user/${thread.UserId}`}>
                                        
                                    </Link>
                                    on {thread.PostedAt}
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default ThreadList;
