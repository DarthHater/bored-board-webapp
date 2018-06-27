import React, {Component} from 'react';
import config from 'react-global-configuration';

class ThreadReply extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let baseUrl = config.get('API_ROOT');
        fetch(`${baseUrl}/post`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ThreadId: this.props.threadId,
                UserId: this.props.userId,
                Body: this.state.value,
            })});

        this.setState({value: ''});

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea value={this.state.value} onChange={this.handleChange} />
                <input type="submit" value="say it!" />
            </form>
        );
    }
}

export default ThreadReply;
