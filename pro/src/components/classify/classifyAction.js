import * as constants from '../../store/commonConstant'

export function login(obj) {
    console.log(obj)
    return {
        type: constants.CLASSIFYREQUEST,
        query: obj
    }
}