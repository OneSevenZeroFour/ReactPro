import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as RegisterAction from './RegisterAction.js';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message } from 'element-react';

import './register.scss';
import { cookie } from '../../util/cookie';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //console.log($('.ant-layout-footer'))
        $('.ant-layout-footer').css({ display: 'none' })
        //console.log('123')
    }
    componentWillUnmount() {
        $('.ant-layout-footer').css({ display: 'block' })
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
        if (nextProps.data.status) {
            Message({
                type: 'success',
                message: '注册成功'
            })
            console.log(nextProps.data)
            cookie.set({
                name: 'userId',
                val: nextProps.data.data.userId
            })
            setTimeout(function () {
                nextProps.history.push('/');
            }, 1000)

        } else {
            Message({
                type: 'warning',
                message: nextProps.data.msg
            })
        }
    }
    toRegister() {
        this.props.history.push('/login');
    }
    backTo() {
        this.props.history.push('/');
    }
    loginAction() {

        var eleReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        var pwdReg = /^[a-z0-9_-]{6,12}$/i;
        if (!eleReg.test(this.refs.username.value)) {
            Message({
                type: 'warning',
                message: '你输入的手机号格式不正确'
            })
            return;
        } else if (this.refs.password.value != this.refs.pwd.value) {
            Message({
                type: 'warning',
                message: '你输入的两次密码不一致'
            })
            return;
        } else if (!pwdReg.test(this.refs.password.value)) {
            Message({
                type: 'warning',
                message: '密码必须是 6-12 位数字字母组成'
            })
            return;
        }
        let obj = {
            elephone: this.refs.username.value,
            password: this.refs.password.value
        }

        //this.$store.dispatch('register/register', obj);
        //console.log(obj)
        this.props.register(obj);
    }
    render() {
        return (
            <div id="register">
                <div className="header">
                    <i className="el-icon-arrow-left" onClick={this.backTo.bind(this)}></i>
                    <span onClick={this.toRegister.bind(this)}>返回登录</span>
                </div>
                <div className="login-img">
                    <img src="./src/assets/img/login.png" alt="" />
                </div>
                <div className="main">
                    <div className="username-area area">
                        <i className="iconfont icon-user"></i>
                        <input type="text" placeholder="请输入注册手机号" ref="username" />
                    </div>
                    <div className="password-area area">
                        <i className="iconfont icon-mima"></i>
                        <input type="text" placeholder="请输入密码" ref="password" />
                    </div>
                    <div className="password-area area">
                        <i className="iconfont icon-mima"></i>
                        <input type="text" placeholder="请再次输入密码" ref="pwd" />
                    </div>
                    <div className="button-area">
                        <Button type="primary" className="login-btn" onClick={this.loginAction.bind(this)}>注册</Button>
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

export default connect(mapStateToProps, RegisterAction)(LoginComponent);
