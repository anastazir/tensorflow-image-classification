import { motion } from 'framer-motion'
import React from 'react'
import {optionValues} from '../../helper/optionValues'

const InputList=({category})=> optionValues.map((option, i)=>{
    if (option.type.includes(category)===true){
        return (<option value={option.value} key={i}>{option.name}</option>)
    }
})

const Select = ({handleStyle, category}) => {
    console.log("category in Select.jsx is" ,category);
    return (  
        <>
        <motion.select className="input" onChange={handleStyle}>
          <InputList category={category} />
        </motion.select>  
        </>
    )
}

export default Select