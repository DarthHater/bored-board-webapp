import threadConstants from '../constants/action-types';
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

export default function threadsReducer(state = initialState.threads, action) {
  switch (action.type) {
    case threadConstants.LOAD_THREADS_SUCCESS:
      return [...state, ...action.threads].sort(
        (a, b) => new Date(a.LastPostedAt) - new Date(b.LastPostedAt)
      );
    case threadConstants.DELETE_THREAD:
      return state.filter(thread => thread.Id !== action.threadId);
    case threadConstants.ADD_THREAD: {
      const newAddThread = insertItem(state, action.thread);
      return newAddThread;
    }
    case threadConstants.EXIT_THREAD_LIST:
      return [];
    default:
      return state;
  }
}
