import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as CartAction from './cartAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message, MessageBox } from 'element-react';
import $ from 'jquery';

import './cart.scss';
import { cookie } from '../../util/cookie';
import Checkbox from '../zujian/checkbox.jsx';
import { serverUrl } from '../../util/base';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //商店 check 点击
            shopsCheck: [],
            //商品 check 点击 
            checkList: [],
            //地址初始值
            addr: '广东省 广州市 天河区',
            //获取 cart 数据
            cartData: [],
            //是否可以启用管理
            cartEdit: false,
            //是否可以提交订单
            canOrder: true,
        }
    }
    componentWillUnmount() {
        $('.ant-layout-footer').css({ display: 'block' })
    }
    componentWillUpdate() {
        let checkList = this.state.checkList;
        let hasgoods = checkList.some(function (item, idx) {
            return item.length > 0;
        })
        if (hasgoods && this.state.canOrder) {
            this.refs.orderBtn.style.backgroundColor = '#f03468';

        } else {
            this.refs.orderBtn.style.backgroundColor = '#dfdfdf';

        }
    }


    componentDidMount() {
        $('.ant-layout-footer').css({ display: 'none' })
        let self = this;

        //是否登录
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

        //获取 cart
        $.post(serverUrl + 'select', {
            tableName: 'cart',
            target: {
                type: 'default',
                tSearch: [{
                    userId: cookie.get('userId')
                }]
            }
        }, function (res) {
            let data = res.data;
            let arr = [];
            let alfArr = [];
            let obj = {
                id: 0,
                shop: '',
                data: []
            };
            let startId = 0;
            data.forEach(function (item, idx) {
                if (arr.indexOf(item.shops) == -1) {
                    arr.push(item.shops);
                    ++startId;
                    alfArr.push(JSON.parse(JSON.stringify(obj)));
                    obj.id = startId;
                    obj.shop = item.shops;
                    obj.data = [];
                }
                obj.data.push(item);
            })
            alfArr.push(JSON.parse(JSON.stringify(obj)));
            alfArr = alfArr.slice(1, alfArr.length);
            //console.log(alfArr);

            //生成checkList
            let checkList = self.state.checkList;
            for (let i = 0; i < alfArr.length; i++) {
                let arr = [];
                checkList.push(arr);
            }
            console.log(checkList[1]);
            self.setState({
                checkList,
                cartData: alfArr
            })
        })

    }

    //输入框修改数量
    getDifNum(index, idx, e) {
        let data = this.state.cartData;
        data[index].data[idx].goodsNum = e.target.value;
        this.setState({
            cartData: data
        })
    }

    //按钮数量减少
    cutNum(index, idx) {
        let data = this.state.cartData;
        let num = data[index].data[idx].goodsNum;

        num = num > 1 ? --num : 1;
        data[index].data[idx].goodsNum = num;
        //console.log(data);
        this.setState({
            cartData: data
        })
    }

    //按钮数量增加
    addNum(index, idx) {
        let data = this.state.cartData;
        let num = data[index].data[idx].goodsNum;
        num = ~~num + 1;
        data[index].data[idx].goodsNum = num;
        this.setState({
            cartData: data
        })
    }

    //生成对应空数组函数
    createArr(len) {
        let arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(i);
        }
        return arr;
    }

    //商家选中
    shopCheck(num) {

        let self = this;
        let shopsCheck = this.state.shopsCheck;
        let checkList = this.state.checkList;
        let cartData = this.state.cartData;
        if (shopsCheck.indexOf(num) != -1) {
            //console.log(shopsCheck.indexOf(num), 1)
            shopsCheck.splice(shopsCheck.indexOf(num), 1);
            checkList[num] = [];
        } else {
            shopsCheck.push(num);
            checkList[num] = this.createArr(cartData[num].data.length);
        }
        self.setState({
            shopsCheck,
            checkList
        })
    }

    //商品选中
    goodsCheck(shopsNum, goodsNum) {
        let self = this;
        let shopsCheck = this.state.shopsCheck;
        let checkList = this.state.checkList;
        let cartData = this.state.cartData;

        let current = checkList[shopsNum];

        if (current.indexOf(goodsNum) != -1) {
            let num = current.indexOf(goodsNum);
            current.splice(num, 1);
            let thrNum = shopsCheck.indexOf(shopsNum);
            if (thrNum != -1) {
                shopsCheck.splice(thrNum, 1);
            }
        } else {
            checkList[shopsNum].push(goodsNum);
            if (checkList[shopsNum].length == cartData[shopsNum].data.length) {
                shopsCheck.push(shopsNum);
            }
        }
        self.setState({
            shopsCheck,
            checkList
        })
    }

    //全部选中
    checkAll() {
        let shopList = this.state.shopsCheck;
        let cartData = this.state.cartData;
        let checkList = this.state.checkList;
        if (shopList.length == cartData.length) {
            shopList = [];
            checkList = checkList.map((item) => {
                return [];
            })
        } else {
            shopList = this.createArr(cartData.length);
            checkList = checkList.map((item, index) => {
                return this.createArr(cartData[index].data.length);
            })
        }
        this.setState({
            shopsCheck: shopList,
            checkList
        })
    }

    //购物车商品提交到订单页面
    orderTo() {
        //console.log('123')
        let checkList = this.state.checkList;
        let cartData = this.state.cartData;
        let Arr = [];

        //获取选中商品
        checkList.forEach(function (item, index) {
            item.forEach(function (xitem, xidx) {
                Arr.push(cartData[index].data[xidx]);

            })
        })

        //存储到 sessionStorage
        sessionStorage.setItem('orderData', JSON.stringify(Arr));

        this.props.history.push('/order');
    }

    //'管理' 按钮动画
    cartEdit(bool, e) {
        if (!bool && this.state.cartData.length) {
            this.refs.cartEdit.style.top = '40px';
            e.target.innerText = '完成';
            this.state.canOrder = false;
            this.setState({
                cartEdit: true
            })
        } else {
            this.refs.cartEdit.style.top = '0';
            e.target.innerText = '管理';
            this.state.canOrder = true;
            this.setState({
                cartEdit: false
            })
        }
    }

    //删除购物车商品
    removeCart() {
        let self = this;

        //提示是否删除
        MessageBox.confirm('是否要删除该商品', '提示', {
            type: 'warning'
        }).then(() => {

            let cartData = self.state.cartData;
            let checkList = self.state.checkList;
            let shopsCheck = self.state.shopsCheck;
            let Arr = [];

            //获取选中
            //console.log(checkList, cartData)
            checkList.forEach(function (item, index) {
                item.forEach(function (xitem, xidx) {
                    Arr.push(cartData[index].data[xidx].cartId);
                    cartData[index].data[xidx] = null;
                })
            })

            //删除数据
            for (let i = 0; i < cartData.length; i++) {
                for (let j = 0; j < cartData[i].data.length; j++) {
                    if (cartData[i].data[j] == null) {
                        cartData[i].data.splice(j, 1);
                        j--;
                    }
                }
                if (!cartData[i].data.length) {
                    cartData.splice(i, 1);
                    i--;
                }
            }

            //置空
            checkList = [];
            for (let i = 0; i < cartData.length; i++) {
                let arr = [];
                checkList.push(arr);
            }
            shopsCheck = [];

            //删除数据
            $.post(serverUrl + 'remove', {
                tableName: 'cart',
                target: {
                    type: 'in',
                    tSearch: [{
                        cartId: Arr
                    }]
                }
            }, function (res) {
                if (res.status) {
                    Message({
                        type: 'success',
                        message: '商品删除成功'
                    })
                    //更新 state
                    self.setState({
                        cartData,
                        checkList,
                        shopsCheck
                    })
                }
            })

        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消删除'
            });
            return;
        });

    }

    //提交收藏
    colletionTo() {
        let self = this;
        let cartData = this.state.cartData;
        let checkList = this.state.checkList;
        let shopsCheck = this.state.shopsCheck;
        let ArrData = [];
        let Arr = [];

        //获取选中
        //console.log(checkList, cartData)
        checkList.forEach(function (item, index) {
            item.forEach(function (xitem, xidx) {
                ArrData.push(cartData[index].data[xidx].cartId);
                Arr.push(cartData[index].data[xidx]);
                cartData[index].data[xidx] = null;
            })
        })

        //删除数据
        for (let i = 0; i < cartData.length; i++) {
            for (let j = 0; j < cartData[i].data.length; j++) {
                if (cartData[i].data[j] == null) {
                    cartData[i].data.splice(j, 1);
                    j--;
                }
            }
            if (!cartData[i].data.length) {
                cartData.splice(i, 1);
                i--;
            }
        }

        //置空
        checkList = [];
        for (let i = 0; i < cartData.length; i++) {
            let arr = [];
            checkList.push(arr);
        }
        shopsCheck = [];
        //console.log(cartData, checkList);

        //转到collection
        Arr.forEach((item, idx) => {
            $.post(serverUrl + 'insert', {
                tableName: 'collection',
                data: {
                    userId: cookie.get('userId'),
                    goodsImg: item.goodsImg,
                    goodsTitle: item.goodsTitle,
                    goodsPrice: item.goodsPrice,

                }
            }, function (res) {
                Message({
                    type: 'success',
                    message: '该商品已经移到收藏夹'
                })
            })
        })

        //删除数据
        $.post(serverUrl + 'remove', {
            tableName: 'cart',
            target: {
                type: 'in',
                tSearch: [{
                    cartId: ArrData
                }]
            }
        }, function (res) {
            console.log(res)
        })
        //修改 state
        self.setState({
            cartData,
            checkList,
            shopsCheck
        })

    }

    //订单提交确认
    orderCanBeSend() {
        let checkList = this.state.checkList;
        let hasgoods = checkList.some(function (item, idx) {
            return item.length > 0;
        })

        if (hasgoods && this.state.canOrder) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        return (
            <div id="cart">
                <div className="cart-header">
                    <i className="el-icon-arrow-left left" onClick={() => { this.props.history.go(-1) }}></i>
                    <p>购物车</p>
                    <span className="right" onClick={(e) => { this.cartEdit(this.state.cartEdit, e) }}>管理</span>
                </div>
                <div className="cartEdit" ref="cartEdit">
                    <span onClick={() => { this.state.cartData.length && this.removeCart() }}>删除</span>
                    <span onClick={() => { this.state.cartData.length && this.colletionTo() }}>移入收藏夹</span>
                </div>
                <div className="addr-area" onClick={() => { this.props.history.push('/personal/personaddress') }}>
                    <i className="iconfont icon-shouhuodizhi left"></i>
                    <p>{this.state.addr}</p>
                    <i className="el-icon-arrow-right right"></i>
                </div>
                <div className="cart-middle">
                    {this.state.cartData.length > 0 ? this.state.cartData.map((ixtem, index) => {

                        return <div className="cart-item" key={ixtem.id}>
                            <div className="cart-shop">
                                <Checkbox checked={this.state.shopsCheck.includes(index)} onChange={() => { this.shopCheck(index) }} />
                                <span className="cart-shop-title">{ixtem.shop}</span>
                            </div>
                            {ixtem.data.map((item, idx) => {
                                //console.log(index)
                                return <div className="cart-goods" key={idx}>
                                    <Checkbox className="goods-checked"
                                        checked={this.state.checkList[index].includes(idx)}
                                        onChange={() => { this.goodsCheck(index, idx) }}
                                    />
                                    <div className="goods-img">
                                        <img src={`./src/assets/img/${item.goodsImg}`} alt="" />
                                    </div>
                                    <div className="title-area">
                                        <p className="goods-title">{item.goodsTitle}</p>
                                        <p>{item.goodsStyle}</p>
                                    </div>
                                    <div className="price-area">
                                        <p>{item.goodsPrice}</p>
                                    </div>
                                    <div className="num-area">
                                        <div className="num-cut" onClick={() => { this.cutNum(index, idx) }}> - </div>
                                        <div className="num-show">
                                            <input type="text" placeholder="1" value={item.goodsNum} onChange={(e) => { this.getDifNum(index, idx, e) }} />
                                        </div>
                                        <div className="num-add" onClick={() => { this.addNum(index, idx) }}> + </div>
                                    </div>
                                </div>
                            })}
                            <div className="total-price">
                                <p>本店合计(含税): <span>{((index) => {
                                    let Arr = this.state.checkList[index];
                                    let shopList = this.state.cartData[index];
                                    let max = Arr.reduce((total, current) => {
                                        return total + parseFloat(shopList.data[current].goodsPrice) * shopList.data[current].goodsNum;
                                    }, 0)
                                    //console.log(max, index)
                                    return max;
                                })(index)}.00</span> </p>
                            </div>
                        </div>
                    }) : (
                            <div className="isempty" ref="empty">
                                <i className="iconfont icon-shouhuodizhi"></i>
                                <p>您还没有添加商品到购物车</p>
                            </div>
                        )}

                    <div className="cart-bottom">
                        <div className="order-left">
                            <Checkbox title="全选"
                                className="left"
                                checked={this.state.shopsCheck.length == this.state.cartData.length}
                                onChange={() => { this.checkAll() }}
                            />
                            <div className="order-left-price right">
                                <p className="o-t-r--price">总价: <span>{(() => {
                                    let Arr = this.state.checkList;
                                    let shopList = this.state.cartData;
                                    let max = Arr.reduce((total, current, index) => {
                                        let num = current.reduce((xtotal, xcurrent) => {
                                            let data = shopList[index].data;
                                            return xtotal + parseFloat(data[xcurrent].goodsPrice) * data[xcurrent].goodsNum;
                                        }, 0)
                                        return total + num;
                                    }, 0)
                                    return max;
                                })()}.00</span> </p>
                                <p>(含关税:￥0.00，不含运费)</p>
                            </div>
                        </div>
                        <div className="order-right" ref="orderBtn">
                            <p onClick={() => { this.orderCanBeSend() && this.orderTo() }}>去结算(<span>{(() => {
                                let Arr = this.state.checkList;
                                let max = Arr.reduce((total, current) => {
                                    return total + current.length
                                }, 0)
                                return max;
                            })()}</span>)</p>
                        </div>
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

export default connect(mapStateToProps, CartAction)(LoginComponent);
