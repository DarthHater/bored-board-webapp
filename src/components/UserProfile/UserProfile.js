import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserService from '../../services/UserService';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    const { match } = this.props;

    UserService.getUserInfo(match.params.userid).then(res => {
      this.setState({
        loading: false,
        userInfo: res,
      });
    });
  }

  render() {
    const { loading, userInfo } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    const { bio, match } = this.props;

    return (
      <div className="container">
        <header>
          <h1>{userInfo.username}</h1>
        </header>
        <div>{bio}</div>
        <div>
          Total Threads:
          {userInfo.totalThreads}
        </div>
        <div>
          Total Posts:
          {userInfo.totalPosts}
        </div>
        <div>
          Last Posted:
          {new Date(userInfo.lastPosted).toLocaleString()}
        </div>
        <div>
          <Link
            to={{
              pathname: '/messages',
              state: {
                toUserId: match.params.userid,
                toUserName: userInfo.username,
              },
            }}
          >
            Message&nbsp;
            {userInfo.username}
          </Link>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  bio: PropTypes.string,
  match: PropTypes.object.isRequired,
};

UserProfile.defaultProps = {
  bio: '',
};

export default UserProfile;
