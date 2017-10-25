
import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';

import { HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';

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
import Active from "./components/active/active.jsx";

import Sort from "./components/sort/sort.jsx";






import './assets/css/common.css'


import $ from 'jquery';
import './assets/css/base.css'

//element-ui style
import 'element-theme-default';
import './assets/font/iconfont.css';
import './assets/css/common.css';

//蚂蚁金服ui
import { Row, Col ,Layout,Icon} from 'antd'

const { Footer, Content } = Layout;
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
	 <Router>
	<Layout>
		<Content>
		    <Provider store={store}>
		        { /* ConnectedRouter will use the store from Provider automatically */}
		        <ConnectedRouter history={hashHistory}>
		            <div>
		            	<Redirect from="/" to="/home/hot" />  
				      	<Route path="/home" component={Home} />
		                <Route path="/home/hot" component={HomeHot} />
		                <Route path="/active" component={Active} />
		                <Route path="/home/makeup" component={HomeMakeup} />
		                <Route path="/home/baby" component={HomeBaby} />
		                <Route path="/home/foods" component={HomeFoods} />
		                <Route path="/home/health" component={HomeHealth} />
		                <Route path="/home/excise" component={HomeExcise} />
		                <Route exact path="/" component={Home} />
		                <Route path="/login" component={Login} />
		                <Route path="/register" component={Register} />
		                <Route exact path="/personal" component={Personal} />
		                <Route path="/personal/personorder/:id" component={PersonOrder} />
		                <Route path="/personal/personaddress" component={PersonAddress} />
		                <Route path="/personal/addaddress" component={AddAddress} />
		                <Route path="/sort" component={Sort} />
		            	
		            </div>
		        </ConnectedRouter>
		    </Provider>
		</Content>
	    <Footer>
	      	<Row>
		     
		       <Col span={6}><Link to="/home"><Icon type="home"  />首页</Link></Col>
		       <Col span={6}><Link to="/home"><Icon type="appstore-o"/>分类</Link></Col>
		       <Col span={6}><Link to="/home"><Icon type="buycar"  />购物车</Link></Col>
		       <Col span={6}><Link to="/personal"><Icon type="user" />我的</Link></Col>
		    </Row>
	    </Footer>
	</Layout>
	 </Router>
    ,
    document.querySelector('#app')
)



