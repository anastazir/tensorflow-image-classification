/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useModal from "./hooks/useModal";
import validator from 'validator' // to check if URL is valid

import { framerLogger } from "./stateLogger";
import Notification from "./components/Notification";
import Input from "./components/Input";
import Modal from "./components/Modal";
import { add } from "./arr-utils";
import ImageShow from "./components/ImageShow/ImageShow";
import { handleUrl, handleBase64 } from "./Fetch/fetchByUrl";
import {encodeFileBase64} from "./helper/helperFunctions"
import NotificationContainer from "./hooks/NotificationContainer";
import ThreeDotsWave from "./components/Loading/ThreeDotsWave";
import {randomImages} from "./helper/randomImages";
import Sidebar from "./components/Sidebar/index"

function App() {
// TODO: ADD A BUTTON TO COPY URL FROM THE CLIPBOARD
// TODO: FIX THE BASE64 ROUTES AND METHODS
// TODO: MAKE A READ ME WITH IMAGES
  const [image, setImage] = useState(null)    // for image file
  const [imgUrl, setImgUrl] = useState('')    // for image URL
  // Result Data
  const [resultData, setResultData] = useState(["No faces found"])

  // Modal state
  const { modalOpen, close, open } = useModal();
  // Modal type
  const [modalType, setModalType] = useState("dropIn");
  // For base64 images
  const [fileBase64String, setFileBase64String] = useState("");
  // Notifications state
  const [notifications, setNotifications] = useState([]);

  // Notification text
  const [text, setText] = useState("");
  const handleText = (e) => setText(e.target.value);

  // Notification style
  const [style, setStyle] = useState("faceMaskClassification");
  const handleStyle = (e) => setStyle(e.target.value);
  // Notification position
  const position= 'bottom'

  const [predicting, setPredicting] = useState(false)

  const onImageFileChange= (e) =>{
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
      encodeFileBase64(e.target.files[0], setFileBase64String)
      
    }
  }

  const openResultdModal = (data) =>{
    setModalType('result')
    setResultData(data)
    // open()
    console.log(data);
  }


  const validateUrl = () =>{
    if(text){
      if (validator.isURL(text)){
        setImage(null)
        setImgUrl(text)
        if(!predicting){
          handleUrl(text, setNotifications, add, style, notifications, setPredicting, openResultdModal);
        }
      }
      else{
        setModalType('invalid')
        open()
      }
    }else{
      setModalType('emptyInput')
      open();
    }
  }

  return (
    <>
    <Sidebar>
      <h3>
        This is a side bar
      </h3>
    </Sidebar>
    <Header />
    <div id="left">
      <motion.main>
        <SubHeader text="Select File from local directory" />
        <input type="file" accept="image/*" className="input" onChange={onImageFileChange} /> 
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="save-button"
          onClick={()=>
          {if (!predicting){
            handleBase64(fileBase64String, setNotifications, add, style, notifications, text)}
          }}>
          Predict Local Image
        </motion.button>  

        <br />

        <SubHeader text="Enter image URL" />

        <br />

        <Input
          placeHolder="Add image URL 🚀"
          value={text}
          onChange={handleText}
        />

        <br />
        
        <SubHeader text="Select type of Classification" />
        
        <br />

        <motion.select className="input" onChange={handleStyle}>
          <option value="faceMaskClassification">🤿 Mask Classification</option>
          <option value="genderClassification">♂️ or ♀️ Classification</option>
          <option value="emotionClassification">👨‍🦰 Emotion Detection</option>
          <option value="everything">🔥 Classify Everything</option>
          <option value="catvsDog">🐱or🐶</option>
        </motion.select>

        <br />

      <div className="predict-random">

        {  predicting ? 
            <ThreeDotsWave/> :
            <>
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="add-button"
            onClick={validateUrl}>
              Predict
            </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="random-button"
            onClick={()=>{
              var url=randomImages(style)
              setText(url)
              setImgUrl(url)}}>
            Random Image
          </motion.button> 
          </>
        }
      </div>

        
    </motion.main>

      <ModalContainer>
        {modalOpen && (
          <Modal modalOpen={modalOpen} text={modalType} type={modalType} handleClose={close} data={resultData} url={text} />
        )}
      </ModalContainer>

      <NotificationContainer position={position}>
        {notifications &&
          notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              notifications={notifications}
              setNotifications={setNotifications}
              openResultdModal={openResultdModal}
            />
          ))}
      </NotificationContainer>
    </div>
    <div id='right'>
          <ImageShow img={image ? image: imgUrl}  />
    </div>
      </>
  );
}

const Header = () => (
  <motion.h1 className="pink">
    Tensorflow
    <span className="light-blue"> Project</span>
  </motion.h1>
);

const SubHeader = ({ text }) => <motion.h2 className="sub-header">{text}</motion.h2>;

const   ModalContainer = ({ children, label }) => (
  <AnimatePresence
    initial={false}
    exitBeforeEnter={true}
    onExitComplete={() => framerLogger(label)}
  >
    {children}
  </AnimatePresence>
);

export default App;
