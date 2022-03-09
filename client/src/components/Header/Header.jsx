import React from 'react'
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.h1 className="pink">
        Tensorflow
        <span className="light-blue"> Project</span>
        <button style={{float: "right", backgroundColor: "black"}} onClick={() => window.open("https://github.com/anastazir/tensorflow-image-classification", "_blank")}>
            <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" />
        </button>
    </motion.h1>
  )
}

export default Header