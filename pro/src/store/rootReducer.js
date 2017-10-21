import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import Login from '../components/login/LoginReducers';

const rootReducer = combineReducers({
    Login,
    router
})

export default rootReducer;