import React,{Component} from 'react';
// import { Button } from 'element-react';
import styled from 'styled-components';
import { Collapse ,Anchor,Icon,Layout} from 'antd';
const { Content } = Layout;
import $ from "jquery";
import '../../../assets/font_home/iconfont.css';
//import '/src/assets/font_home/iconfont.css';

import '../../../assets/css/homeRouter.scss';
//import '/src/assets/css/homeRouter.css';
import "antd/dist/antd.css";


class HomeFoods extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeData:"",
            ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E9%A3%9F%E5%93%81&apikey=QXsvzRZEdtm3JmfD16LWkBk7nB688hrMPhTsJafIzW5b53pJueSAK4iGP4ThzFmi"
        }
        this.getData=(url)=>{
            var self=this;
            console.log(url);
            $.get("http://localhost:8000/sendProxy",
                {proxy:url},
                function(data){
                    console.log(data)
                    //需要的数据
                var listData = data.data.data
                console.log(listData)
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
        
        //console.log(this.props.match);
        var ajaxUrl = this.state.ajaxUrl

        this.getData(ajaxUrl)

    }

    render(){
        return (
            <div>
                <div className="header">
                    <div><a href="#/sort?休闲零食"><i className="iconfont icon-tangguo"></i><p>休闲零食</p></a></div>
                    <div><a href="#/sort?咖啡冲饮"><i className="iconfont icon-kafei"></i><p>咖啡冲饮</p></a></div>
                    <div><a href="#/sort?坚果果干"><i className="iconfont icon-jianguo"></i><p>坚果果干</p></a></div>
                    <div><a href="#/sort?谷物麦片"><i className="iconfont icon-iconcopy"></i><p>谷物麦片</p></a></div>
                    <div><a href="#/sort?进口牛奶"><i className="iconfont icon-niunai"></i><p>进口牛奶</p></a></div>
                    <div><a href="#/sort?速食料理"><i className="iconfont icon-sushi"></i><p>速食料理</p></a></div>
                    <div><a href="#/sort?酒水饮料"><i className="iconfont icon-yinliao"></i><p>酒水饮料</p></a></div>
                    <div><a href="#/sort?饼干糕点"><i className="iconfont icon-dangao"></i><p>饼干糕点</p></a></div>
                </div>
                <Content>
                    <div className="tuijian">
                        <i className="iconfont icon-fire"></i>
                        <span>每日推荐</span>
                    </div>
                    <ul className="active_list">
                    {(function(self){
                        if(self.state.activeData){
                            return self.state.activeData.map(function(item,index){
                        
                            return <li key={index}>
                                <a href="#" className="" data-id={"asdsa"}>
                                    <div className="goods_img">
                                        <img   src={item.imageUrls[0]} />
                                    </div>
                                    <div  >
                                        <div className="goods_into">
                                                {item.title}
                                        </div>
                                        <div className="goods_price">
                                            <span className="price">
                                                    ￥{item.price}
                                            </span>
                                            <span className="marketprice">
                                                ￥{item.marketPrice}
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
            </div>
        )
    }
}
export default HomeFoods;