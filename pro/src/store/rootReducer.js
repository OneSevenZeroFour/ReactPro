import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import Login from '../components/login/LoginReducers';
import Register from '../components/register/RegisterReducer';

const rootReducer = combineReducers({
    Login,
    Register,
    router
})

export default rootReducer;