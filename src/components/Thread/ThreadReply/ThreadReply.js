import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { threadActions } from '../../../actions/index';

const styles = {
    floatingLabelStyle: {
      color: orange500,
    },
    floatingLabelFocusStyle: {
      color: blue500,
    },
  };

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
        this.props.dispatch(threadActions.addPost(this.props.threadId, this.props.userId, this.state.value));

        this.setState({value: ''});

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField 
                    floatingLabelText="Type something"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    value={this.state.value} 
                    onChange={this.handleChange} 
                    multiLine={true} 
                    rows={5} 
                />
                <RaisedButton 
                    label="say it!" 
                    primary={true} 
                    type="submit" 
                />
            </form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        post: state.post
    };
}

export default connect(mapStateToProps)(ThreadReply);
