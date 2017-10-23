//import React,{Component} from 'react';
////import Swiper from 'react-native-swiper';
//import {
//AppRegistry,
//StyleSheet,
//Text,
//View
//} from 'react-native';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import Swiper  from 'react-native-swiper'  //引入第三方插件
 class slideshow extends Component {
    render() {
        return (
            <Swiper height={200}
                    paginationStyle={{bottom: 10, left: 270}}
                    autoplay={true}
                    autoplayTimeout={5}
                    dot={
                    <View style={{
                        width: 4,
                        height: 4,
                        backgroundColor: 'white',
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3
                    }}>
                    </View>
                    }
                    activeDot={
                    <View style={{
                        width: 4,
                        height: 4,
                        backgroundColor: 'red',
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3
                    }}>
                    </View>
                    }
            >

                {/*{this.renderImg()}*/}
                {this.props.item.map((x) => {
                    return (
                        <View key={x.home_image} style={{flex: 1}}>
                            <TouchableHighlight style={{flex: 1}}
                                                onPress={() => {
                                                    this._onSlideShowClick(x)
                                                }
                                                }>    //图片点击事件
                                <Image
                                    style={{flex: 1}}
                                    source={{uri: x.home_image}}
                                >
                                    <View style={{
                                        backgroundColor: 'rgba(0,0,0,0.4)',
                                        position: 'absolute',
                                        bottom: 0,
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={{padding: 5, color: '#fff', flex: 1}} numberOfLines={1}>
                                            {x.title}
                                        </Text>
                                    </View>
                                </Image>
                            </TouchableHighlight>
                        </View>
                    )
                })
                }
            </Swiper>
        );
    }

    _onSlideShowClick(x) {
        console.log(x.title)
    }


//博主的方法
    // renderImg(){
    //    var imageViews=[];
    //    for(var i=0;i<this.props.item.length;i++){
    //        imageViews.push(
    //
    //            <Image
    //                key={i}
    //                style={{flex:1}}
    //                source={{uri:this.images[i]}}
    //            >
    //                <View style={{backgroundColor:'rgba(0,0,0,0.4)',position:'absolute',bottom:0,flex:1,flexDirection:'row'}}>
    //                    <Text style={{padding:5,color:'#fff',flex:1}} numberOfLines={1}>
    //                        {this.props.item[i].title}
    //                    </Text>
    //                </View>
    //            </Image>
    //        );
    //    }
    //    return imageViews;
    // }

}
//class Siwper extends Component {
//	constructor(props){
//		super(props);
//	}
//	 renderImg(){ 
////	 		var images=['../../assets/images/banner1.jpeg','../../assets/images/banner1.jpeg','../../assets/images/banner1.jpeg']
//          var imageViews=[];  
//          for(var i=0;i<images.length;i++){  
//              imageViews.push(  
//                  <Image  
//                      key={i}  
//                      style={{flex:1}}  
//                      source={{uri:images[i]}}  
//                      />  
//              );  
//          }  
//          imageViews.push(<Text>lalala</Text>);  
//          return imageViews;  
//      }
//	  render(){  
//    return(  
//        <View>  
//          <Swiper height={200}  
//                  loop={true}  
//                  // showsButtons={true}  
//                  index={0}  
//                  autoplay={true}  
//                  horizontal={false}  
//                  >  
//               {this.renderImg()}  
//  轮播图的元素可以是任意空间 这里添加一组图片+文字(Text)会依次显示<span style="white-space:pre">    </span>  
//           </Swiper>  
//        </View>  
//
//    );  
//  }
//}
export default slideshow;
  

   