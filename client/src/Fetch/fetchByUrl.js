export const handleUrl = (text, setNotifications, add, style, notifications) =>{
  fetch(`newRoute/${text}`).then((response) =>{ //make predictions
    // console.log(response);
    if(response.ok){
      console.log('Ok');
      return response.json()
    }
  }).then(data =>{ 
      console.log("data---",data.data); // save the predictions in ans 
      return data.data
    }).then(data =>{
      console.log("data----------",data);
      const ans = data;
      setNotifications(add(notifications, text, style, ans))
    })
}

export const handleBase64= (fileBase64String, setNotifications, add, style, notifications, text) =>{
  fetch(`send-image/${fileBase64String}`).then((response) =>{
    console.log(fileBase64String);
    console.log('imageSent');
    return response.json()
  }).then(data =>{
    console.log('data---',data.data);
    return data.data
  }).then (data =>{
    console.log(data);
    const ans = data;
    setNotifications(add(notifications, text, style, ans))
  })
}