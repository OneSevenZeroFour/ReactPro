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



class HomeMakeup extends Component {
    constructor(props){
        super(props);
        //this.data=this.props.location.query;
        this.state = {
            activeData:"",
            ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=%E7%BE%8E%E5%A6%86&apikey=QXsvzRZEdtm3JmfD16LWkBk7nB688hrMPhTsJafIzW5b53pJueSAK4iGP4ThzFmi"
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


    /*view层*/
    render(){
        var Div = styled.div`
            html{background:#fff}
            .header{
                box-sizing:border-box;padding-top:10px;
                div{
                    float:left;width:25%;text-align:center;
                    a{
                        color:#666;font-size:10px;text-decoration:none;padding:5px;
                        .iconfont{
                            display:inline-block;width:30px;height:30px;line-height:30px;font-size:16px;background:#eee;vertical-align:middle;border-radius:8px;color:orange;
                        }
                        p{padding-top:5px;}
                    }

                }
            }
            .banner{
                img{width:100%;height:auto;}
            }
        `
        

        return (
            <div>
                <div className="header">
                    <div><a href="#/sort?美妆热销"><i className="iconfont icon-fire"></i><p>TOP热销</p></a></div>
                    <div><a href="#/sort?基础护肤"><i className="iconfont icon-hufu--"></i><p>基础护肤</p></a></div>
                    <div><a href="#/sort?大牌小样"><i className="iconfont icon-koudai"></i><p>大牌小样</p></a></div>
                    <div><a href="#/sort?清洁卸妆"><i className="iconfont icon-17"></i><p>清洁卸妆</p></a></div>
                    <div><a href="#/sort?男士专区"><i className="iconfont icon-jirou"></i><p>男士专区</p></a></div>
                    <div><a href="#/sort?百变彩妆"><i className="iconfont icon-caizhuang"></i><p>百变彩妆</p></a></div>
                    <div><a href="#/sort?面膜面贴"><i className="iconfont icon-mianmo"></i><p>面膜面贴</p></a></div>
                    <div><a href="#/sort?魅惑香水"><i className="iconfont icon-xiangshui"></i><p>魅惑香水</p></a></div>
                </div>
                <div className="banner">
                    <img src="/src/assets/images/kind5.jpeg" />
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
export default HomeMakeup;