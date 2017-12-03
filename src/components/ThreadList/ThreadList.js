import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ThreadList extends Component {

    constructor() {
        super();
        this.state = { threads: [] };
    }

    componentDidMount() {
        fetch(`http://localhost:8000/threads`)
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
