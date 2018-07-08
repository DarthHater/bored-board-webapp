import { threadConstants } from '../constants/action-types';
import initialState from './initialState';

export default function threadsReducer(state = initialState.threads, action) {
    switch(action.type) {
        case threadConstants.LOAD_THREADS_SUCCESS:
            return action.threads
        default:
            return state;
    }
}
