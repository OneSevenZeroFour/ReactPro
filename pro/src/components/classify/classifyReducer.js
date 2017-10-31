import * as types from '../../store/commonConstant';


//这个函数返回一个新的state
export default function(state = {}, action) {

    switch (action.type) {
        case types.CLASSIFYREQUEST:
            return Object.assign({}, state, action.query);
            break;

        default:
            return state;
    }

}