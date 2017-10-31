import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as ListAction from '../listAction';

const Xiaoxiaoyuan = styled.div `
  .box{overflow: auto;}
  .last{width:100%;height:50px ;text-align: center;line-height: 50px;font-size: 16px;}
  dl{width:100%;overflow:hidden;padding:5px;}
  dl dt{width:30%;float:left;}
  dl dt img{width:100%}
  dl dd{width:68%;float:left;padding-left:10px;}
  dl dd span{font-size:12px;margin: 10px 0;margin-left:10px;}
  dl dd h5{font-size:14px;line-height:16px;height:32px;overflow:hidden;text-overflow:ellipsis;}
  dl dd p{font-size:16px;line-height:16px;margin-top:20px}
  dl dd p i{margin-left:10px;font-size:14px;text-decoration:line-through;}
  dl dd p strong{color:#f03468}
  dl dd p .xl{font-size:14px;float:right;margin-right:20px;}
  .box h6{line-height:40px;border-bottom: 1px solid #e5e5e5;background-color: #f8f8f8;text-indent: 5%;font-size:14px;}
  .box li{border-bottom: 1px solid #e5e5e5;line-height:40px;text-indent: 5%;font-size:16px;}
  .box li span{float: left;text-align: center;display: block;text-indent:0;}
  .box li input{height:30px;width: 20%;float: left;margin-top: 5px;line-height: 30px;display: block;border: 1px solid #999;font-size:14px;}
  .box li button{height:30px; background: #fff;border: 1px solid #f03468;margin-left: 5%;width: 20%;float: left;margin-top: 5px;line-height: 30px;}
`

class Ylist extends React.Component {
	constructor(props) {
		super(props);
		var othis = this;
		this.sx = function(num1, num2) {
			var wee = othis.state.zhi;
			var data1 = [];
			var wee3 = [];
			for(var i = 0; i < wee.length; i++) {
				wee3.push(wee[i])
			}
			for(var i = 0; i < wee3.length; i++) {
				if(wee3[i].price > num1 && wee3[i].price <= num2) {
					data1.push(wee3[i])
				}
			}
			var htmll = data1.map(function(item, index) {
				if(item.marketPrice) {
					var ttt = '<i>￥:' + item.marketPrice + '</i>'
				} else {
					var ttt = ''
				}
				return `<dl key=${index}>
            <dt>
              <img src=${item.imageUrls[0]} />
            </dt>
            <dd>
              <span>${item.originPlace}</span>
              <h5>${item.title}</h5>
              <p><strong>￥:${item.appPrice}</strong>
              ${ttt}
              <span className='xl'>销量：${item.saleCount}</span></p>
            </dd>
          </dl>`
			}).join('')
			$('.box ul').html(htmll)
		};
		this.id = 1;
		this.arrr = [];
		this.url = ''
		this.ajax = function() {
			if(this.url != encodeURI(this.props.data)) {
				this.arrr = [];
			}
			this.url = encodeURI(this.props.data);
			//console.log(this.props.data)
			var url = 'http://120.76.205.241:8000/product/yunhou?pageToken=' + this.id + '&kw=' + this.url + '&apikey=0pIHTJsKOryjKEHwKgzrsGxVunZa6EpqK3zEPag5zjdwZVUI8iYJLyd6iNd4NnL3'
			// console.log(url)
			$.ajax({
				type: "get",
				url: "http://localhost:8000/sendProxy",
				data: {
					proxy: url
				},
				success: function(data) {
					if(data.data.data) {
						$('.last').css('display', 'none')
						othis.id++
							for(var i = 0; i < data.data.data.length; i++) {
								othis.arrr.push(data.data.data[i])
							}
						othis.setState({
							zhi: othis.arrr,
						})
					} else {
						$('.last').text('没有更多商品了')
					}
				}
			})
		}
		this.we = null
	}

