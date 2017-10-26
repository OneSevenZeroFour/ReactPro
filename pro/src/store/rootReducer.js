import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import Login from '../components/login/LoginReducers';
import Register from '../components/register/RegisterReducer';
import Personal from '../components/personal/PersonalReducer';

const rootReducer = combineReducers({
    Login,
    Register,
    Personal,
    router
})

export default rootReducer;