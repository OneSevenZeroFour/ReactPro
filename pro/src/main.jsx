
import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';

import { Route } from 'react-router-dom';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { ajaxMiddleware } from './store/ajaxMiddleware';
import rootReducer from './store/rootReducer';

import Login from './components/login/LoginComponent.jsx';
import Register from './components/register/RegisterComponent.jsx';
import Demo from './components/demo/demo.jsx';
import Personal from './components/personal/PersonalComponent.jsx';
import PersonOrder from './components/personorder/personOrderComponent.jsx';
import PersonAddress from './components/personaddress/personAddress.jsx';
import AddAddress from './components/addaddress/addAddress.jsx';
import Home from './components/home/home.jsx';

import HomeHot from "./components/home/hot/hot.jsx";
import HomeMakeup from "./components/home/makeup/makeup.jsx";
import HomeBaby from "./components/home/baby/baby.jsx";
import HomeFoods from "./components/home/foods/foods.jsx";
import HomeHealth from "./components/home/health/health.jsx";
import HomeExcise from "./components/home/excise/excise.jsx";


import XyHome from './components/homeRouter/home.jsx';

import $ from 'jquery';

import './util/base.css'


//element-ui style
import 'element-theme-default';
import './assets/font/iconfont.css';
import './assets/css/common.css';

//rem 自适应
//import './assets/js/flexible.js';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
const hashHistory = createHashHistory();

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
        <ConnectedRouter history={hashHistory}>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route exact path="/personal" component={Personal} />
                <Route path="/personal/personorder/:id" component={PersonOrder} />
                <Route path="/personal/personaddress" component={PersonAddress} />
                <Route path="/personal/addaddress" component={AddAddress} />
                <Route path="/home" component={Home} />
                <Route path="/home/hot" component={HomeHot} />
                <Route path="/home/makeup" component={HomeMakeup} />
                <Route path="/home/baby" component={HomeBaby} />
                <Route path="/home/foods" component={HomeFoods} />
                <Route path="/home/health" component={HomeHealth} />
                <Route path="/home/excise" component={HomeExcise} />

                <Route path="/xyhome" component={XyHome} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#app')
)



