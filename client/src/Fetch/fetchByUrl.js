import { switchAns } from "../helper/helperFunctions";
let newImage=null
export const handleUrl = (text, setNotifications, add, style, notifications, setPredicting, openResultdModal) =>{
  setPredicting(true)
  fetch(`${style}/urlRoute/${text}`).then((response) =>{ //make predictions
    if(response.ok){
      return response.json()
    }
  })
  .catch((error) =>{
    console.log("error-->", error);
    setPredicting(false)
  })
  .then(data =>{ 
      console.log("data---",data.data); 
      return data.data
    })
    .catch((error) =>{
      console.log("error in second catch is-->", error);
    })
    .then(data =>{
      if (Array.isArray(data)){
        console.log('array found');
        openResultdModal(data)
      }else{
        const ans = switchAns(data);  // save the predictions in ans 
        setNotifications(add(notifications, text, style, ans))
      }
      setPredicting(false)
    })
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
  setPredicting(true)
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
    await fetch(`/testing/cropped-image`, {
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