import React,{Component} from 'react';
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import {Icon,Layout} from 'antd';
const { Header, Content } = Layout;
import "antd/dist/antd.css"
import "./active.scss"
import $ from "jquery";
class Active extends Component {
	constructor(props){
		super(props);
		this.data=this.props.location.query;
		this.state={
			activeData:""
		}
		this.getData=(url)=>{
				var self=this;
				console.log(url)
				$.get("http://localhost:8000/sendProxy",
					{proxy:url},
				  	function(data){
				  		console.log(data)
				  		//需要的数据
				    var listData = data.data.data
				    	//设置数据
				    self.setState({
				    	activeData:listData
				    }) 
					
				});
			}
		this.goBack =()=>{
			history.go(-1);
		}
	}
	
	componentDidMount(){
		
		console.log(this.props.match);
		var ajaxUrl = this.data.ajaxUrl

		this.getData(ajaxUrl)

	}
	render(){
		return(
			<div id="active_page">
				<Layout>
			      	<Header>
					     <div className="mod-public-header">
								<div className="header_icon" onClick={this.goBack}>
									<Icon type="left" />
								</div>
								<div className="mod-public-header-title">{this.data.title}</div>
								<a href="/" className="header_icon">
									<Icon type="home" />
								</a>
							</div>
			      	</Header>
			      	<Content>
				      	<div>
							<div className="active_big_img">
								<img src={this.data.bigImg} />
							</div>
						</div>
						<ul className="active_list">
						{(function(self){
							if(self.state.activeData){
								return self.state.activeData.map(function(item,index){
								return <li >
					                <a href="#" className="" data-id={"asdsa"} >
					                    <div className="goods_img">
					                        <img   src={item.imageUrls[0]} />
					                    </div>
					                    <div  >
					                        <div className="goods_into">
					                        		{item.title}
					                        </div>
					                        <div className="goods_price">
						                        <span className="price">
						                            	￥259
						                        </span>
						                        <span className="marketprice">
						                            ￥328
						                        </span>
					                        </div>
					                        <span className="buy_btn" >立即购买&gt;</span>
					                    </div>
					                </a>
	            				</li>
							})
							}
						})(this)	
            			}
						</ul>
					</Content>
			     
			    </Layout>
			</div>
		)
	}
}
	export default Active;