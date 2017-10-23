import React,{Component} from 'react';
// import { Button } from 'element-react';
//import styled from 'styled-components';
import '../../../assets/font_home/iconfont.css';
import '../../../assets/css/homeRouter.css'


class HomeBaby extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        return (
            <div>
                <div className="header">
                    <div><a href="#"><i className="iconfont icon-naiping"></i><p>奶粉</p></a></div>
                    <div><a href="#"><i className="iconfont icon-yunmabibei"></i><p>孕妈用品</p></a></div>
                    <div><a href="#"><i className="iconfont icon-yizi"></i><p>安全出行</p></a></div>
                    <div><a href="#"><i className="iconfont icon-webiconxifashui"></i><p>洗护喂养</p></a></div>
                    <div><a href="#"><i className="iconfont icon-muma"></i><p>玩具图书</p></a></div>
                    <div><a href="#"><i className="iconfont icon-tongzhuang"></i><p>童装童鞋</p></a></div>
                    <div><a href="#"><i className="iconfont icon-zhiniaoku"></i><p>纸尿裤</p></a></div>
                    <div><a href="#"><i className="iconfont icon-koudai"></i><p>营养辅食</p></a></div>
                </div>
                <div className="banner">
                    <img src="/src/assets/images/kind4.jpeg" />
                </div>
                
            </div>
        )
    }
}
export default HomeBaby;