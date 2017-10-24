
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
		this.state={
			kind0:"",
			kind1:"",
			kind2:"",
			kind3:"",
			kind4:"",
			kind5:"",
			
			homedata:[{
						bigImg:"/src/assets/images/kind1.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E5%8C%96%E5%A6%86&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"#c0714a",
						list_header_nav:"",
						
					},{
						bigImg:"/src/assets/images/kind2.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E4%BF%9D%E5%81%A5&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"",
						list_header_nav:"",
						
					},{
						bigImg:"/src/assets/images/kind3.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E8%90%A5%E5%85%BB%E4%BF%9D%E5%81%A5&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"",
						list_header_nav:"",
						
					},{
						bigImg:"/src/assets/images/kind4.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E7%BA%B8%E5%B0%BF%E8%A3%A4&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"",
						list_header_nav:"",
						
					},{
						bigImg:"/src/assets/images/kind5.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E5%8F%A3%E7%BA%A2&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"",
						list_header_nav:"",
						
					},{
						bigImg:"/src/assets/images/kind6.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E5%85%BB%E5%8F%91&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"",
						list_header_nav:"",
						
					}]
			}
			this.getDate=(url,i)=>{
				var self=this;
				$.get("http://localhost:8000/sendProxy",
					{proxy:url},
				  	function(data){
				  		//需要的数据
				    var listData = data.data.data.splice(0,6)
				    	//设置数据
				    var kind="kind"+i 
				   	console.log(kind)
				   	var abc =
				    self.setState({
				    	[kind]:listData 
				    }) 
					console.log(self.state[kind])
				});
			}
			this.getUrl=(sotes)=>{
				var sote =encodeURI(sotes);
				var baseUrl = "http://120.76.205.241:8000/product/yunhou?pageToken=1&kw="+sotes+"&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5"
				return baseUrl
			}
			this.getList=(index)=>{										
				var kind = "kind"+index;
				console.log(this.state[kind])
				return this.state.kind0.map(function(i,t){
					console.log(i,t)
					return <div className="goods_box">
							<img src/>
							<div className="goods_into">
								<p>【香港直邮】</p>
								<p></p>
								<p><span>¥</span><del></del></p>
							</div>
						</div>
				})
			
			}
			
	}
	
	componentWillMount(){
		var page = 1,select="kw",sotes="化妆";
		console.log(this.state.homedata.length)
		for(let i=0;i<this.state.homedata.length;i++){
			var self = this;
			console.log(this.state.homedata[i].ajaxUrl ,i)
			setTimeout(function(){
				self.getDate( self.state.homedata[i].ajaxUrl ,i)
			},1000*i)
		}
		
	}
	
	render(){
		return (
			<div id="home_hot">
				<div className="swiper">
					<img className="big_img" src={swiperImg} />
				</div  >
				<div className="list_warp">
					{
						(function(self){	
						return	self.state.homedata.map(function(item,index){
							console.log(index)
								return <div className="lists" key={index}>
											<div className="list_big_img">
												<img className="big_img" src={item.bigImg} alt=""/>
											</div>
											<div  className="list_cont">
											{
												(function(){
													if(self.state["kind"+index]){
														
														return self.getList(index)
													}
												})()
												
											}
											</div>
										</div>
							})
						
					})(this)
				}
				</div>
				
			</div>
		)
	}
}
export default HomeHot;

