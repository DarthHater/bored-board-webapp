import { combineReducers } from 'redux';
import threads from './threadsReducer';
import thread from './threadReducer';
import posts from './postsReducer';
import user from './userReducer';

const rootReducer = combineReducers({
    threads,
    thread,
    posts,
    user
})

export default rootReducer;