import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as loginAction from './LoginAction';
import SpinnerComponent from '../spinner/SpinnerComponent';

class LoginComponent extends Component {
	constructor(props) {
		super(props);
	}

	loginHandler() {
        //发出请求 获取数据 渲染页面 component => login() => midlleware 
        console.log('component')
        this.props.login(this.refs.username.value, this.refs.password.value)
        this.props.sendData(this.refs.username.value)

    }
    componentWillReceiveProps(){
        //console.log('123')
        //console.log(this.props)
    }
	render() {
		return (
			<div id="login">
				<ul>
					<li><input type="text" ref='username' /></li>
					<li><input type="text" ref='password' /></li>
					<li><input type="text" placeholder="123"/></li>
                    <p>{this.props.data & console.log(this.props)}</p>
                    <p>3</p>
                 
					<li><input type="button" value='登录' onClick={this.loginHandler.bind(this)} /></li>
					
				</ul>
				<SpinnerComponent />
			</div>
		)
    }
    
}

const mapStateToProps = function(state){
    //console.log(state); this.props
    return {
        data: state.Login.data
    }
}

export default connect(mapStateToProps, loginAction)(LoginComponent);
