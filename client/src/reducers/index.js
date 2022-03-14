import { combineReducers } from 'redux';

import modalReducer from './modal';
import notificationReducer from './notifications';
import imageReducer from './image'

export const reducers = combineReducers({ modalReducer, notificationReducer, imageReducer });