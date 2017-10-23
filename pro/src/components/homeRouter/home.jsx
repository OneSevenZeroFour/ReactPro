import React,{Component} from 'react';
// import { Button } from 'element-react';
import styled from 'styled-components';


class Meizhuang extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        var Div = styled.div`
            .header{
                overflow:hidden;padding:10px 15px;
                li{
                    width:20%;height:float:left;font-size:12px;
                }
            }
        `
        return (
            <Div>
                <div>
                <ul className="header">
                <li><i></i>TOP热销</li>
                <li><i></i>基础护肤</li>
                <li><i></i>大牌小样</li>
                <li><i></i>清洁卸妆</li>
                <li><i></i>男士专区</li>
                <li><i></i>百变彩妆</li>
                <li><i></i>面膜面贴</li>
                <li><i></i>魅惑香水</li>
                </ul>
                </div>
            </Div>
        )
    }
}
export default Meizhuang;