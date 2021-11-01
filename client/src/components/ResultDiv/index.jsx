import React from 'react'

const ResultDiv = ({data, handleClose}) => {
    return (
        <div className="result-text" onClick={handleClose}>
            {data.map((data, i)=>{
                return <li key={i} className="result-text-li">{data}</li>
            })}
        </div>
    )
}

export default ResultDiv
