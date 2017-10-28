import {createStore} from 'redux';
let store = createStore((state={

},action) => {
  switch (action.type) {
    case 'getlist':
      return {
        data:action.data,
        id:action.id+1,
        II:action.II
      }
      break;
    default:
    return state
  }
})
export default store
