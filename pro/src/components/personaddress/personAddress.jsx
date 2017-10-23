import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PersonAddressAction from './personAddressAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message } from 'element-react';

import './personAddress.scss';


class LoginComponent extends Component {
    constructor(props) {
        super(props);
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
    render() {
        return (
            <div id="personAddress">
                <div className="header">
                    <i className="el-icon-arrow-left" onClick={() => { this.props.history.go(-1) }}></i>
                    <p>收货地址</p>
                </div>
                <div className="num-info">已有<span> 0 </span>条收货地址（最多添加10条）</div>
                <div className="address-list">
                    <div className="isempty">
                        <i className="iconfont icon-shouhuodizhi"></i>
                        <p>您还没有添加收货地址</p>
                    </div>
                    <div className="add-area">
                        <Button type="primary" className="add-btn">添加地址</Button>
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
