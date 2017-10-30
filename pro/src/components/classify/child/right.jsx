import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import {connect} from 'react-redux';

const Xiaoxiaoyuan = styled.div`
  width: 75%;
  float: right;
  .right{
    overflow:auto;
    padding-left: 20px;
  }
  dl{margin:10px 0;overflow:hidden}
  dl dt{color:#f03468;font-size:14px;margin-bottom:10px;background:#f8f8f8;line-height:30px;width:100%}
  dl dd{width:33%;float:left;}
  dl dd a{display:block;width:80%;line-height:26px;text-align:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
`

class Yright extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount (){

    $('.right').css({
      height:(window.screen.height-73)+'px'
    })
  }
  render(){
    return(
      <Xiaoxiaoyuan>
        <div class='right'>
          {(function(self){
            var othis = self;
            var html = self.props.data.data.map(function(item,index){
              return <dl key={index} class='.dl'>
                <dt>{item.title}</dt>
                {
                  item.data.map(function(i,num){
                    return <dd key={num}>
                      <a href={"#/listpage?id="+i}>{i}</a>
                    </dd>
                  })
                }
              </dl>
            })
            return html
          })(this)}
        </div>
      </Xiaoxiaoyuan>
    )
  }
}

export default connect((state) => {
  return state
})(Yright)
