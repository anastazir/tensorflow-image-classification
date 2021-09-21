export   const encodeFileBase64 = (file, setFileBase64String) => {
    var reader = new FileReader();
    console.log(file);
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        // console.log(Base64);
        setFileBase64String(Base64);
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
};

export const switchAns = (data) =>{
  if (data==='Mask'){
    data= data+' 😷'
  }else if (data==='No Mask'){
    data=data+' 😃' 
  }else if (data==='Female'){
    data=data+' 👩'
  }else if (data==='Male'){
    data=data+' 👨'
  }
  return data;
}