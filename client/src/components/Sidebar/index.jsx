import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { AnimatePresence, motion, useSpring } from "framer-motion"
import { getLabel } from "../../Fetch/fetchLabels"


const SidebarContainer = styled(motion.div)`
  border-radius: 5px;
  position: fixed;
  background-color: ${({ color }) => `${color}`};
  width: 25%;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 16px 0 32px -16px #000;
  padding: 64px;
  @media screen and (max-width: 960px) {
    width: 50%;
  }
  ::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
`

const HamburgerContainer = styled(motion.div)`
  border-radius: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top:0;
  left:0;
  // margin: 24px;
  cursor: pointer;
  z-index: 2;
  /* -webkit-tap-highlight-color: transparent; */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */ 
`
const Line = styled(motion.div)`
  background-color: #fff;
  width: ${({ width }) => `${width}px`};
  height: 2px;
  margin: 2px 14px;
  border-radius: 8px;
`

const HamburgerButton = ({ x, width, isOpen, setOpen }) => {
  return (
    <HamburgerContainer
      onTap={() => {
        console.log(isOpen)
        setOpen(!isOpen)
        isOpen ? x.set(-width) : x.set(0)
      }}
    >
      <Line width={16} />
      <Line width={12} />
    </HamburgerContainer>
  )
}

const Sidebar = ({ width = 320, style }) => {
  const [labels, setLabels] = useState(['no labels'])
  const [isOpen, setOpen] = useState(false)
  const x = useSpring(0, { stiffness: 400, damping: 40 })
  console.log('style is ', style);
  useEffect(() => {
    (getLabel(style, setLabels))
  }, [style])

  return (
    <>
      <HamburgerButton x={x} width={width} isOpen={isOpen} setOpen={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <SidebarContainer
            className='sidebar-container'
            color={"#ff9d00"}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            style={{overflowY: 'scroll', alignItems: 'center'}}
            >
            <h3 style={{textColor: 'white', alignSelf: 'centers'}}>
              Labels
            </h3>
            {labels && labels.map((lable, i) => {
             return <li className='lables-li' key={i}>{lable}</li>
            })
            }
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="refresh-button"
              onClick={() => console.log('clicking')}>
                Refresh
            </motion.button>
          </SidebarContainer>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
