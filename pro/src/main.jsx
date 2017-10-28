import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';
import { Route, Redirect } from 'react-router-dom';
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
import Collection from './components/collection/collection.jsx';
import Cart from './components/cart/cartComponent.jsx';
import Order from './components/order/orderComponent.jsx';
import Home from './components/home/home.jsx';
import HomeHot from "./components/home/hot/hot.jsx";
import HomeMakeup from "./components/home/makeup/makeup.jsx";
import HomeBaby from "./components/home/baby/baby.jsx";
import HomeFoods from "./components/home/foods/foods.jsx";
import HomeHealth from "./components/home/health/health.jsx";
import HomeExcise from "./components/home/excise/excise.jsx";
import Active from "./components/active/active.jsx";
import Sort from "./components/sort/sort.jsx";
import Main from './antd.jsx';

import 'element-theme-default';
import './assets/font/iconfont.css';
import './assets/css/base.css'
import './assets/css/common.css'

// ****Y****
import Yclassify from './components/classify/classify.jsx'
import YlistPage from './components/listPage/listPage.jsx'
// ******

//蚂蚁金服ui
import { Layout } from 'antd'
const { Footer, Content } = Layout;

const history = createHistory();
const hashHistory = createHashHistory();
//let middleware = ; dispatch 函数
const store = createStore(
    rootReducer,
    applyMiddleware(ReduxThunk, ajaxMiddleware, routerMiddleware(history))
)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={hashHistory}>
            <Layout>
                <Content>
                    {/*<Redirect push to="/home/hot"/>  无效，存在页面刷新回到主页的问题*/}
                    {/*不需要用到尾部的*/}
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/order" component={Order} />
                    <Route path="/personal/personaddress" component={PersonAddress} />
                    <Route path="/personal/addaddress" component={AddAddress} />
                    <Route path="/personal/collection" component={Collection} />
                    <Route path="/personal/personorder/:id" component={PersonOrder} />
                    {/*用到尾部的*/}
                    <Route path="/home" component={Home} />
                    {/*<Redirect push={true} from="/" to="/home/hot"/>*/}
                    <Route path="/home/hot" component={HomeHot} />
                    <Route path="/active/:id/:title/:bigImg" component={Active} />
                    <Route path="/home/makeup" component={HomeMakeup} />
                    <Route path="/home/baby" component={HomeBaby} />
                    <Route path="/home/foods" component={HomeFoods} />
                    <Route path="/home/health" component={HomeHealth} />
                    <Route path="/home/excise" component={HomeExcise} />
                    <Route exact path="/personal" component={Personal} />
                    <Route path="/sort" component={Sort} />
                    <Route path="/classify" component={Yclassify} />
                    <Route path="/listpage" component={YlistPage} />
                    <Route path="/buycart" />
                </Content>
                <Footer>
                    <Main />
                </Footer>
            </Layout>
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#app')
)
