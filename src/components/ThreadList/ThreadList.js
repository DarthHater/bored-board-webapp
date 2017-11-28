import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ThreadList extends Component {
    render() {
        return (
            <div className='container'>
                <ul>
                    {this.props.threads.map(thread => {
                        return (
                            <li key={thread.id}>
                                <h3>
                                    <Link to={`/thread/${thread.id}`}>
                                        {thread.title}
                                    </Link>
                                </h3>

                                <p>
                                    <Link to={`/user/${thread.user.id}`}>
                                        {thread.user.name}
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
