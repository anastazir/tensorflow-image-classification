import { predict } from "./Tensorflow/urlCassification";

// MacGuyver'd utility to generate && remove notifications
export const remove = (arr, item) => {
  const newArr = [...arr];
  newArr.splice(
    newArr.findIndex((i) => i === item),
    1
  );
  return newArr;
};

let newIndex = 0;
export const add = (arr, text, style) => {
  newIndex = newIndex + 1;
  // --------------
    const ans= fetch(`send-image/${text}`).then((response) =>{
      console.log(response);
      if(response.ok){
          return response.json()
      }
      }).then(data =>{ 
      console.log("data---",data.data);
      return (data.data)})
      // ----------------
  console.log(ans);
  return [...arr, { id: newIndex, text: text, style: style, ans: ans }];
};
