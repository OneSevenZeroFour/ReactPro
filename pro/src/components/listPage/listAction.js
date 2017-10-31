import * as constants from '../../store/commonConstant';

export function login(obj) {
    console.log(obj)
    return {
        type: constants.LISTGETLIST,
        query: obj
    }
}