import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as CollectionAction from './collectionAction';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { Button, Message, MessageBox } from 'element-react';
import $ from 'jquery';

import './collection.scss';
import { serverUrl } from '../../util/base';
import { cookie } from '../../util/cookie';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectData: []
        }
    }
  
    componentWillUnmount(){
        $('.ant-layout-footer').css({display:'block'})
    }
    componentDidMount() {
        $('.ant-layout-footer').css({display:'none'})
        let self = this;

        if (!cookie.get('userId')) {
            MessageBox.msgbox({
                title: '提示',
                message: '您尚未登录，请返回登录',
                showCancelButton: false
            }).then(action => {
                self.props.history.push('/login');
            })
        }

        $.post(serverUrl + 'select', {
            tableName: 'collection',
            target: {
                type: 'default',
                tSearch: [{
                    userId: cookie.get('userId')
                }]
            }
        }, function (res) {
            if (res.status) {
                self.setState({
                    collectData: res.data
                })
            }
        })


    }
    orderList(num) {

        this.refs.colorlink.style.left = num * 50 + '%';
    }
    removeCol(index, id) {
        let self = this;

        MessageBox.confirm('是否要取消收藏?', '提示', {
            type: 'warning'
        }).then(() => {
            
            let collectData = self.state.collectData;
            collectData.splice(index, 1);

            $.post(serverUrl + 'remove', {
                tableName: 'collection',
                target: {
                    type: 'default',
                    tSearch: [{
                        userId: cookie.get('userId'),
                        collectId: id
                    }]
                }
            }, function (res) {
                if (res.status) {
                    Message({
                        type: 'success',
                        message: '取消收藏成功'
                    })
                    self.setState({
                        collectData
                    })
                }
            })

        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消删除'
            });
        });

    }
    render() {
        return (
            <div id="collection">
                <div className="header">
                    <i className="el-icon-arrow-left" onClick={() => { this.props.history.go(-1) }}></i>
                    <p>我的收藏</p>
                </div>
                <div className="order-middle">
                    <ul>
                        <li onClick={() => { this.orderList('0') }}>
                            <p>店铺收藏</p>
                        </li>
                        <li onClick={() => { this.orderList('1') }}>
                            <p>商家收藏</p>
                        </li>
                    </ul>
                    <div className="colorlink" ref="colorlink"></div>
                </div>
                <div className="collection-bottom">
                    <ul>
                        {this.state.collectData.length > 0 ? this.state.collectData.map((item, index) => {
                            return <li key={index}>
                                <div className="img-area">
                                    <img src={`./src/assets/img/${item.goodsImg}`} alt="" />
                                </div>
                                <div className="title-area">
                                    <p>{item.goodsTitle}</p>
                                </div>
                                <div className="price-area">
                                    <p>{item.goodsPrice}</p>
                                    <button className="col-btn" onClick={() => { this.removeCol(index, item.collectId) }}>取消收藏</button>
                                </div>
                            </li>
                        }) : (
                                <div className="isempty" ref="empty">
                                    <i className="iconfont icon-shouhuodizhi"></i>
                                    <p>您还没有收藏</p>
                                </div>
                            )}

                    </ul>
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

export default connect(mapStateToProps, CollectionAction)(LoginComponent);
