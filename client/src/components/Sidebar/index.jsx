import React, { useState, useEffect } from         "react"
import { AnimatePresence, motion, useSpring } from "framer-motion"
import styled from                                 "styled-components"
import { useDispatch, useSelector } from           'react-redux';
import { fetchLabels } from                        "../../actions/labels";
import Backdrop from "../Backdrop";

const SidebarContainer = styled(motion.div)`
  border-radius: 5px;
  position: fixed;
  background-color: ${({ color }) => `${color}`};
  height: 100%;
  box-sizing: border-box;
  box-shadow: 16px 0 32px -16px #000;
  padding: 64px;
  @media screen and (max-width: 960px) {
    width: 75%;
    align-items: left;
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
  const labels = useSelector((state) => state.labelReducer.labelsArray);
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false)
  const x = useSpring(0, { stiffness: 400, damping: 40 })

  useEffect(() => {
    dispatch(fetchLabels(style))
  }, [style])

  // const handleChange = () => {
     // getLabel(style, setLabels, true)
  // }

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
          style={{overflowY: 'scroll',overflowX: 'hidden'}}
          >
            <h3 style={{textColor: 'white',}}>
              Labels
            </h3>
            {labels && labels.map((lable, i) => {
              return <li className='lables-li' key={i}>{lable}</li>
            })
          }
          </SidebarContainer>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
