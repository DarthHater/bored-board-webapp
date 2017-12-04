import React, {Component} from 'react';

class ThreadPost extends Component {

    constructor(props) {
        super(props);
        this.state = { thread: {} };
    }

    componentDidMount() {
        fetch(`http://localhost:8000/thread/${this.props.match.params.id}`)
            .then(result => result.json())
            .then(thread => this.setState({thread}));
    }

    render() {
        return (
            <div className='container'>
                <header>
                    <h1>
                        {this.state.thread.Title }
                    </h1>
                </header>

                <div>
                </div>
            </div>
        );
    }
}

export default ThreadPost;
