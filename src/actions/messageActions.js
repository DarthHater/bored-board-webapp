import MessageService from '../services/MessageService';
import messageConstants from '../constants/message-types';

function stubMessagePost(response, messageId, userId, post) {
  return {
    Id: response.Id,
    MessageId: messageId,
    UserId: userId,
    Body: post,
    PostedAt: new Date(Date.now()),
    UserName: response.Username,
  };
}

function stubMessage(response, message) {
  return {
    Id: response.Message.Id,
    UserId: message.Message.UserId,
    Title: message.Message.Title,
    PostedAt: new Date(Date.now()),
    UserName: response.Message.UserName,
  };
}

function loadMessagesSuccess(messages) {
  return { type: messageConstants.LOAD_MESSAGES_SUCCESS, messages };
}

function loadMessageSuccess(message) {
  return { type: messageConstants.LOAD_MESSAGE_SUCCESS, message };
}

function loadMessagePostsSuccess(messagePosts) {
  return { type: messageConstants.LOAD_MESSAGE_POSTS_SUCCESS, messagePosts };
}

function addMessagePostSuccess(messagePost) {
  return { type: messageConstants.ADD_MESSAGE_POST, messagePost };
}

function addMessageSuccess(message) {
  return { type: messageConstants.ADD_MESSAGE, message };
}

function clearMessageUsers() {
  return { type: messageConstants.CLEAR_MESSAGE_USERS };
}

function recieveMessagePostSuccess(messagePost) {
  return { type: messageConstants.RECIEVE_MESSAGE_POST, messagePost };
}

function loadMessages(userId) {
  return dispatch => {
    return MessageService.getAllMessages(userId)
      .then(messages => {
        dispatch(loadMessagesSuccess(messages));
      })
      .catch(error => {
        throw error;
      });
  };
}

function loadMessage(messageId) {
  return dispatch => {
    return MessageService.getMessage(messageId)
      .then(message => {
        dispatch(loadMessageSuccess(message));
      })
      .catch(error => {
        throw error;
      });
  };
}

function loadMessagePosts(messageId) {
  return dispatch => {
    return MessageService.getMessagePosts(messageId)
      .then(messagePosts => {
        dispatch(loadMessagePostsSuccess(messagePosts));
      })
      .catch(error => {
        throw error;
      });
  };
}

function addMessagePost(messageId, userId, post) {
  return dispatch => {
    return MessageService.postMessagePost(messageId, userId, post)
      .then(response => {
        dispatch(
          addMessagePostSuccess(
            stubMessagePost(response, messageId, userId, post)
          )
        );
      })
      .catch(error => {
        throw error;
      });
  };
}

function addMessage(message) {
  return dispatch => {
    return MessageService.postMessage(message)
      .then(response => {
        dispatch(addMessageSuccess(stubMessage(response, message)));
        dispatch(clearMessageUsers());
      })
      .catch(error => {
        throw error;
      });
  };
}

function updateMessageUsers(users) {
  return dispatch =>
    dispatch({ type: messageConstants.UPDATE_MESSAGE_USERS, users });
}

function recieveMessagePost(post) {
  return dispatch => {
    dispatch(recieveMessagePostSuccess(post));
  };
}

export default {
  addMessagePost,
  addMessage,
  loadMessagePosts,
  loadMessage,
  loadMessages,
  recieveMessagePost,
  updateMessageUsers,
  clearMessageUsers,
};
