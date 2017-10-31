import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                title: "热门",
                urlTo: "/home/hot",
                icon: "home",
                now: "/home"
            }, {
                title: "分类",
                urlTo: "/classify",
                icon: "appstore",
                now: "/classify"
            }, {
                title: "购物车",
                urlTo: "/cart",
                icon: "buycart",
                now: "/cart"
            }, {
                title: "我的",
                urlTo: "/personal",
                icon: "user",
                now: "/personal"
            }],
            currentIndex: 0
        }
        this.changeNum = (index) => {
            this.setState({ currentIndex: index })
        }
    }
    componentWillReceiveProps(nextProps) {
        var self = this;
        var data = this.state.data;
        //console.log(nextProps.location)
       
        data.forEach(function (item, index) {
            //console.log(nextProps.location.pathname)
            if (nextProps.location.pathname == item.urlTo) {
                self.setState({ currentIndex: index })
            }
        })
    }
    render() {
        return (<Row>
            {this.state.data.map(function (item, index) {
                return <Col span={6} onClick={this.changeNum.bind(this, index)} key={index}>
                    <Link to={item.urlTo} className={this.state.currentIndex == index ? 'active' : ""} >
                        <Icon type={item.icon} />{item.title}</Link>
                </Col>
            }.bind(this))}
        </Row>)
    }

}

export default Main;
