import { combineReducers } from 'redux';
import threads from './threadsReducer';
import thread from './threadReducer';
import posts from './postsReducer';
import user from './userReducer';
import message from './messageReducer';
import messages from './messagesReducer';
import messagePosts from './messagePostsReducer';
import messageUsers from './messageUsersReducer';
import threadsNull from './threadNullReducer';

const rootReducer = combineReducers({
  threads,
  threadsNull,
  thread,
  posts,
  message,
  messages,
  messagePosts,
  user,
  messageUsers,
});

export default rootReducer;
