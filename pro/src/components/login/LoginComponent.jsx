import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loginAction from './LoginAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message } from 'element-react';
import $ from 'jquery';

import './login.scss';
import {cookie} from '../../util/cookie';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
    }

   
    componentDidMount(){
        //console.log($('.ant-layout-footer'))
        $('.ant-layout-footer').css({display:'none'})
        //console.log('123')
    }
    componentWillUnmount(){
        $('.ant-layout-footer').css({display:'block'})
    }
    componentWillReceiveProps(nextProps) {
        //console.log(this.props, nextProps)
        if (nextProps.data.status) {
            Message({
                type: 'success',
                message: '登录成功'
            })
            console.log(nextProps.data.data[0])
            cookie.set({
                name: 'userId',
                val: nextProps.data.data[0].userId
            })
            
            nextProps.history.push('/');
        }else{
            Message({
                type: 'warning',
                message: nextProps.data.msg
            })
        }
    }
    toRegister() {
        this.props.history.push('/register');
    }
    backTo() {
        this.props.history.push('/');
    }
    loginAction() {

        let eleReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        let emailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        let obj = {};
        if (eleReg.test(this.refs.username.value)) {
            obj.elephone = this.refs.username.value;

        } else if (emailReg.test(this.refs.username.value)) {
            obj.email = this.refs.username.value;

        } else {
            Message({
                type: 'warning',
                message: '你输入的用户名不正确'
            })
            return;
        }
        if (!this.refs.password.value) {
            Message({
                type: 'warning',
                message: '密码不能为空'
            })
            return;
        }
        obj.password = this.refs.password.value;

        this.props.login(obj);
    }
    render() {
        return (
            <div id="login">
                <div className="header">
                    <i className="el-icon-arrow-left" onClick={this.backTo.bind(this)}></i>
                    <span onClick={this.toRegister.bind(this)}>快速注册</span>
                </div>
                <div className="login-img">
                    <img src="./src/assets/img/login.png" alt="" />
                </div>
                <div className="main">
                    <div className="username-area area">
                        <i className="iconfont icon-user"></i>
                        <input type="text" placeholder="请输入手机号或email" ref="username" />
                    </div>
                    <div className="password-area area">
                        <i className="iconfont icon-mima"></i>
                        <input type="text" placeholder="请输入密码" ref="password" />
                    </div>
                    <div className="button-area">
                        <Button type="primary" className="login-btn" onClick={this.loginAction.bind(this)}>登录</Button>
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

export default connect(mapStateToProps, loginAction)(LoginComponent);
