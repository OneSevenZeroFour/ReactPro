
import React,{Component} from 'react';

import {hotCont} from "react-redux";
import swiperImg from "../../../assets/images/banner1.jpeg";
import $ from "jquery"
//hash路由 、route路由显示区域、link、路径指向 、redirect重定向
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';
class HomeHot extends Component {
	constructor(props){
		super(props);
		//首页内容部分分区列表 （图片+商品列表）
		this.homedata=[
		{
			bigImg:"/src/assets/images/kind1.jpeg",
			ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E5%8C%96%E5%A6%86&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
			color:"#c0714a",
			list_header_nav:"",
			listData:""
		},{
			bigImg:"/src/assets/images/kind2.jpeg",
			ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E4%BF%9D%E5%81%A5&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
			color:"",
			list_header_nav:"",
			listData:""
		},{
			bigImg:"/src/assets/images/kind3.jpeg",
			ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E8%90%A5%E5%85%BB%E4%BF%9D%E5%81%A5&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
			color:"",
			list_header_nav:"",
			listData:""
		},{
			bigImg:"/src/assets/images/kind4.jpeg",
			ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E7%BA%B8%E5%B0%BF%E8%A3%A4&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
			color:"",
			list_header_nav:"",
			listData:""
		},{
			bigImg:"/src/assets/images/kind5.jpeg",
			ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E5%8F%A3%E7%BA%A2&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
			color:"",
			list_header_nav:"",
			listData:""
		},{
			bigImg:"/src/assets/images/kind6.jpeg",
			ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E5%85%BB%E5%8F%91&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
			color:"",
			list_header_nav:"",
			listData:""
		}];
		
		this.getDate=(url,index)=>{
			var self=this;
			$.ajax({
		        type: post,
		        proxy: url,
		        timeout: 10000, // 超时时间 10 秒
		        url: "http://localhost:8000/sendProxy",
		        success: function(data){
		        	console.log(data),
		        	self.setState({
//			        	self.homedata[index].listData:response.data.data
			      	})
		        },
		        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数　
		        }
      		})
		}
	}
	
	componentDidMount(){
		
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

