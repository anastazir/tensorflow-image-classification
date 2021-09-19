export const handleUrl = (text, setImgUrl, setNotifications, add, style, notifications) =>{
    fetch(`newRoute/${text}`).then((response) =>{ //make predictions
      setImgUrl(text)
      console.log(response);
      if(response.ok){
        console.log('Ok');
          return response.json()
      }
  }).then(data =>{ 
      console.log("data---",data.data); // save the predictions in ans 
      // setNotifications(add(notifications, text, style, ans))
      return data.data
    }).then(data =>{
      console.log("data----------",data);
      const ans = data;
      setNotifications(add(notifications, text, style, ans))
    })
  }