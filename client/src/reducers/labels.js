import * as actionTypes from "../constants/modalTypes"

const labelReducer = (state = {labelsArray: []}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_LABELS:
            return { ...state, labelsArray: action.data}
        default:
            return state
    }
}

export default labelReducer