	componentDidMount() {
		var othis = this;
		//console.log(this.props)
		$('.box').css({
			height: (window.screen.height - 167) + 'px'
		}).on('scroll', function() {
			if(this.scrollTop + this.offsetHeight == this.scrollHeight) {
				$('.last').text('加载中…')
				$('.last').css('display', 'block')
				othis.ajax()
			}
		})
	}
	componentDidUpdate() {
		if(this.props.data != this.we) {
			this.id = 1;
			this.ajax()
			this.we = this.props.data
		}
	}
	render() {
		return(
			<Xiaoxiaoyuan>
                <div className='box'>{(function (xthis) {
                    console.log(xthis.props)
                    if (xthis.props.data != undefined) {
                        if (xthis.state) {
                            var data = [];
                            if (xthis.props.id == 0) {
                                data = xthis.state.zhi
                            } else if (xthis.props.id == 1) {
                                var asd2 = xthis.state.zhi
                                var ddd = null
                                var asd = [];
                                for (var i = 0; i < asd2.length; i++) {
                                    asd.push(asd2[i])
                                }
                                if (xthis.props.II % 2 != 0) {
                                    for (var i = 0; i < asd.length; i++) {
                                        for (var j = (i + 1); j < asd.length; j++) {
                                            if (asd[i].price > asd[j].price) {
                                                ddd = asd[i]
                                                asd[i] = asd[j]
                                                asd[j] = ddd
                                            }
                                        }
                                    }
                                } else {
                                    for (var i = 0; i < asd.length; i++) {
                                        for (var j = (i + 1); j < asd.length; j++) {
                                            if (asd[i].price < asd[j].price) {
                                                ddd = asd[i]
                                                asd[i] = asd[j]
                                                asd[j] = ddd
                                            }
                                        }
                                    }
                                }
                                data = asd
                            } else if (xthis.props.id == 2) {
                                var bbb = xthis.state.zhi
                                var aaa = null
                                var ccc = [];
                                for (var i = 0; i < bbb.length; i++) {
                                    ccc.push(bbb[i])
                                }
                                if (xthis.props.II % 2 == 0) {
                                    for (var i = 0; i < ccc.length; i++) {
                                        for (var j = (i + 1); j < ccc.length; j++) {
                                            if (ccc[i].saleCount > ccc[j].saleCount) {
                                                ddd = ccc[i]
                                                ccc[i] = ccc[j]
                                                ccc[j] = ddd
                                            }
                                        }
                                    }
                                } else {
                                    for (var i = 0; i < ccc.length; i++) {
                                        for (var j = (i + 1); j < ccc.length; j++) {
                                            if (ccc[i].saleCount < ccc[j].saleCount) {
                                                ddd = ccc[i]
                                                ccc[i] = ccc[j]
                                                ccc[j] = ddd
                                            }
                                        }
                                    }
                                }
                                data = ccc
                            } else if (xthis.props.id == 3) {
                                $('.box').on('click','li',function(){
                    if(this.id == 1){
                      xthis.sx(0,100)
                    }else if(this.id == 2){
                      xthis.sx(100,300)
                    }else if(this.id == 3){
                      xthis.sx(300,600)
                    }else if(this.id == 4){
                      xthis.sx(600,1200)
                    }else if(this.id == 5){
                      xthis.sx(1200,99999999)
                    }
                  })
                  return <ul>
                    <h6>价格筛选</h6>
                    <li id={1}>100以下</li>
                    <li id={2}>100-300</li>
                    <li id={3}>300-600</li>
                    <li id={4}>600-1200</li>
                    <li id={5}>1200以上</li>
                  </ul>
                            }
                            var html = data.map(function (item, index) {
                                return <dl key={index}>
                                    <dt>
                                        <img src={item.imageUrls[0]} />
                                    </dt>
                                    <dd>
                                        <span>{item.originPlace}</span>
                                        <h5>{item.title}</h5>
                                        <p><strong>￥:{item.appPrice}</strong>{(function (xthis) {
                                            if (item.marketPrice) {
                                                return <i>￥:{item.marketPrice}</i>
                                            }
                                        })(this)}<span className='xl'>销量：{item.saleCount}</span></p>
                                    </dd>
                                </dl>
                            })
                            return html
                        }
                    }
                })(this)}{(function (xthis) {
                    if (xthis.props.id != 4) {
                        return <dl className="last">加载中…</dl>
                    }
                })(this)}
                </div>
            </Xiaoxiaoyuan>
		)
	}
}

export default connect((state) => {
	return state.ListPage;
}, ListAction)(Ylist)