import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import * as auth from '../../auth/authentication';

class NavigationBar extends Component {

    constructor() {
        super();
        this.logOut = this.logOut.bind(this);
    }

    logOut(event) {
        auth.logOut();
    }

    render() {
        return (
            <AppBar
                title="VLV"
                iconElementRight={auth.isLoggedIn() ? 
                    <FlatButton label={"Logout " + auth.getUsername()} onClick={this.logOut}/>
                    : <FlatButton label="Login" containerElement={<Link to="/login" />}/>
                }
            />
        );
    }
}

export default NavigationBar;
