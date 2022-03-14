import { combineReducers } from 'redux';

import modalReducer from './modal';
import notificationReducer from './notifications';

export const reducers = combineReducers({ modalReducer, notificationReducer });