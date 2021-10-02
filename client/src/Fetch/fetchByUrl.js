import { switchAns } from "../helper/helperFunctions";
let newImage=null
export const handleUrl = (text, setNotifications, add, style, notifications, setPredicting, openResultdModal) =>{
  setPredicting(true)
  fetch(`${style}/urlRoute/${text}`).then((response) =>{ //make predictions
    if(response.ok){
      console.log('Ok');
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
      console.log("data----------",data);
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

export const handleBase64= (fileBase64String, setNotifications, add, style, notifications, text) =>{
  fetch(`${style}/base64/${fileBase64String}`).then((response) =>{
    console.log(fileBase64String);
    console.log('imageSent');
    return response.json()
  }).then(data =>{
    console.log('data---',data.data);
    return data.data
  }).then (data =>{
    console.log(data);
    const ans = switchAns(data);  // save the predictions in ans 
    setNotifications(add(notifications, text, style, ans))
  })
}


export const handleUpload=(uploadedImage) =>{
  const formData = new FormData();
  newImage= uploadedImage ? uploadedImage : newImage
  formData.append('file', newImage);
  const Upload = async() => {
    await fetch('/faceMaskClassification/upload-image', {
      method: 'POST',
      body: formData
    }).then(resp => {
      resp.json().then(data => {console.log(data)})
    })
  }
  Upload();
  console.log("new image is ",newImage);
}