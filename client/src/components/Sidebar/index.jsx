import React, { useState, Children } from "react"
import styled from "styled-components"
import { motion, useSpring } from "framer-motion"

const Container = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  touch-action: none;
`

const SidebarContainer = styled(motion.div)`
  position: fixed;
  background-color: ${({ color }) => `${color}`};
  width: ${({ width }) => `${width}px`};
  height: 100%;
  box-sizing: border-box;
  box-shadow: 16px 0 32px -16px #000;
  padding: 64px;
`

const HamburgerContainer = styled(motion.div)`
  border-radius: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  margin: 24px;
  cursor: pointer;
  z-index: 2;
  /* -webkit-tap-highlight-color: transparent; */
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

const Sidebar = ({ width = 320, color = "#1c2022", children }) => {
  const [isOpen, setOpen] = useState(false)
  const x = useSpring(0, { stiffness: 400, damping: 40 })

  return (
    <Container
      onPan={(e, pointInfo) => {
        if (pointInfo.point.x < width) x.set(pointInfo.point.x - width)
        // if (pointInfo.velocity.x < 0) x.set(pointInfo.point.x - width)

        // console.log("pointInfo.delta.x: ", pointInfo.delta.x)
        // console.log("pointInfo.offset.x: ", pointInfo.offset.x)
        // console.log("pointInfo.point.x: ", pointInfo.point.x)
        // console.log("pointInfo.velocity.x: ", pointInfo.velocity.x)
      }}
      onPanEnd={(e, pointInfo) => {
        if (Math.abs(pointInfo.velocity.x) > 1000 && !isOpen) {
          if (pointInfo.velocity.x > 0) {
            x.set(0)
          } else x.set(-width)
        } else {
          if (Math.abs(x.current) < width / 2) {
            x.set(0)
            // setOpen(true)
          } else {
            x.set(-width)
            // setOpen(false)
          }
        }
      }}
    >
      <HamburgerButton x={x} width={width} isOpen={isOpen} setOpen={setOpen} />
      <SidebarContainer
        color={color}
        width={width}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40
        }}
        initial={{ x: -width }}
        style={{ x }}
      >
        {children}
      </SidebarContainer>
    </Container>
  )
}

export default Sidebar
