

import React,{Component} from 'react';

import {homeCont} from "react-redux";
import swiperImg from "../../assets/images/banner1.jpeg";
//hash路由 、route路由显示区域、link、路径指向 、redirect重定向
//import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';
//引进首页样式
import "./home.css";
//引入子组件
//import Siwper from "../siwper/siwper.jsx"
//home类使其拥有react所有方法与属性

class Home extends Component {
	constructor(props){
		super(props);
		this.homeHeader=[
		]
		//首页内容部分分区列表 （图片+商品列表）
		this.homedata=[
		{
			bigImg:"",
			ajaxUrl:""
		},{
			bigImg:"",
			ajaxUrl:""
		},{
			bigImg:"",
			ajaxUrl:""
		},{
			bigImg:"",
			ajaxUrl:""
		},{
			bigImg:"",
			ajaxUrl:""
		},{
			bigImg:"",
			ajaxUrl:""
		}]
	}

	render(){
		return (
			<div>
				<div className="swiper">
					<img src={swiperImg} />
				</div>
			</div>
		)
	}
}
export default Home;

