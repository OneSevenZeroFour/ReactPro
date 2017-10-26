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


class HomeExcise extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeData:"",
            ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E4%BF%9D%E5%81%A5&apikey=QXsvzRZEdtm3JmfD16LWkBk7nB688hrMPhTsJafIzW5b53pJueSAK4iGP4ThzFmi"
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
                    <div><a href="#/sort?保健热销"><i className="iconfont icon-fire"></i><p>TOP热销</p></a></div>
                    <div><a href="#/sort?关怀长辈"><i className="iconfont icon-tubiao"></i><p>关怀长辈</p></a></div>
                    <div><a href="#/sort?女性健康"><i className="iconfont icon-nvxing"></i><p>女性健康</p></a></div>
                    <div><a href="#/sort?男性健康"><i className="iconfont icon-iconcle07"></i><p>男性健康</p></a></div>
                    <div><a href="#/sort?孕期营养"><i className="iconfont icon-yunfu"></i><p>孕期营养</p></a></div>
                    <div><a href="#/sort?儿童营养"><i className="iconfont icon-ertong"></i><p>儿童营养</p></a></div>
                    <div><a href="#/sort?基础营养"><i className="iconfont icon-yingyang"></i><p>基础营养</p></a></div>
                    <div><a href="#/sort?营养八卦"><i className="iconfont icon-zhichangbagua"></i><p>营养八卦</p></a></div>
                </div>
                <div className="banner">
                    <img src="/src/assets/images/kind8.jpeg" />
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
                        
                            return <li>
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
export default HomeExcise;