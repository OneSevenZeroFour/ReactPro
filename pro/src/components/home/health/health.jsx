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


class HomeHealth extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeData:"",
            ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E4%B8%AA%E6%8A%A4&apikey=QXsvzRZEdtm3JmfD16LWkBk7nB688hrMPhTsJafIzW5b53pJueSAK4iGP4ThzFmi"
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
                    <div><a href="#"><i className="iconfont icon-fire"></i><p>TOP热销</p></a></div>
                    <div><a href="#"><i className="iconfont icon-yagao"></i><p>口腔护理</p></a></div>
                    <div><a href="#"><i className="iconfont icon-nvshiweishengyongpin"></i><p>姨妈巾</p></a></div>
                    <div><a href="#"><i className="iconfont icon-zhijin"></i><p>家居清洁</p></a></div>
                    <div><a href="#"><i className="iconfont icon-qingquyongpin"></i><p>情趣用品</p></a></div>
                    <div><a href="#"><i className="iconfont icon-xifahufa"></i><p>洗发护发</p></a></div>
                    <div><a href="#"><i className="iconfont icon-meironggongju"></i><p>美容工具</p></a></div>
                    <div><a href="#"><i className="iconfont icon-shentihuli"></i><p>身体护理</p></a></div>
                </div>
                <div className="banner">
                    <img src="/src/assets/images/kind6.jpeg" />
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
export default HomeHealth;