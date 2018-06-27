import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AuthService from '../../services/AuthService';
import * as auth from '../../auth/authentication';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: auth.isLoggedIn()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        let body = JSON.stringify({ 
            username: data.get("username"), 
            password: data.get("password")
        });
        
        AuthService.login(body)
            .then(response => {
                if (response.token) {
                    sessionStorage.setItem("jwt", response.token);
                    this.setState({
                        redirect: true
                    });
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    render() { 
        if (this.state.redirect) {
            return <Redirect to="/" />
        }

        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <TextField
                    hintText="Enter your Username"
                    floatingLabelText="Username"
                    name="username"
                />
                <br/>
                <TextField
                    type = "password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    name="password"
                />
                <br/>
                <RaisedButton 
                    label="Login" 
                    primary={true}
                    type="submit"
                />
            </form>
        </div>
        );
    }
}

export default Login;
