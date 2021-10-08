import { motion } from 'framer-motion'
import React from 'react'

const SelectType = ({handleType}) => {
    return (
        <>
        <motion.select className="input" onChange={handleType}>
          <option value="showAll">Show All</option>
          <option value="binaryClassification">Binary Classification</option>
          <option value="multiclassClassification">Multiclass Classification</option>
          <option value="faceClassification">Face Classification</option>
        </motion.select>  
        </>
    )
}

export default SelectType
