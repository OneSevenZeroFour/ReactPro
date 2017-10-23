import * as constants from '../../store/commonConstant'

export function login(obj) {
    console.log('action')
    return {
        types: [constants.REQUEST, constants.SUCCESS, constants.FAILURE],
        path: 'login',
        method: 'post',
        query: obj
    }
}
export function sendData(data) {
    return {
        type: constants.REQUEST,
        data: data
    }
}