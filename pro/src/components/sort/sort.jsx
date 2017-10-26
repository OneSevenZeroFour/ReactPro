import React,{Component} from 'react';
import { Icon,Layout } from 'antd';
const { Header,Content } = Layout;
import $ from "jquery";
import "antd/dist/antd.css";
import '../../../src/assets/css/homeRouter.scss';

class Sort extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeData:"",
            hash:"a",
            //ajaxUrl:"http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=" + hash + "&apikey=QXsvzRZEdtm3JmfD16LWkBk7nB688hrMPhTsJafIzW5b53pJueSAK4iGP4ThzFmi"
        }
        this.getData=(url)=>{
            var self=this;
            console.log(url);
            $.get("http://localhost:8000/sendProxy",
                {proxy:url},
                function(data){
                    console.log(data)
                    //需要的数据
                var listData = data.data.data
                console.log(listData)
                    //设置数据
                self.setState({
                    activeData:listData
                }) 
                
            });
        }
        this.getTitle=(title)=>{
            var self = this;
            console.log(title);
            self.setState({
                hash:title
            }) 
        }
        this.goBack =()=>{
            history.go(-1);
        }
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        var hashzhi = window.location.hash.slice(7);
        console.log(hashzhi);
        this.getTitle(hashzhi);

        var ajaxUrl = "http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=" + hashzhi + "&apikey=QXsvzRZEdtm3JmfD16LWkBk7nB688hrMPhTsJafIzW5b53pJueSAK4iGP4ThzFmi";
        

        //console.log(this.props.match);
        //var ajaxUrl = this.state.ajaxUrl;
        
        this.getData(ajaxUrl)
    }
    render(){
        
        return (
            <div id="active_page">
                <Layout>
                    <Header>
                         <div className="mod-public-header">
                                <div className="header_icon" onClick={this.goBack}>
                                    <Icon type="left" />
                                </div>
                                <div className="mod-public-header-title">{this.state.hash}</div>
                                <a href="/" className="header_icon">
                                    <Icon type="home" />
                                </a>
                            </div>
                    </Header>
                    <Content>
                        <ul className="active_list">
                        {(function(self){
                            if(self.state.activeData){
                                return self.state.activeData.map(function(item,index){
                            
                                return <li>
                                    <a href="#" className="" data-id={"asdsa"}>
                                        <div className="goods_img">
                                            <img   src={item.imageUrls[0]} />
                                        </div>
                                        <div  >
                                            <div className="goods_into">
                                                    {item.title}
                                            </div>
                                            <div className="goods_price">
                                                <span className="price">
                                                        ￥{item.price}
                                                </span>
                                                <span className="marketprice">
                                                    ￥{item.marketPrice}
                                                </span>
                                            </div>
                                            <span className="buy_btn" >立即购买&gt;</span>
                                        </div>
                                    </a>
                                </li>
                            })
                            }
                        })(this)    
                        }
                        </ul>
                    </Content>


                </Layout>
                
            </div>
        )
    }
}
export default Sort;