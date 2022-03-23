import { FETCH_LABELS, ERROR } from '../constants/modalTypes';
import * as api from '../api/index.js';
import { getLocalStorage } from "../helper/localStorage";

const labelArray=[]
export const fetchLabels = (style) => async (dispatch) => {
    const alreadyExists= getLocalStorage(style)
    console.log("alreadyExists", alreadyExists);
    if (alreadyExists){
      let savedResult= localStorage.getItem('myLabels')
      savedResult= JSON.parse(savedResult)
      for (let i=0; i<savedResult.length; i++) {
        if(savedResult[i].labelName===style){
          dispatch({ type: FETCH_LABELS, data: savedResult[i].resultArray });
          return 
        }
      }
    }
    try {

      const {data: { labels } } = await api.fetch_labels(style);
      let currentLabel={'labelName': style,'resultArray': labels}
      
      labelArray.push(currentLabel)
      localStorage.setItem('myLabels', JSON.stringify(labelArray))
      
      dispatch({ type: FETCH_LABELS, data: labels });
    } catch (error) {
      dispatch({ type: FETCH_LABELS, data: ['No Labels Available'] });
      dispatch({ type: ERROR, error });
    }
}