import messageConstants from '../constants/message-types';
import initialState from './initialState';

export default function messageUsersReducer(
  state = initialState.messageUsers,
  action
) {
  switch (action.type) {
    case messageConstants.UPDATE_MESSAGE_USERS:
      return [...action.users];
    case messageConstants.CLEAR_MESSAGE_USERS:
      return [];
    default:
      return state;
  }
}
