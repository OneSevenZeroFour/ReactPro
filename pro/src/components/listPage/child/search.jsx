import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as ListAction from '../listAction';

const Xiaoxiaoyuan = styled.div`
  @font-face {
    font-family: iconglobal;
    src: url(//s3.bbgstatic.com/gshop/fonts/global/iconfont.eot?v=3cab49f4d3dde039);
    src: url(//s3.bbgstatic.com/gshop/fonts/global/iconfont.eot?v=3cab49f4d3dde039#iefix) format("embedded-opentype"), url(//s3.bbgstatic.com/gshop/fonts/global/iconfont.woff?v=b1ceac1526bf36fd) format("woff"), url(//s3.bbgstatic.com/gshop/fonts/global/iconfont.ttf?v=0262e14eb955a522) format("truetype"), url(//s3.bbgstatic.com/gshop/fonts/global/iconfont.svg?v=43ba1cfecea295ef) format("svg")
  }
  .iconfont, .iconglobal {
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: .2px;
    -moz-osx-font-smoothing: grayscale
  }
  .iconglobal {
    font-family: iconglobal
  }
  overflow:hidden;
  padding:10px 0;
  position: fixed;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
 .left{dispaly:block;height:30px;width:12%;font-size:20px;text-align:center;line-height:30px;float:left;}
 div{width:76%;height:30px;float:left;}
 div form{overflow:hidden;border:1px solid #ddd;border-radius:15px }
 div form input{width:80%;height:28px;float:left;border:none;text-indent:20px;}
 div form button{width:20%;height:28px;float:left;border:none;background:none;line-height:28px;text-align:center;}
 .right{dispaly:block;height:30px;width:12%;font-size:26px;text-align:center;line-height:30px;float:left;}
`

class Ysearch extends React.Component {
    constructor(props) {
        super(props);
        var othis = this
        this.search = function (event) {
            $('.box')[0].scrollTop = 0;
            var val = $(event.target).siblings('input').val();
            window.location.href = "http://localhost:3000/?#/listpage?id="+val
            othis.props.login({
                type: 'getlist',
                data: val,
                id: 0
            })
        }
    }
    render() {
        return (
            <Xiaoxiaoyuan>
                <a className='iconglobal left' onClick={function () {
                    window.history.go(-1)
                }}></a>
                <div>
                    <form>
                        <input type='text' />
                        <button className='iconglobal' onClick={this.search}></button>
                    </form>
                </div>
                <a href='http://localhost:3000/#/home/hot' className='iconglobal right'></a>
            </Xiaoxiaoyuan>
        )
    }
}

export default connect((state) => {
    return state.ListPage;
}, ListAction)(Ysearch)
