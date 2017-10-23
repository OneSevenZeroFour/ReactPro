
import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router-dom';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { ajaxMiddleware } from './store/ajaxMiddleware';
import rootReducer from './store/rootReducer';

import Login from './components/login/LoginComponent.jsx';
import Demo from './components/demo/demo.jsx';
import Home from './components/home/home.jsx';

import $ from 'jquery';
import './util/base.css'
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating

//let middleware = ; dispatch 函数
const store = createStore(
    rootReducer,
    applyMiddleware(ReduxThunk, ajaxMiddleware, routerMiddleware(history))
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
    <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={Demo} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
            </div>
           
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#app')
)




