import * as actionTypes from "../constants/modalTypes"

const imageReducer = (state = {image: actionTypes.IMAGE_URL}, action) => {
    switch (action.type){
        case actionTypes.UPDATE_IMAGE:
            return {...state, image: action.data}
        case actionTypes.UPDATE_FILE_IMAGE:
            return {...state, image : action.data}
        default:
            return state
    }
}

export default imageReducer