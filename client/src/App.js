/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useModal from "./hooks/useModal";
import validator from 'validator' // to check if URL is valid

import { framerLogger } from "./stateLogger";
import Notification from "./components/Notification";
import Input from "./components/Input";
import Modal from "./components/Modal";
import { add } from "./arr-utils";
import ImageShow from "./components/ImageShow/ImageShow";
import { handleUrl, handleUpload, handleCroppedImage } from "./Fetch/fetchByUrl";
import NotificationContainer from "./hooks/NotificationContainer";
import ThreeDotsWave from "./components/Loading/ThreeDotsWave";
import {randomImages} from "./helper/randomImages";
import Sidebar from "./components/Sidebar/index"
import Select from "./components/Select/Select"
import CropImage from "./components/CropImage/CropImage"

function App() {
  let uploadedImage= null
  const [image, setImage] = useState(null)    // for image file
  const [imgUrl, setImgUrl] = useState('')    // for image URL
  // Result Data
  const [resultData, setResultData] = useState(["No faces found"])
  //Toggle Crop 
  const [isCrop, setIsCrop] = useState(true)
  // Modal state
  const { modalOpen, close, open } = useModal();
  // Modal type
  const [modalType, setModalType] = useState("dropIn");
  // Set Coordinates
  const [coordinates, setCoordinates] = useState([])
  // Notifications state
  const [notifications, setNotifications] = useState([]);

  // Notification text
  const [text, setText] = useState("");
  const handleText = (e) => setText(e.target.value);

  // Notification style
  const [style, setStyle] = useState("everything");
  const handleStyle = (e) => setStyle(e.target.value);
  // Notification position
  const position= 'bottom'

  const [predicting, setPredicting] = useState(false)

  const onImageFileChange= (e) =>{
    if (e.target.files && e.target.files[0]) {
      uploadedImage= e.target.files[0]
      setImage(URL.createObjectURL(e.target.files[0]))
        console.log(uploadedImage)
      }
    handleUpload(uploadedImage, style, add, notifications, setPredicting, openResultdModal, setNotifications)
  }

  const openResultdModal = (data) =>{
    setModalType('result')
    setResultData(data)
    open()
  }

  const readFromClipboard =async ()=>{
    const clipboardText = await navigator.clipboard.readText();
    setText(clipboardText);
    setImgUrl(clipboardText);
  }

  const validateUrl = () =>{
    if(text){
      if (validator.isURL(text)){
        setImage(null)
        setImgUrl(text)
        if(!predicting){
          if (isCrop){
            handleUrl(text, setNotifications, add, style, notifications, setPredicting, openResultdModal);
          }else{
            handleCroppedImage(text, coordinates, style, add, notifications, setPredicting, openResultdModal, setNotifications)
          }
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

  useEffect(() =>{  // if the no. of notifications is more than 10 then remove the oldest notification
    if(notifications.length > 10){
      notifications.shift()
    }
  }, [notifications])

  console.log('coordinates are:', coordinates);

  return (
    <>
    <Sidebar style= {style} />
    <Header />
    <div id="left">
      <motion.main>
        <SubHeader text="Select File from local directory" />

        <input type="file" name="file" accept="image/*" className="input" onChange={onImageFileChange} /> 
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="save-button"
          onClick={onImageFileChange}>
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

        <Select handleStyle={handleStyle}/>

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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="copy-button"
              onClick={readFromClipboard}>
              Copy From Clipboard
            </motion.button> 
          </>
        }
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="crop-button"
          onClick={()=>{setIsCrop(!isCrop)}}>
          Toggle Crop
        </motion.button> 
    </div>

        
    </motion.main>

      <ModalContainer>
        {modalOpen && (
          <Modal modalOpen={modalOpen} text={modalType} type={modalType} handleClose={close} data={resultData} url={text} localImage={image}/>
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
          {isCrop && <ImageShow img={image ? image: imgUrl}  />}
          {!isCrop && !modalOpen && <CropImage url= {image ? image: imgUrl} setCoordinates={setCoordinates} />}
    </div>
    </>
  );
}

const Header = () => (
  <div style={{textAlign: 'center'}}>

  <motion.h1 className="pink">
    Tensorflow
    <span className="light-blue"> Project</span>
  </motion.h1>
  </div>
);

const SubHeader = ({ text }) => <motion.h2 className="sub-header">{text}</motion.h2>;

const ModalContainer = ({ children, label }) => (
  <AnimatePresence
    initial={false}
    exitBeforeEnter={true}
    onExitComplete={() => framerLogger(label)}
  >
    {children}
  </AnimatePresence>
);

export default App;
