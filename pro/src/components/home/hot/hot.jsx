
import React,{Component} from 'react';

import {hotCont} from "react-redux";

import $ from "jquery";
//hash路由 、route路由显示区域、link、路径指向 、redirect重定向
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import "./hot.scss"

import { Carousel } from 'antd';

class HomeHot extends Component {
	constructor(props){
		super(props);
		this.swiperImgs = ["/src/assets/images/banner1.jpeg",
							"/src/assets/images/banner2.jpeg",
							"/src/assets/images/banner3.jpeg"]
		//首页内容部分分区列表 （图片+商品列表）
		this.state={
			kind0:"",
			kind1:"",
			kind2:"",
			kind3:"",
			kind4:"",
			kind5:"",
			homedata:[{
						title:"阻你打造今秋最in妆容",
						bigImg:"/src/assets/images/kind1.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E5%8C%96%E5%A6%86&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"#c0714a",
						list_header_nav:["面部护肤","清洁护理","香水彩妆"]
					},{
						title:"澳洲直邮品质源自新西兰",
						bigImg:"/src/assets/images/kind2.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E4%BF%9D%E5%81%A5&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"",
						list_header_nav:["奶粉","宝宝营养","家人健康"]
					},{
						title:"免邮免税   包你囤好货",
						bigImg:"/src/assets/images/kind3.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E8%90%A5%E5%85%BB%E4%BF%9D%E5%81%A5&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"#eeb4ca",
						list_header_nav:["营养保健","全球美食","母婴用品","美妆个护"],
						
					},{
						title:"纸尿裤品牌团",
						bigImg:"/src/assets/images/kind4.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E7%BA%B8%E5%B0%BF%E8%A3%A4&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"lightgrey",
						list_header_nav:["花王","大王","尤妮佳","帮宝适"],
						
					},{
						title:"显白口红大盘点",
						bigImg:"/src/assets/images/kind5.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E5%8F%A3%E7%BA%A2&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"#eeb4ca",
						list_header_nav:"",
						
					},{
						title:"水润头皮  滋养发根",
						bigImg:"/src/assets/images/kind6.jpeg",
						ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E5%85%BB%E5%8F%91&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5",
						color:"#a0857e",
						list_header_nav:["洗发露","护发素","发膜、精油"]
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
					
				});
			}
			this.getUrl=(sotes)=>{
				var sote =encodeURI(sotes);
				var baseUrl = "http://120.76.205.241:8000/product/yunhou?pageToken=1&kw="+sotes+"&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5"
				return baseUrl
			}
			this.getList=(index)=>{										
				var kind = "kind"+index;

				return this.state["kind"+index].map(function(i,t){
				
					return <div  className="goods_box" key={t}>
							<a href={i.url} >
								<img src={i.imageUrls[0]} width="50" height="50"/>
								<div className="goods_into">
									<p>{i.title}</p>
									<p><strong>"¥"{i.price}</strong><del>{i.marketPrice}</del></p>
								</div>
							</a>
						</div>
				})
			
			}
			
			
	}
	componentWillMount(){
		var page = 1,select="kw",sotes="化妆";
		for(let i=0;i<this.state.homedata.length;i++){
			var self = this;
			setTimeout(function(){
				self.getDate( self.state.homedata[i].ajaxUrl ,i)
			},1000*i)
		}
		
	}
	
	render(){
		return (
			<div id="home_hot">
				<div className="swiper">
					<Carousel autoplay>
						{
							this.swiperImgs.map(function(item,index){
								return <div><img className="big_img" src={item} key={index}/></div>
							})
						}
					 </Carousel>
					
				</div  >
				<div className="list_warp">
					{
						(function(self){	
						return	self.state.homedata.map(function(item,index){
							var path = {
								pathname:'/active',
								query:item
							}
							return <div className="lists" key={index}>
										<Link to={path}>
											<div className="list_big_img">
												<img className="big_img" src={item.bigImg} alt=""/>
											</div>
										</Link>
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

