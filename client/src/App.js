/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useModal from "./hooks/useModal";
import validator from 'validator' // to check if URL is valid

import Notification from "./components/Notification";
import Input from "./components/Input";
import Modal from "./components/Modal";
import { add } from "./helper/arr-utils";
import ImageShow from "./components/ImageShow/ImageShow";
import { handleUrl, handleUpload} from "./Fetch/fetchByUrl";
import NotificationContainer from "./hooks/NotificationContainer";
import ThreeDotsWave from "./components/Loading/ThreeDotsWave";
import {randomImages} from "./helper/randomImages";
import Sidebar from "./components/Sidebar/index"
import Select from "./components/Select/Select"
import CropImage from "./components/CropImage/CropImage"
import SelectType from "./components/Select/SelectType"
import ResultDisplay from "./components/ResultDiv/index"

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

  // Option style
  const [style, setStyle] = useState("everything");
  const handleStyle = (e) => setStyle(e.target.value);
  // Category style
  const [category, setCategory] = useState("showAll");
  const handleCategory = (e) => setCategory(e.target.value);
  // Notification position
  const position= 'bottom'

  const [predicting, setPredicting] = useState(false)

  const [imageShown, setImageShown] = useState(null)

  const onImageFileChange= (e) =>{
    if(e.target.files && e.target.files[0]) {
      uploadedImage= e.target.files[0]
      setImage(URL.createObjectURL(e.target.files[0]))
        console.log(uploadedImage)
        setImageShown(uploadedImage)
      }
    handleUpload(uploadedImage, coordinates, style, add, notifications, setPredicting, openResultdModal, setNotifications, isCrop)
  }

  const openResultdModal = (data) =>{
    setModalType('result')
    setResultData(data)
    open()
  }

  const readFromClipboard =async ()=>{
    const clipboardText = await navigator.clipboard.readText();
    setImage(clipboardText)
    setText(clipboardText)
    setImgUrl(clipboardText)
  }

  const validateUrl = () =>{
    if(text){
      if (validator.isURL(text)){
        setImgUrl(text)
        if(!predicting){
          handleUrl(text, coordinates, setNotifications, add, style, notifications, setPredicting, openResultdModal, isCrop);
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

  useEffect(() =>{
    setImageShown(imgUrl)
  }, [imgUrl])

  useEffect(() =>{
    setImageShown(image)
  }, [image])

  console.log('coordinates are:', coordinates);

  return (
  <>
    <Sidebar style= {style} />
    <Header />
    <div id="left">
      <motion.main>
        <SubHeader text="Select Category" />
        <SelectType handleCategory={handleCategory}/> 
        <br />  
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
        <Input
          placeHolder="Add image URL 🚀"
          value={text}
          onChange={handleText}
        />
        <br />
        <SubHeader text="Select type of Classification" />
        <Select handleStyle={handleStyle} category={category}/>
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
                  setImage(url)
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
              <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="crop-button"
              onClick={()=>{setIsCrop(!isCrop)}}>
              Toggle Crop
              </motion.button> 
            </>
          }
        </div>
      </motion.main>

      <ModalContainer>
        {modalOpen && (
          <Modal modalOpen={modalOpen} text={modalType} type={modalType} handleClose={close} data={resultData} img={image}/>
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
          ))
        }
      </NotificationContainer>
    </div>
    <div id='right'>
      {isCrop && <ImageShow img={imageShown}  />}
      {!isCrop && !modalOpen && <CropImage url= {imageShown ? imageShown: imgUrl} setCoordinates={setCoordinates} />}
    </div>
    <ResultDisplay data={resultData} handleClose={close} />
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

const ModalContainer = ({ children }) => (
  <AnimatePresence
    initial={false}
    exitBeforeEnter={true}
  >
    {children}
  </AnimatePresence>
);

export default App;
