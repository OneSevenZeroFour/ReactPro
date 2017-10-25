import React,{Component} from 'react';
// import { Button } from 'element-react';
//import styled from 'styled-components';
import '../../../assets/font_home/iconfont.css';
import '../../../assets/css/homeRouter.scss'


class HomeHealth extends Component {
    constructor(props){
        super(props);
        
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
                
            </div>
        )
    }
}
export default HomeHealth;