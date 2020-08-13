/*
    Created on the 23/06/20
    Author: WB
    Name: root.reducer.js
    Description: Redux reducer for the application, combines all reducers together
 */

import { combineReducers } from 'redux';

import loginFormReducer from './login/login.reducer';
import userReducer from './user/user.reducer';
import newUserDataReducer from './new-user-data/new-user-data.reducer'

const rootReducer = combineReducers({
    login: loginFormReducer,
    user: userReducer,
    newUserData: newUserDataReducer
})

export default rootReducer;