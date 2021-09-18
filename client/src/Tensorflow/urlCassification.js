export const predict = (text) => {
    console.log(text);

    fetch(`send-image/${text}`).then((response) =>{
        console.log(response);
        if(response.ok){
            return response.json()
        }
    }).then(data =>{ 
        console.log("data---",data.data);
        return (data.data)})
}