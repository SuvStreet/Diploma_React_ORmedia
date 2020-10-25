import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers/reduser';
import App from './App';

import './index.css';

const saveState = (state) => {
    const serialisedState = JSON.stringify(state);
    window.localStorage.setItem('app_state', serialisedState);
}

const loadState = () => {
    const serialisedState = window.localStorage.getItem('app_state');
    if (!serialisedState) return undefined;
    return JSON.parse(serialisedState);
}

const oldState = loadState();

const store = createStore(reducer, oldState);

store.subscribe(() => {
    saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'))
