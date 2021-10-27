import { motion } from 'framer-motion'
import React from 'react'

const SelectType = ({handleCategory}) => {
    return (
        <>
        <motion.select className="input" onChange={handleCategory}>
          <option value="showAll">🧸 👶 V II Show All</option>
          <option value="binaryClassification">II Binary Classification</option>
          <option value="multiClassification">V Multiclass Classification</option>
          <option value="faceClassification">👶 Face Classification</option>
          <option value="animalClassification">🧸 Animal Classification</option>
        </motion.select>  
        </>
    )
}

export default SelectType
