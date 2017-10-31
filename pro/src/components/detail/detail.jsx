import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Message, MessageBox } from 'element-react';

import $ from "jquery";

import './detail.scss';
import { cookie } from '../../util/cookie';
import { serverUrl } from '../../util/base';


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                img: 'detial01.jpeg',
                price: '1715.00',
                num: '1',
                title: 'MARSHALL 马歇尔 MAJOR II BLUETOOTH头戴式HiFi重低音蓝牙耳机',
                style: '棕色',
                shop: '湛瑞旗舰店'
            }
        }
    }
    componentDidMount() {
        $('.ant-layout-footer').css({ display: 'none' });

        let obj = sessionStorage.getItem('cartGoods');

        obj = JSON.parse(obj);
        console.log(obj)
        let data = {
            img: obj.goodsImg,
            price: obj.goodsPrice,
            num: '1',
            title: obj.goodsTitle||'',
            style: obj.goodsStyle,
            shop: obj.shops
        }
        console.log(data);
        this.setState({
            data
        })
    }
    componentWillUnmount() {
        $('.ant-layout-footer').css({ display: 'block' });
    }
    orderList(num) {
        this.refs.colorlink.style.left = 33 * num + "%";
    }
    sendColection() {
        let self = this;
        let data = this.state.data;

        if (!cookie.get('userId')) {
            MessageBox.confirm('您尚未登录，是否返回登录?', '提示', {
                type: 'warning'
            }).then(() => {
                self.props.history.push('/login');
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

            return false;
        }
        //console.log('123')
        $.post(serverUrl + 'select', {
            tableName: 'collection',
            target: {
                type: 'default',
                tSearch: [{
                    userId: cookie.get('userId'),
                    goodsTitle: data.title
                }]
            }
        }, function (res) {
            console.log(res)
            if (res.data.length) {
                Message({
                    type: 'warning',
                    message: '该商品已在收藏夹 请到个人中心查看'
                })
                return;
            } else {
                $.post(serverUrl + 'insert', {
                    tableName: 'collection',
                    data: {
                        userId: cookie.get('userId'),
                        goodsImg: data.img,
                        goodsTitle: data.title,
                        goodsPrice: data.price,

                    }
                }, function (res) {
                    if (res.status) {
                        Message({
                            type: 'success',
                            message: '该商品已经移到收藏夹'
                        })
                    }
                })
            }

        })


    }
    cutNum() {
        let data = this.state.data;
        --data.num;
        if (data.num <= 0) {
            data.num = 1;
        }
        this.setState({
            data
        })
    }
    addNum() {
        let data = this.state.data;
        let num = parseInt(data.num);
        data.num = ++num;
        this.setState({
            data
        })
    }
    sendCart() {
        let self = this;
        let data = this.state.data;

        if (!cookie.get('userId')) {
            MessageBox.confirm('您尚未登录，是否返回登录?', '提示', {
                type: 'warning'
            }).then(() => {
                self.props.history.push('/login');
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

            return false;
        }
        //console.log('123')
        $.post(serverUrl + 'select', {
            tableName: 'cart',
            target: {
                type: 'default',
                tSearch: [{
                    userId: cookie.get('userId'),
                    goodsTitle: data.title
                }]
            }
        }, function (res) {
            console.log(res)
            if (res.data.length) {
                $.post(serverUrl + 'update', {
                    tableName: 'cart',
                    data: {
                        goodsNum: parseInt(res.data[0].goodsNum) + parseInt(data.num)
                    },
                    target: {
                        type: 'default',
                        tSearch: [{
                            userId: cookie.get('userId'),
                            cartId: res.data[0].cartId
                        }]
                    }
                }, function (res) {
                    console.log(res)
                    if (res.status) {
                        Message({
                            type: 'success',
                            message: '已加入购物车'
                        })
                    }
                })

            } else {
                $.post(serverUrl + 'insert', {
                    tableName: 'cart',
                    data: {
                        userId: cookie.get('userId'),
                        shops: data.shop,
                        goodsImg: data.img,
                        goodsTitle: data.title,
                        goodsPrice: data.price,
                        goodsNum: data.num,
                        goodsStyle: data.style

                    }
                }, function (res) {
                    if (res.status) {
                        Message({
                            type: 'success',
                            message: '已加入购物车'
                        })
                    }
                })
            }

        })
    }
    render() {
        return (
            <div id="detail">
                <div className="de-header">
                    <i className="el-icon-arrow-left" onClick={() => { this.props.history.go(-1) }}></i>
                    <p>商品详情</p>
                </div>
                <div className="order-middle">
                    <ul>
                        <li onClick={() => { this.orderList('0') }}>
                            <p>基本信息</p>
                        </li>
                        <li onClick={() => { this.orderList('1') }}>
                            <p>图文详情</p>
                        </li>
                        <li onClick={() => { this.orderList('2') }}>
                            <p>商品评价</p>
                        </li>
                    </ul>
                    <div className="colorlink" ref="colorlink"></div>
                </div>
                <div className="detail-middle">
                    <div className="detailImg">
                        <img src={this.state.data.img} alt="" />
                    </div>
                    <div className="detail-price">{this.state.data.price}.00</div>
                    <div></div>
                    <div className="detail-title">{this.state.data.title + '  ' + this.state.data.style}</div>
                    <div className="detail-msg">运费说明：普通快递 本店所有商品包邮包税，发货周期一般在72小时内。采用德国邮政小包，荷兰邮政。所有包裹均为航空包裹，预计7-15个工作日到货</div>
                </div>
                <div className="other-area">
                    <div className="other-msg">关税卖家承担，如配送过程中产生税费，请联系客服！</div>
                    <div className="other-num-area">
                        <div className="other-num-label">数量</div>
                        <div className="num-area">
                            <div className="num-cut" onClick={() => { this.cutNum() }}> - </div>
                            <div className="num-show"> {this.state.data.num} </div>
                            <div className="num-add" onClick={() => { this.addNum() }}> + </div>
                        </div>
                    </div>
                </div>
                <div className="footer-area">
                    <div>{this.state.data.shop}</div>
                    <div className="link-to-msg">联系客服</div>
                </div>
                <div className="footer-area-mark2">点击查看商品详情</div>
                <div className="footer-area-markdown">
                    <div className="footer-area-left">
                        <ul>
                            <li onClick={() => { this.props.history.push('/personal') }}>
                                <i className="iconfont icon-user"></i>
                                <p>我的</p>
                            </li>
                            <li onClick={() => { this.sendColection() }}>
                                <i className="iconfont icon-shoucang"></i>
                                <p>收藏</p>
                            </li>
                            <li onClick={() => { this.props.history.push('/cart') }}>
                                <i className="iconfont icon-wuliuchaxun"></i>
                                <p>购物车</p>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-area-right" onClick={() => { this.sendCart() }}>
                        加入购物车
                    </div>
                </div>
            </div>
        )
    }
}

export default ((state) => {
    return state;
})(Detail);
