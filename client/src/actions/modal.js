import { START_LOADING, END_LOADING, RESULT, ERROR, OPEN, ADD, PING } from '../constants/modalTypes';
import * as api from '../api/index.js';
import { addEmoji } from '../helper/helperFunctions';

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
                ans : addEmoji(data)
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
                ans : addEmoji(data)
            }
            dispatch({ type: ADD, data : ans });
        }
    } catch (error) {
        dispatch({ type: ERROR, error });
    }
    dispatch({type: END_LOADING});
}

export const pingServer = () => async (dispatch) => {
    try{
        const { data: { data } } = await api.ping_server();
        dispatch({ type: PING, data: data})
    } catch (error) {
        console.log(error);
    }
}