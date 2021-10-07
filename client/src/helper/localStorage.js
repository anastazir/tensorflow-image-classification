export const getLocalStorage=(style)=>{
    let savedResult= localStorage.getItem('myLabels')
    savedResult= JSON.parse(savedResult)
    for (let i=0; i<savedResult.length; i++) {
        console.log(savedResult[i]);
    }
}