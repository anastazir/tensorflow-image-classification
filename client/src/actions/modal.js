import { START_LOADING, END_LOADING, RESULT, ERROR, OPEN } from '../constants/modalTypes';
import * as api from '../api/index.js';

export const startLoading = () => (dispatch) => {
    console.log('================================actins , startLoading', START_LOADING);
    dispatch({type: START_LOADING});
}

export const endLoading = () => (dispatch) => {
    console.log('================================actins , endLoading');
    dispatch({type: END_LOADING});
}

export const predictImage = (formData, style) => async (dispatch) => {
    dispatch({type: START_LOADING});
    try {
        const { data: { data } } = await api.predict_image(formData, style);
        dispatch({ type: RESULT, data });
        console.log("data type ", Array.isArray(data))
        if (Array.isArray(data)){
            dispatch({ type: OPEN });
        }else{
            
        }
        //   else{
        //   const ans = switchAns(data.data);
        //   let text=''
        //   setNotifications(add(notifications,text, style, ans))
        //   }
    } catch (error) {
        dispatch({ type: ERROR, error });
    }
    dispatch({type: END_LOADING});
}