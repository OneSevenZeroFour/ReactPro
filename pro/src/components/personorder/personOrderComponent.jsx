import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as personOrderAction from './personOrderAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message } from 'element-react';

import './personorder.scss';

const style = {
    left: '0'
}

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stylech: '1',
            icon: ['icon-dingdan', 'icon-qianbao', 'icon-daifahuo', 'icon-0068'],
            title: [
                '您还没有下过订单。赶紧去购买商品感受急速的物流体验吧',
                '您目前还没有未付款的订单',
                '您目前还没有待发货的订单',
                '您目前还没有待收货的订单'
            ]
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)

    }
    componentDidMount() {
        //colorlink.style
        this.refs.colorlink.style.left = this.props.match.params.id * 25 + '%';
        //change stylech
        this.setState({
            stylech: this.props.match.params.id
        })

        if(true){
            document.documentElement.style.background = '#dfdfdf';
        }

    }
    orderList(num) {
        //colorlink.style
        this.refs.colorlink.style.left = num * 25 + '%';

        //isempty.style
        this.setState({
            stylech: num
        })
        console.log(this.state)
    }
    render() {
        return (
            <div id="personorder">
                <div className="header">
                    <i className="el-icon-arrow-left" onClick={()=>{this.props.history.go(-1)}}></i>
                    <p>全部订单</p>
                </div>
                <div className="order-middle">
                    <ul>
                        <li onClick={() => { this.orderList('0') }}>
                            <p>全部</p>
                        </li>
                        <li onClick={() => { this.orderList('1') }}>
                            <p>待付款</p>
                            <span>0</span>
                        </li>
                        <li onClick={() => { this.orderList('2') }}>
                            <p>待发货</p>
                            <span>0</span>
                        </li>
                        <li onClick={() => { this.orderList('3') }}>
                            <p>待收货</p>
                            <span>0</span>
                        </li>
                    </ul>
                    <div className="colorlink" ref="colorlink" style={style}></div>
                </div>
                <div className="order-list">
                    <div className="isempty">
                        <i className={'iconfont ' + this.state.icon[this.state.stylech]}></i>
                        <p>{this.state.title[this.state.stylech]}</p>
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

export default connect(mapStateToProps, personOrderAction)(LoginComponent);
