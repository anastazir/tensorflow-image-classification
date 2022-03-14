import { START_LOADING, END_LOADING, RESULT, ERROR, OPEN, ADD } from '../constants/modalTypes';
import * as api from '../api/index.js';
import { switchAns } from '../helper/helperFunctions';

export const predictImage = (formData, style) => async (dispatch) => {
    dispatch({type: START_LOADING});
    try {
        const { data: { data } } = await api.predict_image(formData, style);
        dispatch({ type: RESULT, data });
        if (Array.isArray(data)){
            dispatch({ type: OPEN });
        }else{
            const ans = {
                style : style,
                ans : switchAns(data)
            }
            dispatch({ type: ADD, data : ans });
        }
    } catch (error) {
        dispatch({ type: ERROR, error });
    }
    dispatch({type: END_LOADING});
}

export const predictFile = (formData, style) => async (dispatch) => {
    dispatch({type: START_LOADING});
    try {
        const { data: { data } } = await api.predict_file(formData, style);
        dispatch({ type: RESULT, data });
        if (Array.isArray(data)){
            dispatch({ type: OPEN });
        }else{
            const ans = {
                style : style,
                ans : switchAns(data)
            }
            dispatch({ type: ADD, data : ans });
        }
    } catch (error) {
        dispatch({ type: ERROR, error });
    }
    dispatch({type: END_LOADING});
}