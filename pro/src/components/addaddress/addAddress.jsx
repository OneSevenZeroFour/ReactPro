import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AddAddressAction from './addAddressAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message, Checkbox } from 'element-react';

import './addAddress.scss';
import '../../assets/distpicker/css/LArea.css';
import '../../assets/distpicker/js/LArea.js';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            ischecked: '2'
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
        if (nextProps.data.status) {
            Message({
                type: 'success',
                message: '注册成功'
            })
            nextProps.history.push('/');
        }
    }
    componentDidMount() {
        //初始化地址选择控件
        var area1 = new LArea();
        area1.init({
            'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
            'valueTo': '#value1', //选择完毕后id属性输出到该位置
            'keys': {
                id: 'id',
                name: 'name'
            }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
            'type': 1, //数据源类型
            'data': LAreaData //数据源
        });
        area1.value = [1, 22, 10]; //控制初始位置，注意：该方法并不会影响到input的value

    }
    sendMsg() {
        console.log(this.refs.cityData.value)
    }
    changeCheck(e){
        console.log(e)
        this.refs.radio.cheched = false;
    }
    render() {
        return (
            <div id="addAddress">
                <div className="header">
                    <i className="el-icon-arrow-left" onClick={() => { this.props.history.go(-1) }}></i>
                    <p>新建收货地址</p>
                </div>
                <div className="add-middle">
                    <div className="msg-area">
                        <p><span>*</span>收货地区</p>
                        <input id="demo1" type="text"
                            readOnly
                            placeholder="城市选择特效"
                            defaultValue="广东省,广州市,越秀区"
                            ref="cityData"
                            className="deAddress"
                        />
                        <input id="value1" type="hidden" defaultValue="20,234,504" />
                    </div>
                    <div className="msg-area">
                        <p><span>*</span>详细地址</p>
                        <input className="deAddress" type="text" placeholder="请输入详细地址"/>
                    </div>
                    <div className="msg-area">
                        <p><span>*</span>联系电话</p>
                        <input className="deAddress" type="text" placeholder="请输入收货地址"/>
                    </div>
                    <div className="msg-area">
                        <p><span>*</span>收货人</p>
                        <input className="deAddress" type="text" placeholder="请输入收货人姓名"/>
                    </div>
                    <div className="msg-area">
                        <p className="diff">设置默认地址<span>（注：每次下单时默认该地址）</span></p>
                        <Checkbox checked>''</Checkbox>
                    </div>
                    <div>
                        <button onClick={() => { this.sendMsg() }}>click</button>
                    </div>
                </div>
                <SpinnerComponent />
            </div>
        )
    }

}

const mapStateToProps = function (state) {
    //console.log(state); this.props
    return {
        data: state.Login.data
    }
}

export default connect(mapStateToProps, AddAddressAction)(LoginComponent);
