import { useEffect } from "react";
import { motion } from "framer-motion";
import { stateLogger } from "../../stateLogger";
import Backdrop from "../Backdrop/index";
import ImageShow from "../ImageShow/ImageShow";

const liStyle = {
  margin: 'auto',
  width: '50%',
  color: 'var(--dark)',
  fontWeight: '600',
  fontSize: '130%',
    whiteSpace: "nowrap"
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const flip = {
  hidden: {
    transform: "scale(0) rotateX(-360deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotateX(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotateX(360deg)",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const result = {
  hidden: {
    transform: "scale(0) rotate(720deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotate(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotate(-720deg)",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Modal = ({ handleClose, text, type, data, url }) => {
  // Log state
  useEffect(() => {
    stateLogger("Modal", true);
    return () => stateLogger("Modal", false);
  }, []);
  console.log(type==='invalid');
  console.log(url);
  return (
    <Backdrop onClick={handleClose}>
      {type === "emptyInput" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
          className="modal orange-gradient"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ModalText text={text} />
          <ModalButton onClick={handleClose} label="Close" />
        </motion.div>
      )}

      {type === "invalid" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}   
          className="modal  orange-gradient"
          variants={flip}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ModalText type={type} />
          <ModalButton onClick={handleClose} label="Close" />
        </motion.div>
      )}
      {type === "result" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}   
          className="result  orange-gradient"
          variants={result}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ImageShow img={url}/>
          <ResultText data={data} />
        </motion.div>
      )}
    </Backdrop>
  );
};
const ModalText = ({type}) => (
  <div className="modal-text">
    {
    type==="invalid" ?
      <div>
        <h3>Invalid Input</h3> 
        <h5 style={{  "text-align": "center"}} >
          Please make sure that the url is valid
        </h5>
      </div> 
    :  
      <div>
        <h3>Empty Input</h3> 
        <h5 style={{  "text-align": "center"}} >
          The input field is Empty
        </h5>
      </div>
    }
  </div>
);


const ResultText = ({data}) =>(
  <div >
    <h3 className="result-text">Results</h3>
    <div >
    {data.map((object, i)=>{
        return <li key={i} style={liStyle}> {object} </li>;
    })}
    </div>
    </div>
)

const ModalButton = ({ onClick, label }) => (
  <motion.button
    className="modal-button"
    type="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);

export default Modal;
