import React, {Component} from 'react';

class ThreadPost extends Component {
    render() {
        return (
            <div className='container'>
                <header>
                    <h1>
                        {this.props.title}
                    </h1>
                </header>

                <div>
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default ThreadPost;
