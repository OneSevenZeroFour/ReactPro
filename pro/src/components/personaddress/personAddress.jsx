import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PersonAddressAction from './personAddressAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message, Radio, MessageBox } from 'element-react';
import $ from 'jquery';

import './personAddress.scss';
import { cookie } from '../../util/cookie';
import { serverUrl } from '../../util/base';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: 0
        }
    }
    componentWillUnmount(){
        $('.ant-layout-footer').css({display:'block'})
    }
    componentDidMount() {
        $('.ant-layout-footer').css({display:'none'})
        //console.log('123')
        let self = this;
        self.selectFun(function (res) {
            if (!res.data.length) {
                self.refs.empty.style.display = 'block';

            } else {
                self.refs.empty.style.display = 'none';
                cookie.set({
                    name: 'codeId',
                    val: res.data[0].code
                })
            }
            self.setState({
                data: res.data
            })
            console.log(self.state)
        })
    }

    //查询数据方法
    selectFun(callback) {
        $.post(serverUrl + 'select', {
            tableName: 'address',
            target: {
                type: 'default',
                tSearch: [{
                    userId: cookie.get('userId')
                }]
            },
            order: 'code',
            sort: 'desc'
        }, function (res) {
            console.log(res)
            callback(res);
        })
    }

    //修改默认地址
    onChange(value) {
        let self = this;
        //更改radio
        this.setState({ value });

        let addrData = this.state.data;
        //设置新的 code
        let date = new Date();
        date = date.getTime();

        $.post(serverUrl + 'update', {
            tableName: 'address',
            data: {
                code: date
            },
            target: {
                type: 'default',
                tSearch: [{
                    userId: cookie.get('userId'),
                    addressId: addrData[value].addressId
                }]
            }
        }, function (res) {
            if (res.status) {
                addrData[value].code = date;
                self.setState({
                    data: addrData
                })
                cookie.set({
                    name: 'codeId',
                    val: date
                })
            }
        })
    }

    //删除地址
    removeAddr(addrId) {
        let self = this;

        //提示是否删除
        MessageBox.confirm('是否删除该地址?', '提示', {
            type: 'warning'
        }).then(() => {
            $.post(serverUrl + 'remove', {
                tableName: 'address',
                target: {
                    type: 'default',
                    tSearch: [{
                        userId: cookie.get('userId'),
                        addressId: addrId
                    }]
                }
            }, function (res) {
                if (res.status) {
                    self.selectFun(function (res) {
                        if (!res.data.length) {
                            self.refs.empty.style.display = 'block';
                        } else {
                            self.refs.empty.style.display = 'none';
                        }
                        self.setState({
                            data: res.data
                        })
                        //console.log(self.state)
                    })
                }
            })

        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消删除'
            });
        });

    }

    //编辑地址
    editAddr(addrId) {
        this.props.history.push({
            pathname: '/personal/addaddress',
            query: {
                addressId: addrId
            }
        });
    }

    render() {
        return (
            <div id="personAddress">
                <div className="header">
                    <i className="el-icon-arrow-left" onClick={() => { this.props.history.go(-1) }}></i>
                    <p>收货地址</p>
                </div>
                <div className="num-info">已有<span> 0 </span>条收货地址（最多添加10条）</div>
                <div className="address-list">
                    <div className="isempty" ref="empty">
                        <i className="iconfont icon-shouhuodizhi"></i>
                        <p>您还没有添加收货地址</p>
                    </div>
                    <div className="addr-list">
                        <ul>
                            {this.state.data.map((item, index) => {
                                return <li key={index}>
                                    <div className="msg-area">
                                        <p className="recipient">{item.customer} <span className="elephone">{item.elephone}</span></p>
                                        <p className="pre-address">{item.address}</p>
                                    </div>
                                    <div className="edit-area">
                                        <p>
                                            <Radio value={index} checked={this.state.value === index} onChange={this.onChange.bind(this)} className="addr-radio">设为默认</Radio>
                                        </p>
                                        <p onClick={() => { this.removeAddr(item.addressId) }}>
                                            <i className="el-icon-delete"></i>
                                            <span>删除</span>
                                        </p>
                                        <p onClick={() => { this.editAddr(item.addressId) }}>
                                            <i className="el-icon-edit"></i>
                                            <span>编辑</span>
                                        </p>


                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="add-area">
                        <Button type="primary" className="add-btn" onClick={() => { this.props.history.push('/personal/addaddress') }}>添加地址</Button>
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

export default connect(mapStateToProps, PersonAddressAction)(LoginComponent);
