import {createStore} from 'redux';
let store = createStore((state={
  data:{
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
  }
},action) => {
  switch (action.type) {
    case 'getid':
      return {
        data:action.data
      }
      break;
    default:
    return state
  }
})
export default store
