import React,{Component} from 'react';

import logo from '../../assets/img/logo.png';

class Demo extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<img src={logo} alt=""/>
				<div>123</div>
			</div>
		)
	}
}

export default Demo;