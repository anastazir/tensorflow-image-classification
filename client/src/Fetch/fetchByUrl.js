import { switchAns } from "../helper/helperFunctions";

export const handleUrl = (text, setNotifications, add, style, notifications, setPredicting) =>{
  setPredicting(true)
  fetch(`${style}/urlRoute/${text}`).then((response) =>{ //make predictions
    if(response.ok){
      console.log('Ok');
      return response.json()
    }
  }).then(data =>{ 
      console.log("data---",data.data); 
      return data.data
    }).then(data =>{
      console.log("data----------",data);
      if (Array.isArray(data)){
        console.log('array found');
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