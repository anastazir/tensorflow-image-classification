/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from                  "react";
import { useSelector } from               'react-redux';
import { AnimatePresence, motion } from   "framer-motion";
import validator from                     'validator';
import Notification from                  "./components/Notification";
import Input from                         "./components/Input";
import Modal from                         "./components/Modal";
import ImageShow from                     "./components/ImageShow/ImageShow";
import NotificationContainer from         "./hooks/NotificationContainer";
import ThreeDotsWave from                 "./components/Loading/ThreeDotsWave";
import Sidebar from                       "./components/Sidebar/index";
import Select from                        "./components/Select/Select";
import CropImage from                     "./components/CropImage/CropImage";
import SelectType from                    "./components/Select/SelectType";
import ResultDisplay from                 "./components/ResultDiv/index";
import Header from                        "./components/Header/Header";
import { randomImages } from              "./helper/randomImages";
import { useDispatch } from               "react-redux";
import { updateImage } from               "./actions/image";
import { compressFile } from              "./helper/compressFile";
import { predictFile, predictImage } from "./actions/modal";

function App() {
  const dispatch = useDispatch();
  const [base64, setbase64] = useState(null)
  const loading = useSelector((state) => state.modalReducer.loading);
  const openModal = useSelector((state) => state.modalReducer.openModal);
  const messages = useSelector((state) => state.notificationReducer.notificationList)
  let uploadedImage= null
  //Toggle Crop 
  const [isCrop, setIsCrop] = useState(false);
  // Modal type
  const [modalType, setModalType] = useState("dropIn");
  // Set Coordinates
  const [coordinates, setCoordinates] = useState([])

  // Notification text
  const [text, setText] = useState("");
  const handleText = (e) =>{
    setText(e.target.value)
    dispatch(updateImage(e.target.value))
  };

  // Option style
  const [style, setStyle] = useState("everything");
  const handleStyle = (e) => setStyle(e.target.value);
  // Category style
  const [category, setCategory] = useState("showAll");
  const handleCategory = (e) => setCategory(e.target.value);
  // Notification position
  const position= 'bottom'

  const onImageFileChange= async (e) =>{

    if((e.target.files && e.target.files[0])) {
      uploadedImage= e.target.files[0]

      dispatch(updateImage(URL.createObjectURL(e.target.files[0])))

      const file = await compressFile(uploadedImage)
      setbase64(file[0].data);
    }
  }
  
  const predictImageFile = async () =>{
    const [dx, dy, dHeight, dWidth]= coordinates
    console.log(coordinates);
    console.log(base64.slice(0, 5));
    const formData = {
      'dx'  : Math.floor(dx),
      'dy': Math.floor(dy),
      'dHeight': Math.floor(dHeight),
      'dWidth': Math.floor(dWidth),
      "base64" : base64,
      'isCropped': isCrop, 
    }
    setModalType('result')
    dispatch(predictFile(formData, style))
  }

  const readFromClipboard = async ()=>{
    const clipboardText = await navigator.clipboard.readText();
    setText(clipboardText)
    dispatch(updateImage(clipboardText))
  }

  const validateUrl = () =>{
    if(text){
      if (validator.isURL(text)){
        if(!loading){
          const [dx, dy, dHeight, dWidth]= coordinates
          const formData = {
            "url" : text,
            'dx'  : Math.floor(dx),
            'dy': Math.floor(dy),
            'dHeight': Math.floor(dHeight),
            'dWidth': Math.floor(dWidth),
            'isCropped': isCrop,
          }
          setModalType('result')
          dispatch(predictImage(formData, style))
        }
      }
      else{
        setModalType('invalid')
        dispatch({type : "OPEN"})
      }
    }else{
      setModalType('emptyInput')
      dispatch({type : "OPEN"})
    }
  }

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
          onClick={predictImageFile}>
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
          {  loading ? 
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
                  dispatch(updateImage(url))}}>
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
        {openModal && (
          <Modal text={modalType} type = {modalType}/>
        )}
      </ModalContainer>

      <NotificationContainer position={position}>
        {messages &&
          messages.map((notification, index) => (
            <Notification
              key={index}
              notification={notification}
            />
          ))
        }
      </NotificationContainer>
    </div>
    <div id='right'>
      {!isCrop && <ImageShow />}
      {isCrop && !openModal && <CropImage setCoordinates={setCoordinates} />}
    </div>
    <ResultDisplay />
  </>
  );
}

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