export const getLocalStorage=(style)=>{
    let savedResult= localStorage.getItem('myLabels')
    savedResult= JSON.parse(savedResult)
    if(!savedResult) return false
    for (let i=0; i<savedResult.length; i++) {
        if(savedResult[i].labelName===style){
            return true;
        }
    }
    return false;
}