

import React,{Component} from 'react';

import {homeCont} from "react-redux";
import swiperImg from "../../assets/images/banner1.jpeg";
//hash路由 、route路由显示区域、link、路径指向 、redirect重定向
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';
//引进首页样式
import "./home.scss";
import {Layout,Icon} from 'antd';
const {Header, Content } = Layout;
//home类使其拥有react所有方法与属性
import "antd/dist/antd.css"

class Home extends Component {
	constructor(props){
		super(props);
		this.homeHeader=[
			{
				title:"热门",
				urlTo:"/home/hot"
			},{
				title:"美妆",
				urlTo:"/home/makeup"
			},{
				title:"母婴",
				urlTo:"/home/baby"
			},{
				title:"食品",
				urlTo:"/home/foods"
			},{
				title:"个护",
				urlTo:"/home/health"
			},{
				title:"保健",
				urlTo:"/home/excise"
			}   
		]
		
	}
	render(){
		return (
			<div id="home_page">
				<div className="home_warp">
				<header className="global-header">
				    <div className="header-province jProvince">广东</div>
					    <div className="header-logo">
					      	<Link to="/">
					        	<img src="//s1.bbgstatic.com/gshop/images/index/global-logo.png" alt=""/>
					       </Link>
				    	</div>
				    <div className="header-search jHeaderSearch"><Icon type="search" /></div>
				</header>
				<ul className="home_nav">
				{
					this.homeHeader.map(function(item,index){
					
						return<Link to={item.urlTo}  key={index}><span>{item.title}</span></Link >
						
					})
				}
				</ul>
				</div>
			</div>
			
		)
	}
}
export default Home;

