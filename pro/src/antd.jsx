import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        this.data = [{
            title: "热门",
            urlTo: "/home/hot",
            icon: "home",
            now: "/home"
        }, {
            title:"分类",
            urlTo:"/classify",
            icon:"appstore",
            now:"/classify"
        }, {
            title: "购物车",
            urlTo: "/buycart",
            icon: "buycart",
            now: "/buycart"
        }, {
            title: "我的",
            urlTo: "/personal",
            icon: "user",
            now: "/personal"
        }]
        this.state = {
            currentIndex: 0
        }
        this.changeNum = (index) => {
            console.log(index)
            this.setState({ currentIndex: index })
            console.log(this.state.currentIndex)

        }
    }
    componentWillMount() {
        var num = 0;
        var currentNum = window.location.href
        this.data.map(function (item, index) {
            console.log(currentNum.indexOf(item.urlTo), index)
            if (currentNum.indexOf(item.urlTo) > 0) {
                this.setState({ currentIndex: index })
            }
        }.bind(this))
    }
    render() {
        return (<Row>
            {this.data.map(function (item, index) {
                return <Col span={6} onClick={this.changeNum.bind(this, index)} key={index}>
                    <Link to={item.urlTo} className={this.state.currentIndex == index ? 'active' : ""} >
                        <Icon type={item.icon} />{item.title}</Link>
                </Col>
            }.bind(this))}
        </Row>)
    }

}

export default Main;
