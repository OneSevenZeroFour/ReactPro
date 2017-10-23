import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AddAddressAction from './addAddressAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message } from 'element-react';

import './addAddress.scss';


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
                    <p>新建收货地址</p>
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
