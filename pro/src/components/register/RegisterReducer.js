import * as types from '../../store/commonConstant';


//这个函数返回一个新的state
export default function(state = {}, action) {

    switch (action.type) {
        case types.REQUEST:
            return Object.assign({}, state);
            break;
        case types.SUCCESS:
            console.log('reducer')
            return Object.assign({}, state, {
                data: action.body,
                lastFetched: action.lastFetched
            })
            break;
        case types.FAILURE:
            return Object.assign({}, state, {
                error: action.error
            })
            break;
        default:
            return state;
    }

}