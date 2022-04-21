export const addEmoji = (data) =>{
  switch(data){
    case 'Mask':
      return data+' 😷';
    case 'No Mask':
      return data+' 😃' ;
    case 'Female':
      return data+' 👩';
    case 'Male':
      return data+' 👨';
    case 'Dog':
      return data+' 🐶';
    case 'Cat':
      return data+' 🐱';
    case 'Happy':
      return data+' 😃';
    case 'Surprise':
      return data+' 😮';
    case 'Sad':
      return data+' 😢';
    case 'Angry':
      return data+' 😠';
    case 'Scared':
      return data+' 😱';
    case 'Disgust':
      return data+' 😡';
    case 'Fear':
      return data+' 😨';
    case 'Neutral':
      return data+' 😐';
    case 'No Glasses':
      return data+' 🙄'
    case 'Glasses':
      return data+' 🤓'
    default:
      return data;
  }
}