/*
    Created on the 23/06/20
    Author: WB
    Name: store.js
    Description: Redux data store for the application
 */

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root.reducer';

const middlewares = [logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store;