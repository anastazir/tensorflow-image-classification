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
export const add = (arr, text, style, ans) => {
  newIndex = newIndex + 1;
  console.log("ans in utils.js is",ans);
  return [...arr, { id: newIndex, text: text, style: style, ans: ans }];
};
