import ThreadService from '../services/ThreadService';
import threadConstants from '../constants/action-types';

function loadThreadsSuccess(threads) {
  return { type: threadConstants.LOAD_THREADS_SUCCESS, threads };
}

function noMoreThreads(noMasThreads) {
  return { type: threadConstants.NO_MORE_THREADS, noMasThreads };
}

function loadThreadSuccess(thread) {
  return { type: threadConstants.LOAD_THREAD_SUCCESS, thread };
}

function loadPostsSuccess(posts) {
  return { type: threadConstants.LOAD_POSTS_SUCCESS, posts };
}

function addPostSuccess(post) {
  return { type: threadConstants.ADD_POST, post };
}

function editPostSuccess(post) {
  return { type: threadConstants.EDIT_POST, post };
}

function deleteThreadSuccess(threadId) {
  return { type: threadConstants.DELETE_THREAD, threadId };
}

function addThreadSuccess(thread) {
  return { type: threadConstants.ADD_THREAD, thread };
}

function recievePostSuccess(post) {
  return { type: threadConstants.RECIEVE_POST, post };
}

function enterThreadListSuccess(noMasThreads) {
  return { type: threadConstants.ENTER_THREAD_LIST, noMasThreads };
}

function exitThreadListSuccess() {
  return { type: threadConstants.EXIT_THREAD_LIST };
}

function enterThreadViewSuccess() {
  return { type: threadConstants.ENTER_THREAD_VIEW };
}

function exitThreadViewSuccess() {
  return { type: threadConstants.EXIT_THREAD_VIEW };
}

function exitPostsViewSuccess() {
  return { type: threadConstants.EXIT_POST_VIEW };
}

function stubPost(response, threadId, userId, post) {
  return {
    Id: response.Id,
    ThreadId: threadId,
    UserId: userId,
    Body: post,
    PostedAt: new Date(Date.now()),
    UserName: response.username,
  };
}

function stubThread(response, thread) {
  return {
    Id: response.id,
    UserId: thread.Thread.UserId,
    Title: thread.Thread.Title,
    PostedAt: new Date(Date.now()),
    UserName: response.username,
  };
}

function loadThreads(since) {
  return dispatch => {
    return ThreadService.getAllThreads(since)
      .then(threads => {
        if (typeof threads.response === 'undefined') {
          dispatch(loadThreadsSuccess(threads));
        } else if (threads.response.status === 404) {
          dispatch(noMoreThreads(true));
        }
      })
      .catch(error => {
        throw error;
      });
  };
}

function loadThread(threadId) {
  return dispatch => {
    return ThreadService.getThread(threadId)
      .then(thread => {
        dispatch(loadThreadSuccess(thread));
      })
      .catch(error => {
        throw error;
      });
  };
}

function loadPosts(threadId) {
  return dispatch => {
    return ThreadService.getPosts(threadId)
      .then(posts => {
        dispatch(loadPostsSuccess(posts));
      })
      .catch(error => {
        throw error;
      });
  };
}

function addPost(threadId, userId, post) {
  return dispatch => {
    return ThreadService.postPost(threadId, userId, post)
      .then(response => {
        dispatch(addPostSuccess(stubPost(response, threadId, userId, post)));
      })
      .catch(error => {
        throw error;
      });
  };
}

function enterThreadList(noMasThreads) {
  return dispatch => {
    return dispatch(enterThreadListSuccess(noMasThreads));
  };
}

function exitThreadView() {
  return dispatch => {
    return dispatch(exitThreadViewSuccess());
  };
}

function exitPostsView() {
  return dispatch => {
    return dispatch(exitPostsViewSuccess());
  };
}

function enterThreadView() {
  return dispatch => {
    return dispatch(enterThreadViewSuccess());
  };
}

function exitThreadList() {
  return dispatch => {
    return dispatch(exitThreadListSuccess());
  };
}

function addThread(thread) {
  return dispatch => {
    return ThreadService.postThread(thread)
      .then(response => {
        dispatch(addThreadSuccess(stubThread(response, thread)));
      })
      .catch(error => {
        throw error;
      });
  };
}

function editPost(text, postId) {
  return dispatch => {
    return ThreadService.editPost(text, postId)
      .then(response => {
        dispatch(editPostSuccess(response));
      })
      .catch(error => {
        throw error;
      });
  };
}

function recievePost(post) {
  return dispatch => {
    dispatch(recievePostSuccess(post));
  };
}

function deleteThread(threadId) {
  return dispatch => {
    return ThreadService.deleteThread(threadId)
      .then(() => {
        dispatch(deleteThreadSuccess(threadId));
      })
      .catch(error => {
        throw error;
      });
  };
}

export default {
  addPost,
  addThread,
  deleteThread,
  editPost,
  loadPosts,
  loadThread,
  loadThreads,
  exitThreadList,
  enterThreadList,
  enterThreadView,
  exitThreadView,
  exitPostsView,
  recievePost,
};
