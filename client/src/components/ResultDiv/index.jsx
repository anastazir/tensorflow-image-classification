import React from 'react'
import { useSelector } from 'react-redux';

const ResultDiv = ({ handleClose }) => {
    const data = useSelector((state) => state.modalReducer.result)
    if (!data){
        return <></>
    }
    return (
        <div className="result-text" onClick={handleClose}>
            {data.map((data, i)=>{
                return <li key={i} className="result-text-li">{data}</li>
            })}
        </div>
    )
}

export default ResultDiv
