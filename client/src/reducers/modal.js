import * as actionTypes from "../constants/modalTypes"

const modalReducer = (state = {loading: false, result : null, error : null, openModal : false}, action) => {
    switch (action.type) {
        case actionTypes.START_LOADING:
            return { ...state, loading: true}            
        case actionTypes.END_LOADING:
            return { ...state, loading: false}
        case actionTypes.RESULT:
            console.log("==========================result", action.data)
            return { ...state, result: action.data}
        case actionTypes.ERROR:
            console.log("==========================error", action.error)
            return { ...state, error: action.error}
        case actionTypes.OPEN:{
            return { ...state, openModal : true}
        }
        case actionTypes.CLOSE:{
            return { ...state, openModal : false}
        }
        default:
            return state
    }
}

export default modalReducer