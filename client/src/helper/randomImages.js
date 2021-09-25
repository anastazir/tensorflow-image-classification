const catvsDog=[
    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw4fHxjYXR8ZW58MHx8fHwxNjMyMjg5MzQ4&ixlib=rb-1.2.1&q=80&w=400", // Cat
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw3fHxjYXR8ZW58MHx8fHwxNjMyMjg5MzQ4&ixlib=rb-1.2.1&q=80&w=400", // Cat
    "https://images.unsplash.com/photo-1561948955-570b270e7c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw2fHxjYXR8ZW58MHx8fHwxNjMyMjg5MzQ4&ixlib=rb-1.2.1&q=80&w=400", // Cat
    "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMHx8Y2F0fGVufDB8fHx8MTYzMjI4OTM0OA&ixlib=rb-1.2.1&q=80&w=400", // Cat
    "https://images.unsplash.com/photo-1568572933382-74d440642117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw2fHxkb2dzfGVufDB8fHx8MTYzMjI0ODY5MA&ixlib=rb-1.2.1&q=80&w=400", // Dog
    "https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw3fHxkb2dzfGVufDB8fHx8MTYzMjI0ODY5MA&ixlib=rb-1.2.1&q=80&w=400", // Dog
    "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxM3x8ZG9nc3xlbnwwfHx8fDE2MzIyNDg5NjE&ixlib=rb-1.2.1&q=80&w=400", // Dog
    "https://images.unsplash.com/photo-1540411003967-af56b79be677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyNHx8ZG9nc3xlbnwwfHx8fDE2MzIzMjI3NzY&ixlib=rb-1.2.1&q=80&w=400", // Dog
]

const genderClassification=[
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzfHxtYW58ZW58MHx8fHwxNjMyMzIzMzI0&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw4fHxtYW58ZW58MHx8fHwxNjMyMzIzMzI0&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxNnx8bWFufGVufDB8fHx8MTYzMjMyMzM0Ng&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxN3x8bWFufGVufDB8fHx8MTYzMjMyMzM0Ng&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1560535733-540e0b0068b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw1fHxmZW1hbGV8ZW58MHx8fHwxNjMyMzIzMzY5&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1557555187-23d685287bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxmZW1hbGV8ZW58MHx8fHwxNjMyMzIzMzY5&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1524638431109-93d95c968f03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxfHxmZW1hbGV8ZW58MHx8fHwxNjMyMzIzMzY5&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1601931935821-5fbe71157695?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxOXx8ZmVtYWxlfGVufDB8fHx8MTYzMjMyMzM4NA&ixlib=rb-1.2.1&q=80&w=400",
]

const emotionClassification=[
    "https://images.unsplash.com/photo-1548142813-c348350df52b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMDN8fGhhcHB5fGVufDB8fHx8MTYzMjMzMzg4NA&ixlib=rb-1.2.1&q=80&w=400", 
    "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMDl8fGhhcHB5fGVufDB8fHx8MTYzMjMzMzg4NA&ixlib=rb-1.2.1&q=80&w=400", 
    "https://images.unsplash.com/photo-1517677129300-07b130802f46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxOHx8aGFwcHl8ZW58MHx8fHwxNjMyMzMxODc4&ixlib=rb-1.2.1&q=80&w=400", 
    "https://images.unsplash.com/photo-1629131973033-30f604f0434a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzN3x8U3VycHJpc2V8ZW58MHx8fHwxNjMyMzMxODE1&ixlib=rb-1.2.1&q=80&w=400", 
    "https://images.unsplash.com/photo-1498309313100-e308c8946b45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzMHx8U3VycHJpc2V8ZW58MHx8fHwxNjMyMzMxODAy&ixlib=rb-1.2.1&q=80&w=400", 
    "https://images.unsplash.com/photo-1585951237318-e7c78c368687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMXx8U3VycHJpc2V8ZW58MHx8fHwxNjMyMzMxNzI4&ixlib=rb-1.2.1&q=80&w=400", 
    "https://images.unsplash.com/photo-1605879071148-d9ddbff24471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMXx8YW5ncnl8ZW58MHx8fHwxNjMyMzI4MTE0&ixlib=rb-1.2.1&q=80&w=400", 
    "https://images.unsplash.com/photo-1609852234838-147db6815968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw3fHxhbmdyeXxlbnwwfHx8fDE2MzIzMjgwODQ&ixlib=rb-1.2.1&q=80&w=400", 
    "https://images.unsplash.com/photo-1612896488082-7271dc0ed30c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzOHx8ZmFjZXxlbnwwfHx8fDE2MzIzMjgwMTk&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1596215143922-eedeaba0d91c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzM3x8ZmFjZXxlbnwwfHx8fDE2MzIzMjgwMTk&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxmYWNlfGVufDB8fHx8MTYzMjMyNzkwNA&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1610642434201-6cfd5cda24b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMzR8fGVtb3Rpb25zfGVufDB8fHx8MTYzMjQ3ODc2Mg&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1610441995419-a673724a8224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw4N3x8ZW1vdGlvbnN8ZW58MHx8fHwxNjMyNDc4NjI3&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1610642434561-956cd4111f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMDR8fGVtb3Rpb25zfGVufDB8fHx8MTYzMjQ3ODY2OA&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1610642434250-392436bd9fba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMTV8fGVtb3Rpb25zfGVufDB8fHx8MTYzMjQ3ODcxMA&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1610642434685-c2d73045f4c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMjZ8fGVtb3Rpb25zfGVufDB8fHx8MTYzMjQ3ODcyNA&ixlib=rb-1.2.1&q=80&w=400",

]





const randomIntFromInterval=(min=0, max=8)=> { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export const randomImages=(style)=>{
    if (style==='genderClassification'){
        return genderClassification[randomIntFromInterval(0 ,8)]  
    }
    else if(style==='catvsDog'){
        return catvsDog[randomIntFromInterval(0 ,8)]
    }else if(style==='emotionClassification' || style==='everything'){
        return emotionClassification[randomIntFromInterval(0 ,11)] 
    }
};
