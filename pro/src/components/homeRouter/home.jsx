import React,{Component} from 'react';
// import { Button } from 'element-react';
import styled from 'styled-components';
import '../../assets/font_home/iconfont.css'


class Meizhuang extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        var Div = styled.div`
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
        `
        return (
            <Div>
                <div className="header">
                    <div><a href="#"><i className="iconfont icon-huo"></i><p>TOP热销</p></a></div>
                    <div><a href="#"><i className="iconfont icon-hufu--"></i><p>基础护肤</p></a></div>
                    <div><a href="#"><i className="iconfont icon-koudai"></i><p>大牌小样</p></a></div>
                    <div><a href="#"><i className="iconfont icon-xiezhuangye"></i><p>清洁卸妆</p></a></div>
                    <div><a href="#"><i className="iconfont icon-jirou"></i><p>男士专区</p></a></div>
                    <div><a href="#"><i className="iconfont icon-caizhuang"></i><p>百变彩妆</p></a></div>
                    <div><a href="#"><i className="iconfont icon-mianmo"></i><p>面膜面贴</p></a></div>
                    <div><a href="#"><i className="iconfont icon-xiangshui"></i><p>魅惑香水</p></a></div>
                </div>
            </Div>
        )
    }
}
export default Meizhuang;