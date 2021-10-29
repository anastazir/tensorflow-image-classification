import { switchAns } from "../helper/helperFunctions";
let newImage=null

export const handleUrl = (text, setNotifications, add, style, notifications, setPredicting, openResultdModal) =>{
  
  const formData = new FormData();
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


export const handleUpload=(uploadedImage, style, add, notifications, setPredicting, openResultdModal, setNotifications) =>{
  
  setPredicting(true)
  const formData = new FormData();
  newImage= uploadedImage ? uploadedImage : newImage
  formData.append('file', newImage);
  const Upload = async() => {
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
  }
  Upload();
  setPredicting(false)
}

export const handleCroppedImage =(text, coordinates, style, add, notifications, setPredicting, openResultdModal, setNotifications) =>{
  
  var dx, dy, dHeight, dWidth;
  [dx, dy, dHeight, dWidth]= coordinates
  console.log('coordinates in fetch are', coordinates);
  const formData = new FormData();
  formData.append('dx', Math.floor(dx));
  formData.append('dy', Math.floor(dy));
  formData.append('dHeight', Math.floor(dHeight));
  formData.append('dWidth', Math.floor(dWidth));
  formData.append('url', text)
  const Upload = async() => {
    setPredicting(true)
    await fetch(`/cropped-image/${style}`, {
      method: 'POST',
      body: formData
    }).then(response => {
      response.json().then(data => {
        setPredicting(false)
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