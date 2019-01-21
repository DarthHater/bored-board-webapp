import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import config from './config'
import store, { history } from './store/index';
import { threadActions } from './actions/threadActions';
import './App.scss';

import App from './App';

window.store = store;

render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('app')
);
