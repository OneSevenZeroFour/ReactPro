import React from 'react';
import styled from 'styled-components';
import Yright from './right.jsx';
import $ from 'jquery';
import {connect} from 'react-redux';

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
  margin:0;
  padding: 0;
  .left{width:25%;float:left;overflow:auto}
  .left ul{}
  .left ul li{padding:0 5px;background:#f2f2f2;}
  .left ul li .item{padding:22px 0;text-align:center;border-bottom: 2px solid #e5e5e5;}
  .left ul li .item .iconglobal{line-height: 27px;font-size: 27px;display: block;}
  .left ul li .item .name{margin-top:10px;font-size:10px}
  .left ul .ys{background:#fff}
  .left ul li .xb{border-bottom: 2px solid #f03468;}
`

class Yleft extends React.Component {
  constructor(props){
    super(props);
    this.state={
      arr:[{
        title:'全球购',
        id:0,
        img:'',
        data:[{
          title:'婴儿奶粉/辅食',
          data:['pre段','1段','2段','3段','4段','羊奶粉','特殊配方','宝宝辅食']
        },{
          title:'国际护肤',
          data:['面部护理']
        },{
          title:'纸尿裤/湿巾',
          data:['新生儿纸尿裤','S码纸尿裤','M码纸尿裤','L码纸尿裤','拉拉裤','湿巾']
        },{
          title:'彩妆香氛',
          data:['彩妆','香水']
        },{
          title:'宝宝用品',
          data:['安全出行','喂养用品','卫生护理','口腔护理','洗发沐浴','妈咪用品','宝宝书籍']
        },{
          title:'食品保健',
          data:['保健品','进口食品']
        },{
          title:'个人护理',
          data:['洗发护发','女性护理','面部护理','口腔护理']
        },{
          title:'家居日用',
          data:['水杯、保温杯','口罩']
        }]
      },{
        title:'粮油生鲜',
        id:1,
        img:'',
        data:[{
          title:'国产粮油/进口粮油',
          data:['进口油','食用油','进口米面','大米','进口调味','面食','杂粮']
        },{
          title:'卡劵/礼品',
          data:['卡劵']
        },{
          title:'水果/蔬菜',
          data:['进口水果','国产水果','水果礼盒','蔬菜']
        },{
          title:'生鲜肉食',
          data:['牛肉','猪肉','羊肉']
        },{
          title:'禽蛋/肉制品',
          data:['鲜肉','鸡蛋','鸭蛋','鸡','鸭']
        },{
          title:'速冻食品',
          data:['面食面点','加工牛排','水饺混沌','速冻蔬菜','速冻汤圆','其他速冻食品','兔烧家常菜']
        },{
          title:'海鲜水产',
          data:['海鲜虾','三文鱼','海鱼','蟹/贝','海鲜调味','加工水产','其他水产']
        },{
          title:'低温乳品/烘焙甜点',
          data:['低温乳品','烘焙甜点']
        },{
          title:'方便速食',
          data:['粽子','肉类罐头','水果罐头','方便面','休闲食品']
        },{
          title:'厨房调味',
          data:['食用盐','酱油','味精鸡精','蜂蜜','糖','醋','调味酱','调味料','汤料','腐乳','酱菜','香油','料酒','果酱','耗油']
        },{
          title:'南北干货',
          data:['莲子枣子','腌腊','桂圆荔枝','干果坚果','木耳银耳','菌菇类','海产品','滋补类']
        }]
      },{
        title:'食品饮料',
        id:2,
        img:'',
        data:[{
          title:'蜜饯零食',
          data:['枣','熟食小吃','其他小吃','薯片','其他蜜饯','梅子','肉干肉松','凤爪','豆制品']
        },{
          title:'牛奶乳品',
          data:['纯牛奶','酸奶','植物蛋白奶','儿童奶','果味奶']
        },{
          title:'饼干糕点',
          data:['饼干','传统糕点','蛋糕','蛋卷','面包','派','曲奇','无糖系列']
        },{
          title:'咖啡茶饮',
          data:['速溶咖啡','普洱茶','乌龙茶','袋泡茶','花茶','绿茶','黑茶','红茶','咖啡伴侣']
        },{
          title:'酒类商城',
          data:['白酒','啤酒','葡萄酒','果味酒','滋补酒']
        },{
          title:'冲饮谷物',
          data:['成人奶粉','豆奶粉','麦片谷物','奶茶','芝麻糊','其他营养品','果味冲饮','柚子茶']
        },{
          title:'糖果/巧克力',
          data:['巧克力','硬糖','口香糖','果冻/布点','奶糖','软糖']
        },{
          title:'坚果炒货',
          data:['瓜子/花生','核桃/腰果','开心果','其他坚果','坚果礼盒']
        },{
          title:'饮料饮品',
          data:['即饮茶','碳酸饮料','果汁','功能饮料','八宝粥','咖啡饮料','水']
        },{
          title:'食品卡劵',
          data:['卡劵']
        }]
      },{
        title:'进口商品',
        id:3,
        img:'',
        data:[{
          title:'进口牛奶',
          data:['进口牛奶']
        },{
          title:'进口休闲食品',
          data:['进口饼干','进口果冻','进口果干','进口坚果','进口膨化','进口曲奇','进口巧克力糖果','无糖低糖系列']
        },{
          title:'进口酒水饮品',
          data:['进口啤酒','进口饮品','进口葡萄酒']
        },{
          title:'进口粮油调味',
          data:['进口调味酱','进口米面','进口橄榄油','进口罐头','进口调味粉','进口烹调汁']
        },{
          title:'进口冲调',
          data:['进口饮茶','进口咖啡','进口蜂蜜柚子茶','进口其他冲饮']
        }]
      },{
        title:'个人护理',
        id:4,
        img:'',
        data:[{
          title:'美容护肤',
          data:['护肤套装','洁面','爽肤水','乳液面霜','面膜','面部精华','眼部护理','T区护理','按摩霜','防晒霜','男士护肤','男士洁面','剃须','男士爽肤水','男士面霜','卸妆','BB霜','眼部彩妆','彩妆套装','唇膏/彩唇','隔离','手足护理','遮瑕','护手霜','润唇膏','身体乳','花露水','爽身香体','脱毛','纤体塑身','美容工具']
        },{
          title:'个人护理',
          data:['洗发','护发','高端洗护','染发剂','定型造型','洗护套装','沐浴露','洗手液','香皂','漱口水','牙膏','牙刷/牙线/牙贴','卫生巾','棉条护垫','洗液暖贴','成人用品','创可贴']
        }]
      },{
        title:'母婴用品',
        id:5,
        img:'',
        data:[{
          title:'婴儿奶粉',
          data:['1段奶粉','2段奶粉','3段奶粉','4段奶粉','妈妈奶粉','羊奶粉','特殊配方']
        },{
          title:'尿裤湿巾',
          data:['L纸尿裤/片','M纸尿裤','S纸尿裤/片','XL纸尿裤/片','XXL纸尿裤/片','新生儿纸尿裤','拉拉裤','婴儿湿巾','成人纸尿裤']
        },{
          title:'宝宝用品',
          data:['爽身','洗发沐浴','婴儿护肤','奶瓶','奶嘴','安抚奶嘴','牙胶餐具','哺乳电器','幼儿口腔护理','防虫衣物清洁护理','卫生护理','奶瓶餐具清洁','孕妈专区','水具收纳','玩具']
        },{
          title:'宝宝辅食',
          data:['米粉','果蔬肉泥','宝宝饼干','面条','宝宝肉酥','磨牙棒/小馒头']
        },{
          title:'营养专区',
          data:['清火类幼儿益生菌','营养品','妈妈营养品','染发剂','定型造型','洗护套装','钙铁锌类/牛初乳']
        },{
          title:'童车',
          data:[]
        },{
          title:'童装童鞋',
          data:[]
        }]
      },{
        title:'家具清洁',
        id:6,
        img:'',
        data:[,{
          title:'纸制品',
          data:['卷纸','抽纸','湿巾','厨房用纸','手帕纸']
        },{
          title:'衣物清洁护理',
          data:['洗衣液','洗衣粉','洗衣皂','衣领净','衣物护理']
        },{
          title:'家庭清洁护理',
          data:['洗洁精','洁厕用具','其他清洁护理','油污清洁剂','空气清新','驱虫用品','皮具护理','进口洗衣用品','进口油污清洁剂','进口玻璃/瓷砖清洗器','进口防蚊系列','进口多用途清洁剂','进口其他清洁用品']
        },{
          title:'清洁用具/一次性用品',
          data:['拖把','清洁配件','卫浴用品','保鲜膜/袋','一次性杯','一次性其他用品']
        },{
          title:'家纺日用品',
          data:['被子','毛巾浴巾','枕头','干鞋器','暖手袋']
        },{
          title:'厨具餐具',
          data:['锅具','厨房工具','水杯/水壶','保温杯','保鲜餐具']
        },{
          title:'家居文体',
          data:['插线板/转换器','电池/充电器','台灯','箱/包','收纳系列','轮滑轮板','球类运动','瑜伽用品','小型健身器材']
        }]
      },{
        title:'家用电器',
        id:7,
        img:'',
        data:[{
          title:'大家电',
          data:['电视','空调','冰箱/冰柜','洗衣机','烟机/灶具','热水器','消毒柜/洗碗机','浴霸']
        },{
          title:'厨房小家电',
          data:['电压力锅/电饭锅','电磁炉','电水煲','电炖锅/电火锅/电蒸锅','豆浆机/料炸机','微波炉/厨房精品电器']
        },{
          title:'个护健康',
          data:['剃须刀','电吹风','剃毛器/脱毛器','电动牙刷/美发器','足浴盆','按摩器','按摩椅']
        },{
          title:'生活电器',
          data:['加湿器','饮水机','净化器','净水设备','挂烫机/熨斗/毛球修剪器','吸尘器/除湿机/新风机/干衣机','电风扇','冷风机']
        }]
      },{
        title:'手机数码',
        id:8,
        img:'',
        data:[{
          title:'手机通讯',
          data:['手机']
        },{
          title:'数码配件',
          data:['时尚影音','数码配件','手机配件']
        },{
          title:'电脑办公',
          data:['电脑整机','外设产品','网络产品']
        }]
      }],
    }
  }
  componentDidMount (){
    $('.left li').eq(0).addClass('ys').children('.item').addClass('xb')
    $('.left li').eq(0).siblings('li').removeClass('ys').children('.item').removeClass('xb')
    $(this.refs.left).css({
      height:(window.screen.height-73)+'px'
    })
  }
  render(){
    return(
      <Xiaoxiaoyuan>
        <div ref="left" class='left'>
          <ul>{function(self){
            var xthis = self;
            var html = self.state.arr.map(function(item,index){
              return <li key={index} onClick={function(event){
                xthis.props.dispatch({
                  type:'getid',
                  data:xthis.state.arr[index],
                  mr:xthis.state.arr[0]
                })
                $('.left li').eq(index).addClass('ys').children('.item').addClass('xb')
                  $('.left li').eq(index).siblings('li').removeClass('ys').children('.item').removeClass('xb')
              }}>
                <div class="item">
                  <i class="iconglobal">{item.img}</i>
                  <div class="name">{item.title}</div>
                </div>
              </li>
            })
            return html
          }(this)}</ul>
        </div>
        <Yright />
      </Xiaoxiaoyuan>
    )
  }
}

export default connect()(Yleft)
