import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import {connect} from 'react-redux';
import Ylist from './list.jsx';

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
  .yhedaer{background:#f8f8f8;border-bottom: 1px solid #dfdfdf;overflow:hidden;position: fixed;width: 100%;}
  .yhedaer a{display:block;float:left;width:25%;line-height:40px;font-size:14px}
  .yhedaer a i{font-size:13px;margin-left:10%}
  .yhedaer .bx{color: #f03468;}
  .yhedaer .bx:after{display: block;content: "";width: 70%;  margin: 0 auto;border-bottom: 2px solid #f03468;}
`

class Ytitle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tlite:[{
        tlite:'默认',
        id:0
      },{
        tlite:'价格',
        id:1
      },{
        tlite:'销量',
        id:2
      },{
        tlite:'筛选',
        id:3
      }]
    }
  }
  componentDidMount(){
    $('.yhedaer a').eq(0).addClass('bx');
    var id = window.location.hash.split('=')[1];
    this.props.dispatch({
      type:'getlist',
      data:id,
      id:0
    })
  }
  render(){
    return(
      <Xiaoxiaoyuan>
          <div class='yhedaer'>{
            (function(xthis){
              var othis = xthis;
              var i = 0;
              var ii = 0;
              var html = othis.state.tlite.map(function(item,index){
                return  <a key={index} onClick={function(event){
                  $(event.target).addClass('bx').siblings('a').removeClass('bx');
                  $('.box')[0].scrollTop = 0
                  var id = window.location.hash.split('=')[1];
                  if(index == 1){
                    i++;
                    if(i%2 == 0){
                      $(event.target).html("价格<i class = 'iconglobal'></i>")
                    }else{
                      $(event.target).html("价格<i class = 'iconglobal'></i>")
                    }
                    othis.props.dispatch({
                      type:'getlist',
                      data:id,
                      id:index,
                      II:i
                    })
                  }else{
                    i = 0;
                    $(event.target).parent().children('a').eq(1).children('i').remove()
                  }
                  if(index == 2){
                    ii++;
                    if(ii%2 == 0){
                      $(event.target).html("销量<i class = 'iconglobal'></i>")
                    }else{
                      $(event.target).html("销量<i class = 'iconglobal'></i>")
                    }
                    othis.props.dispatch({
                      type:'getlist',
                      data:id,
                      id:index,
                      II:ii
                    })
                  }else{
                    ii = 0;
                    $(event.target).parent().children('a').eq(2).children('i').remove()
                  }
                  if(index == 3 ||index == 0){
                    othis.props.dispatch({
                      type:'getlist',
                      data:id,
                      id:index
                    })
                  }
                }}>{item.tlite}</a>
              })
              return html
            })(this)
          }</div>
          <div style={{width:"100%",height:'44px'}}></div>
          <Ylist />
      </Xiaoxiaoyuan>
    )
  }
}

export default connect()(Ytitle)
