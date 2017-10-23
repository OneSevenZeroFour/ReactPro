
import React,{Component} from 'react';

import {hotCont} from "react-redux";
import swiperImg from "../../../assets/images/banner1.jpeg";
//hash路由 、route路由显示区域、link、路径指向 、redirect重定向
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';
class HomeHot extends Component {
	constructor(props){
		super(props);
		//首页内容部分分区列表 （图片+商品列表）
		this.homedata=[
		{
			bigImg:require("../../../assets/images/kind1.jpeg"),
			ajaxUrl:"",
			color:"#c0714a",
			list_header_nav:""
		},{
			bigImg:require("../../../assets/images/kind2.jpeg"),
			ajaxUrl:"",
			color:"",
			list_header_nav:""
		},{
			bigImg:require("../../../assets/images/kind3.jpeg"),
			ajaxUrl:"",
			color:"",
			list_header_nav:""
		},{
			bigImg:require("../../../assets/images/kind4.jpeg"),
			ajaxUrl:"",
			color:"",
			list_header_nav:""
		},{
			bigImg:require("../../../assets/images/kind5.jpeg"),
			ajaxUrl:"",
			color:"",
			list_header_nav:""
		},{
			bigImg:require("../../../assets/images/kind6.jpeg"),
			ajaxUrl:"",
			color:"",
			list_header_nav:""
		}]
	}

	render(){
		return (
			<div id="home_hot">
				<div className="swiper">
					<img className="big_img" src={swiperImg} />
				</div  >
				<div className="list_warp">
					{
						this.homedata.map(function(item,index){
							return <div className="lists" key={index}>
								<div className="list_big_img">
									<img className="big_img" src={item.bigImg} alt=""/>
								</div>
								<div  className="list_cont">
								</div>
							</div>
						})
					}
				</div>
				
			</div>
		)
	}
}
export default HomeHot;

