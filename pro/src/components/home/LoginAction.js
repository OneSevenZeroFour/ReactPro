import * as constants from '../../store/commonConstant'

export function homeHot(obj) {
    console.log('action')
    return {
        types: [constants.REQUEST, constants.SUCCESS, constants.FAILURE],
        path: 'homeHot',
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