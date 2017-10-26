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


class HomeBaby extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeData:"",
            ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E6%AF%8D%E5%A9%B4&apikey=QXsvzRZEdtm3JmfD16LWkBk7nB688hrMPhTsJafIzW5b53pJueSAK4iGP4ThzFmi"
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
                    <div><a href="#/sort?奶粉"><i className="iconfont icon-naiping"></i><p>奶粉</p></a></div>
                    <div><a href="#/sort?孕妈用品"><i className="iconfont icon-yunmabibei"></i><p>孕妈用品</p></a></div>
                    <div><a href="#/sort?安全出行"><i className="iconfont icon-yizi"></i><p>安全出行</p></a></div>
                    <div><a href="#/sort?洗护喂养"><i className="iconfont icon-webiconxifashui"></i><p>洗护喂养</p></a></div>
                    <div><a href="#/sort?玩具图书"><i className="iconfont icon-muma"></i><p>玩具图书</p></a></div>
                    <div><a href="#/sort?童装童鞋"><i className="iconfont icon-tongzhuang"></i><p>童装童鞋</p></a></div>
                    <div><a href="#/sort?纸尿裤"><i className="iconfont icon-zhiniaoku"></i><p>纸尿裤</p></a></div>
                    <div><a href="#/sort?营养辅食"><i className="iconfont icon-koudai"></i><p>营养辅食</p></a></div>
                </div>
                <div className="banner">
                    <img src="/src/assets/images/kind4.jpeg" />
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
                                <a href={item.url} className="" data-id={"asdsa"}>
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
export default HomeBaby;