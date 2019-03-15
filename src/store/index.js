import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from '../reducers/index';

export const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;
