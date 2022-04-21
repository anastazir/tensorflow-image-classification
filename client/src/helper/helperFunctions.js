export const switchAns = (data) =>{
  if (data==='Mask'){
    data= data+' 😷'
  }else if (data==='No Mask'){
    data=data+' 😃' 
  }else if (data==='Female'){
    data=data+' 👩'
  }else if (data==='Male'){
    data=data+' 👨'
  }else if (data==='Dog'){
    data=data+' 🐶'
  }else if (data==='Cat'){
    data=data+' 🐱'
  }else if (data==='Happy'){
    data=data+' 😃'
  }else if (data==='Surprise'){
    data=data+' 😮'
  }else if (data==='Angry'){
    data=data+' 👿'
  }else if (data==='Sad'){
    data= data+' 😔'
  }else if (data==='Neutral'){
    data= data+' 😐'
  }
  else if (data==='No Glasses'){
    data=data+' 🙄'
  }
  else if (data==='Glasses'){
    data= data+' 🤓'
  }
  return data;
}