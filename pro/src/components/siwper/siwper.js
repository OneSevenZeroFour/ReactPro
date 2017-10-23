import React from "react";

import ReactUI from 'rctui';

import {Form}  from 'rctui';
class Child extends React.Component {
  render() {
    return (
    	<Carousel
		  className="string"
		  animation="string"       // one of 'slide|fade', default value is 'slide'
		  indicator={
		    position: 'string',    // one of 'left|center|right', default value is 'center'
		    type: 'string'         // one of 'circle|number', default value is 'circle'
		  }
		  interval={number}        // auto slide interval, default value is undefined
		  style={object}
		>
		  {array}                  // content
		</Carousel>
		<Carousel style={{width: 500, height: 300}}
		  indicator={{position: this.state.position, type: this.state.type}}
		  animation={this.state.animation}
		  interval={5000}>
		  <div style={{background: '#666', display: 'flex'}}>
		    <div style={{fontSize: 40, color: '#fff', display: 'flex', margin: 'auto'}}>
		      Page 1
		    </div>
		  </div>
		  <div style={{background: '#666', display: 'flex'}}>
		    <div style={{fontSize: 40, color: '#fff', display: 'flex', margin: 'auto'}}>
		      Page 2
		    </div>
		  </div>
		  <a href="javascript:;">
		    <img style={{width: '100%', height: '100%'}} src="./images/image1.jpg" />
		  </a>
		</Carousel>
		<div style={{marginTop: 20}}>
		  position:
		  <Select value={this.state.position} data={['left', 'center', 'right']}
		    onChange={position => this.setState({position})} />
		  type:
		  <Select value={this.state.type} data={['circle', 'number']}
		    onChange={type => this.setState({type})} />
		  animation:
		  <Select value={this.state.animation} data={['slide', 'fade']}
		    onChange={animation => this.setState({animation})} />
		</div>
    )
   }
}

export default Child;