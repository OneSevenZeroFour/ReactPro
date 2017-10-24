import React,{Component} from 'react';
// import { Button } from 'element-react';
//import styled from 'styled-components';
import '../../../assets/font_home/iconfont.css';
import '../../../assets/css/homeRouter.css'


class HomeExcise extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        return (
            <div>
                <div className="header">
                    <div><a href="#"><i className="iconfont icon-fire"></i><p>TOP热销</p></a></div>
                    <div><a href="#"><i className="iconfont icon-tubiao"></i><p>关怀长辈</p></a></div>
                    <div><a href="#"><i className="iconfont icon-nvxing"></i><p>女性健康</p></a></div>
                    <div><a href="#"><i className="iconfont icon-iconcle07"></i><p>男性健康</p></a></div>
                    <div><a href="#"><i className="iconfont icon-yunfu"></i><p>孕期营养</p></a></div>
                    <div><a href="#"><i className="iconfont icon-ertong"></i><p>儿童营养</p></a></div>
                    <div><a href="#"><i className="iconfont icon-yingyang"></i><p>基础营养</p></a></div>
                    <div><a href="#"><i className="iconfont icon-zhichangbagua"></i><p>营养八卦</p></a></div>
                </div>
                <div className="banner">
                    <img src="/src/assets/images/kind8.jpeg" />
                </div>
                
            </div>
        )
    }
}
export default HomeExcise;