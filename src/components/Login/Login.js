import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import {userActions} from '../../actions';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            username: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({submitted: true});

        let body = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        });

        const {dispatch} = this.props;

        dispatch(userActions.login(body));
    };

    handleEmailChange = event => {
        this.setState({username: event.target.value});
    };

    handlePasswordChange = event => {
        this.setState({password: event.target.value});
    };

    render() {
        return (
            <div className="loginFormDiv">
                <h3>Welcome to VLV!</h3>
                <p> Enter your credentials to login and start shit posting </p>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        hintText="Enter your Username" 
                        floatingLabelText="Username" 
                        name="username" 
                        onChange={this.handleEmailChange} 
                    />
                    <br />
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        name="password"
                        onChange={this.handlePasswordChange}
                    />
                    <br />
                    <RaisedButton label="Login" primary={true} type="submit" />
                </form>
                <h4>Don't have an account?</h4>
                <p>
                    Go <Link to="/register">here</Link> to register.
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Login);
