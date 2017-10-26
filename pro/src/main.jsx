
import React ,{Component}from 'react';
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









import $ from 'jquery';

//element-ui style
import 'element-theme-default';
import './assets/font/iconfont.css';

import './assets/css/base.css'
import './assets/css/common.css'
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
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class Main extends Component{
	constructor(props){
		super(props);
		this.data=[{
				title:"热门",
				urlTo:"/home/hot",
				icon:"home",
				now:"/home"
			},{
				title:"分类",
				urlTo:"/home",
				icon:"appstore",
				now:"/home"
			},{
				title:"购物车",
				urlTo:"/buycart",
				icon:"buycart",
				now:"/buycart"
			},{
				title:"我的",
				urlTo:"/personal",
				icon:"user",
				now:"/personal"
			}]
		this.state={
			currentIndex :0
		}
		this.changeNum=(index)=>{
			console.log(index)
			this.setState({currentIndex:index})
			console.log(this.state.currentIndex)
			
		}
	}
	componentWillMount(){
//		window.location.href="/#/home/hot"
//		hashHistory.push('/home/hot')
		var num = 0;
		
		var currentNum = window.location.href

		this.data.map(function(item,index){
			console.log(currentNum.indexOf(item.urlTo),index)
			if(currentNum.indexOf(item.urlTo)>0){
				this.setState({currentIndex:index})
			}
		}.bind(this))
	}
	render(){
		return(<Row>
				{this.data.map(function(item,index){
					 return <Col span={6} onClick={this.changeNum.bind(this,index)} key={index}><Link to={item.urlTo} className={this.state.currentIndex==index?'active':""} ><Icon type={item.icon}  />{item.title}</Link></Col>
				}.bind(this))}
		       
		    </Row>)
	}
	
}

ReactDOM.render(
	 <Router>
	<Layout>
		<Content>
		    <Provider store={store}>
		        { /* ConnectedRouter will use the store from Provider automatically */}
		        <ConnectedRouter history={hashHistory}>
		            <div>
		            	
				      	<Route path="/home" component={Home} /> 
		                <Route path="/home/hot" component={HomeHot} />
		                <Route path="/active" component={Active} />
		                <Route path="/home/makeup" component={HomeMakeup} />
		                <Route path="/home/baby" component={HomeBaby} />
		                <Route path="/home/foods" component={HomeFoods} />
		                <Route path="/home/health" component={HomeHealth} />
		                <Route path="/home/excise" component={HomeExcise} />
		                
		                <Route path="/login" component={Login} />
		                <Route path="/register" component={Register} />
		                <Route path="/personal" component={Personal} />
		                <Route path="/personal/personorder/:id" component={PersonOrder} />
		                <Route path="/personal/personaddress" component={PersonAddress} />
		                <Route path="/personal/addaddress" component={AddAddress} />

		                <Route path="/sort" component={Sort} />
		            
		                <Route path="/buycart"  />
		            </div>
		        </ConnectedRouter>
		    </Provider>
		</Content>
	    <Footer>
	      	<Main/>
	    </Footer>
	</Layout>
	 </Router>
    ,
    document.querySelector('#app')
)



