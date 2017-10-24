import React,{Component} from 'react';
// import { Button } from 'element-react';
//import styled from 'styled-components';
import '../../../assets/font_home/iconfont.css';
import '../../../assets/css/homeRouter.css'


class HomeFoods extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        return (
            <div>
                <div className="header">
                    <div><a href="#"><i className="iconfont icon-tangguo"></i><p>休闲零食</p></a></div>
                    <div><a href="#"><i className="iconfont icon-kafei"></i><p>咖啡冲饮</p></a></div>
                    <div><a href="#"><i className="iconfont icon-jianguo"></i><p>坚果果干</p></a></div>
                    <div><a href="#"><i className="iconfont icon-iconcopy"></i><p>谷物麦片</p></a></div>
                    <div><a href="#"><i className="iconfont icon-niunai"></i><p>进口牛奶</p></a></div>
                    <div><a href="#"><i className="iconfont icon-sushi"></i><p>速食料理</p></a></div>
                    <div><a href="#"><i className="iconfont icon-yinliao"></i><p>酒水饮料</p></a></div>
                    <div><a href="#"><i className="iconfont icon-dangao"></i><p>饼干糕点</p></a></div>
                </div>
                
            </div>
        )
    }
}
export default HomeFoods;