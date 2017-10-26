import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AddAddressAction from './addAddressAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message } from 'element-react';
import $ from 'jquery';

import './addAddress.scss';
import '../../assets/distpicker/css/LArea.css';
import '../../assets/distpicker/js/LArea.js';
import { cookie } from '../../util/cookie';
import { serverUrl } from '../../util/base';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            ischecked: '2',
            data: {}
        }
    }
  
    componentWillUnmount(){
        $('.ant-layout-footer').css({display:'block'})
    }
    componentDidMount() {
        $('.ant-layout-footer').css({display:'none'})
        let self = this;

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

        //获取query
        //console.log(this.props.location.query)
        if (this.props.location.query) {
            let addrId = this.props.location.query.addressId;
            $.post(serverUrl + 'select', {
                tableName: 'address',
                target: {
                    type: 'default',
                    tSearch: [{
                        userId: cookie.get('userId'),
                        addressId: addrId
                    }]
                }
            }, function (res) {
                let arr = res.data[0].address.split(' ');
                let addr = arr.splice(0, 3).join(',');
                let mainAddr = arr[0];
                let obj = {
                    addr,
                    mainAddr,
                    elephone: res.data[0].elephone,
                    customer: res.data[0].customer,
                    oldCode: res.data[0].code,
                    addressId: res.data[0].addressId,
                    code: cookie.get('codeId') == res.data[0].code ? true : false
                }
                console.log(obj)
                self.setState({
                    status: true,
                    data: obj
                })
                //self.render();
                //console.log(self.state)
            })
        }
    }
    sendMsg() {
        let self = this;
        let data = this.state.data;
        //获取数据

        let addr = this.refs.cityData.value.split(',').join(' ') + ' ' + data.mainAddr;

        //设置标识
        let code = '';
        if (data.code) {
            var date = new Date();
            code = date.getTime().toString();
        }

        if (this.props.location.query) {
            //update
            $.post(serverUrl + 'update', {
                tableName: 'address',
                data: {
                    address: addr,
                    elephone: data.elephone,
                    customer: data.customer,
                    code: code || data.oldCode
                },
                target: {
                    type: 'default',
                    tSearch: [{
                        userId: cookie.get('userId'),
                        addressId: data.addressId
                    }]
                }
            }, function (res) {
                Message({
                    type: 'success',
                    message: '地址更新成功'
                })
                setTimeout(function () {
                    self.props.history.push('/personal/personaddress');
                }, 1000)
                //console.log(res)
            })
        } else {
            //insert
            $.post(serverUrl + 'insert', {
                tableName: 'address',
                data: {
                    userId: cookie.get('userId'),
                    address: addr,
                    elephone: data.elephone,
                    customer: data.customer,
                    code: code
                }
            }, function (res) {
                Message({
                    type: 'success',
                    message: '新地址注册成功'
                })
                setTimeout(function () {
                    self.props.history.push('/personal/personaddress');
                }, 1000)
                //console.log(res)
            })
        }



    }
    changeData(option, e) {
        let self = this;
        let data = this.state.data;
        data[option] = e.target.value;
        this.setState(data);
        //console.log(this.state)
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
                        <input className="deAddress" type="text" onChange={this.changeData.bind(this, 'mainAddr')} value={this.state.data.mainAddr || ''} placeholder="请输入详细地址" />
                    </div>
                    <div className="msg-area">
                        <p><span>*</span>联系电话</p>
                        <input className="deAddress" type="text" onChange={this.changeData.bind(this, 'elephone')} value={this.state.data.elephone || ''} placeholder="请输入收货地址" />
                    </div>
                    <div className="msg-area">
                        <p><span>*</span>收货人</p>
                        <input className="deAddress" type="text" onChange={this.changeData.bind(this, 'customer')} value={this.state.data.customer || ''} placeholder="请输入收货人姓名" />
                    </div>
                    <div className="msg-area">
                        <p className="diff">设置默认地址<span>（注：每次下单时默认该地址）</span></p>
                        <input type="checkbox" id="checkedbox" onChange={this.changeData.bind(this, 'code')} checked={!!this.state.data.code} />
                        <label htmlFor="checkedbox" className="label-box"></label>
                    </div>
                    <div>
                        <Button onClick={() => { this.sendMsg() }} className="send-btn">注册新地址</Button>
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
