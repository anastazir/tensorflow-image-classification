import Compress from 'compress.js';
import { switchAns } from "../helper/helperFunctions";
let newImage=null

export const handleUrl = (text, coordinates, setNotifications, add, style, notifications, setPredicting, openResultdModal, isCrop) =>{
  
  var dx, dy, dHeight, dWidth;
  [dx, dy, dHeight, dWidth]= coordinates

  const formData = new FormData();
  formData.append('isCropped', !isCrop)
  formData.append('dx', Math.floor(dx));
  formData.append('dy', Math.floor(dy));
  formData.append('dHeight', Math.floor(dHeight));
  formData.append('dWidth', Math.floor(dWidth));
  formData.append('url', text)

  const Upload = async() => {
    setPredicting(true)
    await fetch(`/urlRoute/${style}`, {
      method: 'POST',
      body: formData
    }).then(response => {
        response.json().then(data => {
        if (Array.isArray(data.data)){
          openResultdModal(data.data)
        }else{
        const ans = switchAns(data.data);
        let text=''
        setNotifications(add(notifications,text, style, ans))
        }
      })
    })
    setPredicting(false)
  }
  Upload();
}


export const handleUpload=(uploadedImage, coordinates, style, add, notifications, setPredicting, openResultdModal, setNotifications, isCrop) =>{
  const compress= new Compress()
  var [dx, dy, dHeight, dWidth]= coordinates
  newImage= uploadedImage ? uploadedImage : newImage
  console.log(newImage)
  compress.compress([newImage], {
    size: 4, 
    quality: .75,
    maxWidth: 1920, 
    maxHeight: 1920, 
    resize: true,
    rotate: false,
  }).then((data) => {

    const formData = new FormData();
    formData.append('isCropped', !isCrop)
    formData.append('dx', Math.floor(dx));
    formData.append('dy', Math.floor(dy));
    formData.append('dHeight', Math.floor(dHeight));
    formData.append('dWidth', Math.floor(dWidth));
    formData.append('base64', data[0].data);

    const Upload = async() => {
      setPredicting(true)
      await fetch(`upload-image/${style}`, {
        method: 'POST',
        body: formData
      }).then(response => {
          response.json().then(data => {
          if (Array.isArray(data.data)){
            openResultdModal(data.data)
          }else{
          const ans = switchAns(data.data);
          let text=''
          setNotifications(add(notifications,text, style, ans))
          }
        })
      })
      setPredicting(false)
    }
    Upload();
  })
}