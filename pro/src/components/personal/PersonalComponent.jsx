import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PersonalAction from './PersonalAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message, MessageBox } from 'element-react';

import './personal.scss';
import { cookie } from '../../util/cookie';
import { serverUrl } from '../../util/base';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        let self = this;

        if (!cookie.get('userId')) {
            MessageBox.msgbox({
                title: '提示',
                message: '您尚未登录，请返回登录',
                showCancelButton: false
            }).then(action => {
                self.props.history.push('/login');
                return;
            })
        } else {
            $.post(serverUrl + 'select', {
                tableName: 'customer',
                target: {
                    type: 'default',
                    tSearch: [{
                        userId: cookie.get('userId')
                    }]
                }
            }, function (res) {
                //console.log(res)
                self.setState({
                    username: res.data[0].nickname || res.data[0].elephone
                })

            })
        }


    }
    orderLink(num) {
        //console.log(111)
        this.props.history.push(`/personal/personorder/${num}`);
    }
    loginOut() {
        cookie.remove('userId');
        cookie.remove('codeId');
        this.props.history.push('/login');
    }
    render() {
        return (
            <div id="personal">
                <div className="persontop">
                    <div className="person-header">
                        <div className="linkicons">
                            <i className="el-icon-arrow-left left" onClick={() => { this.props.history.push('/personal') }}></i>
                            <i className="iconfont icon-shouye right" onClick={() => { this.props.history.push('/home/hot') }}></i>
                        </div>
                    </div>
                    <div className="person-area">
                        <div className="img-area">
                            <img src="./src/assets/img/user.png" alt="" />
                        </div>
                        <div className="nick-area">
                            <p>{this.state.username}</p>
                        </div>
                        <div className="level-area">
                            <i>
                                <img src="./src/assets/img/bac.png" alt="" />
                            </i>
                            <span>普通会员</span>
                        </div>
                    </div>
                </div>
                <div className="person-middle">
                    <div className="order">
                        <p className="order-title">我的订单 <span onClick={() => { this.orderLink('0') }}>查看我的全部订单 ></span></p>
                        <div className="order-list">
                            <ul>
                                <li onClick={() => { this.orderLink('1') }}>
                                    <i className="iconfont icon-qianbao"></i>
                                    <p>代付款</p>
                                </li>
                                <li onClick={() => { this.orderLink('2') }}>
                                    <i className="iconfont icon-daifahuo"></i>
                                    <p>代发货</p>
                                </li>
                                <li onClick={() => { this.orderLink('3') }}>
                                    <i className="iconfont icon-0068"></i>
                                    <p>待收货</p>
                                </li>
                                <li onClick={() => { this.orderLink('4') }}>
                                    <i className="iconfont icon-wuliuchaxun"></i>
                                    <p>物流查询</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="person-bottom">
                    <ul>
                        <li >
                            <i className="iconfont icon-jifen pink"></i>
                            <p>会员积分</p>
                        </li>
                        <li onClick={() => { this.props.history.push('/personal/collection') }}>
                            <i className="iconfont icon-shoucang pink"></i>
                            <p>我的收藏</p>
                        </li>
                        <li>
                            <i className="iconfont icon-youhuiquan1 pink"></i>
                            <p>优惠券</p>
                        </li>
                        <li onClick={() => { this.props.history.push('/personal/personaddress') }}>
                            <i className="iconfont icon-shouhuodizhi yellow"></i>
                            <p>收货地址</p>
                        </li>
                        <li>
                            <i className="iconfont icon-yanzhengshenfen yellow"></i>
                            <p>身份证信息</p>
                        </li>
                        <li>
                            <i className="iconfont icon-shangpinpinglun yellow"></i>
                            <p>商品评论</p>
                        </li>
                        <li onClick={this.loginOut.bind(this)}>
                            <i className="iconfont icon-tuichu grey"></i>
                            <p>退出</p>
                        </li>
                    </ul>
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

export default connect(mapStateToProps, PersonalAction)(LoginComponent);
