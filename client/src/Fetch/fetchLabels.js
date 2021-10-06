
export const getLabel = async (style, setLabels) => {
    console.log('predicting');
    fetch(`fetchLabels?labelsType=${style}`).then((response) =>{ //make predictions
        if(response.ok){
          console.log('Ok');
         return response.json()
        }
      }).then(data =>{ 
        // console.log("data---",data.labels); 
        setLabels(data.labels)
      })
}