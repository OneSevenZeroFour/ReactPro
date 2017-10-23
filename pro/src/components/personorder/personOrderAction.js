import * as constants from '../../store/commonConstant'

export function register(obj) {
    console.log('action')
    return {
        types: [constants.REQUEST, constants.SUCCESS, constants.FAILURE],
        path: 'register',
        method: 'post',
        query: obj
    }
}