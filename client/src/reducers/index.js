import { combineReducers } from 'redux';

import modalReducer from './modal';
import notificationReducer from './notifications';
import imageReducer from './image'
import labelReducer from './labels'
export const reducers = combineReducers({ modalReducer, notificationReducer, imageReducer, labelReducer });