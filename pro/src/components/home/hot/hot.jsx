
import React,{Component} from 'react';

import {hotCont} from "react-redux";

import $ from "jquery";
import {withRouter } from 'react-router'
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
						bigImg:"/src/assets/images/kind0.jpeg",
						color:"#c0714a",
						keyId:"美妆",
						list_header_nav:["面部护肤","清洁护理","香水彩妆"]
					},{
						title:"澳洲直邮品质源自新西兰",
						bigImg:"/src/assets/images/kind1.jpeg",
						color:"",
						keyId:"澳洲奶粉",
						list_header_nav:["奶粉","宝宝营养","家人健康"]
					},{
						title:"免邮免税   包你囤好货",
						bigImg:"/src/assets/images/kind2.jpeg",
						color:"#eeb4ca",
						keyId:"全球",
						list_header_nav:["营养保健","全球美食","母婴用品","美妆个护"],
					},{
						title:"纸尿裤品牌团",
						bigImg:"/src/assets/images/kind3.jpeg",
						color:"lightgrey",
						keyId:"纸尿裤",
						list_header_nav:["花王","大王","尤妮佳","帮宝适"],
					},{
						title:"显白口红大盘点",
						bigImg:"/src/assets/images/kind4.jpeg",
						color:"#eeb4ca",
						keyId:"口红",
						list_header_nav:"",
					},{
						title:"水润头皮  滋养发根",
						bigImg:"/src/assets/images/kind5.jpeg",
						keyId:"护发",
						list_header_nav:["洗发露","护发素","发膜、精油"]
					},{
						title:"精选家居好物品",
						bigImg:"/src/assets/images/kind6.jpeg",
						color:"#a0857e",
						keyId:"家居",
						list_header_nav:["洗发露","护发素","发膜、精油"]
					},{
						title:"养足睡眠 尽力充沛一整天",
						bigImg:"/src/assets/images/kind7.jpeg",
						color:"#a0857e",
						keyId:"睡眠",
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
				    self.setState({
				    	[kind]:listData 
				    }) 
					
				});
			}
			this.getUrl=(sotes)=>{
				var sote =encodeURI(sotes);
				var baseUrl = "http://120.76.205.241:8000/product/yunhou?pageToken=1&kw="+sote+"&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5"
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
//		var page = 1,select="kw",sotes="化妆";
		console.log()
		for(let i=0;i<this.state.homedata.length;i++){
			var self = this;
			setTimeout(function(){
				console.log(self.state.homedata[i].keyId,i)
				self.getDate( self.getUrl(self.state.homedata[i].keyId) ,i)
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
								return <div key={index}><img className="big_img" src={item} /></div>
							})
						}
					 </Carousel>
					
				</div  >
				<div className="list_warp">
					{
						(function(self){	
						return	self.state.homedata.map(function(item,index){
							{/*var path = {
								pathname:'/active',
								query:item
							}*/}
							return <div className="lists" key={index}>
										<Link to={'/active/'+item.keyId+'/'+item.title+'/'+index}>
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
export default withRouter(HomeHot);

