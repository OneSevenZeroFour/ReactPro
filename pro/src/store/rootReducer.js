import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import Login from '../components/login/LoginReducers';
import Register from '../components/register/RegisterReducer';
import Personal from '../components/personal/PersonalReducer';
import ListPage from '../components/listPage/listReducer';
import Classify from '../components/classify/classifyReducer';

const rootReducer = combineReducers({
    Login,
    Register,
    Personal,
    ListPage,
    Classify,
    router
})

export default rootReducer;