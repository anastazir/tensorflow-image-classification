import { ADD, REMOVE } from '../constants/modalTypes';
import { remove } from "../helper/arr-utils"

export const removeNotification = (notification) => (dispatch) => {
    dispatch({type : REMOVE, data : notification})
}