import threadConstants from '../constants/action-types';
import initialState from './initialState';

function editItem(array, action) {
  const newArray = array.slice();
  const foundIndex = newArray.findIndex(x => x.Id === action.Id);
  newArray[foundIndex].Body = action.Body;

  return newArray;
}

function insertItem(array, action) {
  if (typeof action.Id === 'undefined') {
    // Short circuit function in case we don't have the right info to add a post
    return array;
  }

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

export default function postsReducer(state = initialState.posts, action) {
  switch (action.type) {
    case threadConstants.LOAD_POSTS_SUCCESS:
      return action.posts;
    case threadConstants.ADD_POST:
      return insertItem(state, action.post);
    case threadConstants.EDIT_POST:
      return editItem(state, action.post);
    case threadConstants.RECIEVE_POST:
      return insertItem(state, JSON.parse(action.post));
    case threadConstants.EXIT_POST_VIEW:
      return [];
    default:
      return state;
  }
}
