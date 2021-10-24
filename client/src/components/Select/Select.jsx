import { motion } from 'framer-motion'
import React from 'react'
import {optionValues} from '../../helper/optionValues'

const InputList= optionValues.map((option, i)=>
    (<option value={option.value} key={i}>{option.name}</option>)
)

const Select = ({handleStyle}) => {
    return (  
        <>
        <motion.select className="input" onChange={handleStyle}>
          {InputList}
        </motion.select>  
        </>
    )
}

export default Select