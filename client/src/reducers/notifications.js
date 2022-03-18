import * as actionTypes from "../constants/modalTypes"
import { remove } from "../helper/arr-utils"

const notificationReducer = (state = {notificationList: []}, action) => {
    switch (action.type) {
        case actionTypes.ADD:
            if (state.notificationList.length >= 10){
                state.notificationList.shift()
            }
            return {...state, notificationList : [...state.notificationList, action.data]}
        case actionTypes.REMOVE:
            const updatedArray = remove(state.notificationList, action.data)
            return {...state, notificationList : updatedArray}
        default:
            return state
    }
}

export default notificationReducer
