import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as OrderAction from './orderAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message, MessageBox } from 'element-react';
import $ from 'jquery';

import './order.scss';
import { serverUrl } from '../../util/base';
import { cookie } from '../../util/cookie';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addr: '广东省 广州市 越秀区',
            orderData: []
        }
    }
 
    componentWillUnmount(){
        $('.ant-layout-footer').css({display:'block'})
    }
    componentDidMount() {
        $('.ant-layout-footer').css({display:'none'})
        let self = this;

        if (!cookie.get('userId')) {
            MessageBox.msgbox({
                title: '提示',
                message: '您尚未登录，请返回登录',
                showCancelButton: false
            }).then(action => {
                self.props.history.push('/login');
            })
        }

        //添加地址
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
            var addr = res.data[0].address;
            self.setState({
                addr
            })

        })

        //获取 data
        let Arr = sessionStorage.getItem('orderData');
        let arr = [];
        let alfArr = [];
        let obj = {
            shop: '',
            data: []
        };
        let startId = 0;
        Arr = JSON.parse(Arr);
        Arr.forEach(function (item, idx) {
            if (arr.indexOf(item.shops) == -1) {
                arr.push(item.shops);
                ++startId;
                alfArr.push(JSON.parse(JSON.stringify(obj)));
                obj.shop = item.shops;
                obj.data = [];
            }
            obj.data.push(item);
        })
        alfArr.push(JSON.parse(JSON.stringify(obj)));
        alfArr = alfArr.slice(1, alfArr.length);
        self.setState({
            orderData: alfArr
        })
    }
    getAddr() {

        this.props.history.push('/personal/personaddress');
    }
    render() {
        return (
            <div id="order">
                <div className="order-header">
                    <i className="el-icon-arrow-left left" onClick={() => { this.props.history.go(-1) }}></i>
                    <p>下单结算</p>
                </div>
                <div className="addr-area" onClick={() => { this.getAddr() }}>
                    <i className="iconfont icon-shouhuodizhi left"></i>
                    <p>{this.state.addr}</p>
                    <i className="el-icon-arrow-right right"></i>
                </div>
                <div className="order-middle">
                    {this.state.orderData.length > 0 ? this.state.orderData.map((ixtem, index) => {

                        return <div className="cart-item" key={index}>
                            <div className="cart-shop">
                                <span className="cart-shop-title">{ixtem.shop}</span>
                            </div>
                            {ixtem.data.map((item, idx) => {
                                return <div className="cart-goods" key={idx}>
                                    <div className="goods-img">
                                        <img src={`./src/assets/img/${item.goodsImg}`} alt={item.goodsTitle} />
                                    </div>
                                    <div className="title-area">
                                        <p className="goods-title">{item.goodsTitle}</p>
                                        <p>{item.goodsStyle}</p>
                                    </div>
                                    <div className="price-area">
                                        <p>{item.goodsPrice}</p>
                                    </div>
                                    <div className="num-area">
                                        <div className="num-show">
                                            X{item.goodsNum}
                                        </div>
                                    </div>
                                </div>
                            })}
                            <div className="total-price">
                                <p>本店合计(含税): <span>{((index) => {
                                    let orderData = this.state.orderData[index];
                                    console.log(orderData)
                                    let max = orderData.data.reduce((total, current) => {
                                        return total + parseFloat(current.goodsPrice) * current.goodsNum;
                                    }, 0)
                                    //console.log(max, index)
                                    return max;
                                })(index)}.00</span> </p>
                            </div>
                        </div>
                    }) : (
                            <div className="isempty" ref="empty">
                                <i className="iconfont icon-shouhuodizhi"></i>
                                <p>您还没有结算订单</p>
                            </div>
                        )}
                </div>

                <div className="order-totalPrice">
                    <p>商品总计： <span>{(() => {
                        let orderData = this.state.orderData;
                        let max = orderData.reduce((total, current) => {
                            let curOdd = current.data.reduce((xtotal, xcurrent) => {
                                return xtotal + parseFloat(xcurrent.goodsPrice) * xcurrent.goodsNum;
                            }, 0)
                            return total + curOdd;
                        }, 0)
                        return max;
                    })()}</span></p>
                    <p>税费总计： <span>0.00</span></p>
                    <p>运费总计： <span>0.00</span></p>
                    <p>优惠总计:  <span>0.00</span></p>
                </div>

                <div className="order-bottom">
                    <div className="o-t-area">
                        <div className="o-t-t-price">实付款:￥ <span>{
                            (() => {
                                let orderData = this.state.orderData;
                                let max = orderData.reduce((total, current) => {
                                    let curOdd = current.data.reduce((xtotal, xcurrent) => {
                                        return xtotal + parseFloat(xcurrent.goodsPrice) * xcurrent.goodsNum;
                                    }, 0)
                                    return total + curOdd;
                                }, 0)
                                return max;
                            })()
                        }</span></div>
                        <div className="o-t-t-btn">提交订单</div>
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

export default connect(mapStateToProps, OrderAction)(LoginComponent);
