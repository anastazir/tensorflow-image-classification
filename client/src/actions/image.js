import { UPDATE_IMAGE, UPDATE_FILE_IMAGE } from '../constants/modalTypes';

export const updateImage = (imageURL) => async (dispatch) => {
    dispatch({type: UPDATE_IMAGE, data: imageURL});
}

export const updateFileImage = (imageFile) => (dispatch) => {
    dispatch({type: UPDATE_FILE_IMAGE, data: imageFile});
}