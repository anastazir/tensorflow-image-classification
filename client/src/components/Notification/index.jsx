import { motion } from "framer-motion";
import { remove } from "../../arr-utils";

const notificationVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.2,
    transition: { duration: 0.1 },
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.2,
    transition: { ease: "easeOut", duration: 0.15 },
  },
  hover: { scale: 1.05, transition: { duration: 0.1 } },
};

const Notification = ({ notifications, setNotifications, notification }) => {
  const { text, style, ans } = notification;
  console.log("ans---",ans)
  const handleClose = () => setNotifications(remove(notifications, notification));
  console.log(notifications)
  const styleType = () => {
    // Controlled by selection menu
    console.log(style);
    switch (style) {
      case "FaceClassification":
        return { background: "linear-gradient(15deg, #6adb00, #04e800)" };
      case "CatvsDog":
        return { background: "linear-gradient(15deg, #ff596d, #d72c2c)" };
      case "DogBreed":
        return { background: "linear-gradient(15deg, #ffac37, #ff9238)" };
      case "mask":
        return { background: "linear-gradient(15deg, #e7e7e7, #f4f4f4)" };
      default:
        return { background: "linear-gradient(15deg, #202121, #292a2d)" };
    }
  };

  


  return  (
    <motion.li
      style={styleType()} // Change the style based on style selection
      variants={notificationVariants} // Defined animation states
      whileHover="hover" // Animation on hover gesture
      initial="initial" // Starting animation
      animate="animate" // Values to animate to
      exit="exit" // Target to animate to when removed from the tree
    >
      <h3 style={{ color: style ? "#030303" : "#929292" }} className="notification-text">
        {/* {`Prediction is ${ans}`} */}
        {ans}
      </h3>
      <CloseButton color={style ? "#030303" : "#989898"} handleClose={handleClose} />
    </motion.li>
  );
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={props.color}
    strokeLinecap="square"
    {...props}
  />
);

const CloseButton = ({ handleClose, color }) => (
  <motion.div whileHover={{ scale: 1.2 }} onClick={handleClose} className="close">
    <svg width="18" height="18" viewBox="0 0 23 23">
      <Path color={color} d="M 3 16.5 L 17 2.5" />
      <Path color={color} d="M 3 2.5 L 17 16.346" />
    </svg>
  </motion.div>
);

export default Notification;
