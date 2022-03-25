import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

const ResultDiv = () => {
    const dispatch = useDispatch()

    const data = useSelector((state) => state.modalReducer.result)

    const handleClick = () =>{
        dispatch({type : "CLOSE"})
     }

     if (Array.isArray(data)){
        return (
            <div className="result-text" onClick={handleClick}>
                {data.map((data, i)=>{
                    return <li key={i} className="result-text-li">{data}</li>
                })}
            </div>
        )
    }else{
        return (
            <div className="result-text">
                <li className="result-text-li">{data}</li>
            </div>
        )
    }

}

export default ResultDiv
