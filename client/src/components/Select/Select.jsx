import { motion } from 'framer-motion'
import React from 'react'

const Select = ({handleStyle}) => {
    return (
        <>
        <motion.select className="input" onChange={handleStyle}>
          <option value="everything">🔥 Classify Everything</option>
          <option value="faceMaskClassification">🤿 Mask Classification</option>
          <option value="genderClassification">♂️ or ♀️ Classification</option>
          <option value="emotionClassification">👨‍🦰 Emotion Detection</option>
          <option value="glassesClassification">👓or👀</option>
          <option value="catvsDog">🐱or🐶</option>
          <option value="foodClassification">🍲 Food Classification</option>
          <option value="dogClassification">🐕‍🦺 Dog Classification</option>
          <option value="birdsClassification">🦅 Birds Classification</option>
          <option value="wildlifeClassification">🦙 Wildlife Classification</option>
          <option value="ageClassification">🧔 Age Classification</option>

        </motion.select>  
        </>
    )
}

export default Select
