import messageConstants from '../constants/message-types';
import initialState from './initialState';

function insertItem(array, action) {
  const newArray = array.slice();
  let index = -1;

  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i].Id === action.Id) {
      index = i;
    }
  }

  if (index > -1) {
    // noop
  } else {
    newArray.push(action);
  }
  return newArray;
}

export default function messagePostsReducer(
  state = initialState.messagePosts,
  action
) {
  switch (action.type) {
    case messageConstants.LOAD_MESSAGE_POSTS_SUCCESS:
      return action.messagePosts;
    case messageConstants.ADD_MESSAGE_POST: {
      const newAddMessagePost = insertItem(state, action.messagePost);
      return newAddMessagePost;
    }
    case messageConstants.RECIEVE_MESSAGE_POST: {
      const obj = JSON.parse(action.messagePost);
      const newRecieveMessagePost = insertItem(state, obj);
      return newRecieveMessagePost;
    }
    default:
      return state;
  }
}
