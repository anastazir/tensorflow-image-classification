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

const glassesClassification=[
    "https://images.unsplash.com/photo-1525782795125-0668803f3e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyNHx8cGVvcGxlJTIwd2l0aCUyMGdsYXNzZXN8ZW58MHx8fHwxNjMyNzU5NTU3&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxN3x8cGVvcGxlJTIwd2l0aCUyMGdsYXNzZXN8ZW58MHx8fHwxNjMyNjc5ODEz&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1575096611627-a9906523ae71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxOXx8cGVvcGxlJTIwd2l0aCUyMGdsYXNzZXN8ZW58MHx8fHwxNjMyNjc5ODEz&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1524255684952-d7185b509571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyfHxwZW9wbGUlMjB3aXRoJTIwZ2xhc3Nlc3xlbnwwfHx8fDE2MzI2Nzk3NzU&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzfHxwZW9wbGUlMjB3aXRoJTIwZ2xhc3Nlc3xlbnwwfHx8fDE2MzI2Nzk3NzU&ixlib=rb-1.2.1&q=80&w=400",
]

const birdsClassification=[
    "https://images.unsplash.com/photo-1470114716159-e389f8712fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxiaXJkc3xlbnwwfHx8fDE2MzMxMDc4MzI&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzfHxiaXJkc3xlbnwwfHx8fDE2MzMxMDc4MzI&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw2fHxiaXJkc3xlbnwwfHx8fDE2MzMxMDc4MzI&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1550741442-4c6d93cc55d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxOHx8c21hbGwlMjBiaXJkc3xlbnwwfHx8fDE2MzMxMDgwOTE&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1551147823-7e172fc2c3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxzZWElMjBiaXJkc3xlbnwwfHx8fDE2MzMxMTA2Nzk&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1566524370065-754aab613f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMnx8c2VhJTIwYmlyZHN8ZW58MHx8fHwxNjMzMTEwNzE2&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1467811884194-ae868cd3f090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw3fHxvd2xzfGVufDB8fHx8MTYzMzExMDc2NA&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1579264688258-c0ebf8c7942a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMHx8b3dsc3xlbnwwfHx8fDE2MzMxMTA3NjQ&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1574085975030-5f26d9af6c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyN3x8b3dsc3xlbnwwfHx8fDE2MzMxMTA4ODk&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1609828435263-e9dc691d630b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw0fHxjcm93c3xlbnwwfHx8fDE2MzMxMTA5NjQ&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1580837891788-fef93e237445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyMHx8Y3Jvd3N8ZW58MHx8fHwxNjMzMTEwOTkx&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1584498324218-27d9b43f5cf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxDQU5BUll8ZW58MHx8fHwxNjMzMTExMDUy&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1585696831151-eb3f7abe4a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzfHxFTVV8ZW58MHx8fHwxNjMzMTExMTI3&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1614679300434-bc6abe424a54?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1174&q=80",
    "https://images.unsplash.com/photo-1573048036322-f2aea734a8a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1106&q=80",
    "https://images.unsplash.com/photo-1583667127237-4661a24be4fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1470619549108-b85c56fe5be8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80",
    "https://images.unsplash.com/photo-1606081165491-3384c9156db9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=994&q=80",
]

const foodClassification=[
    "https://images.unsplash.com/photo-1609133378235-75f149474f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxSYXZpb2xpfGVufDB8fHx8MTYzMzg1MDkzOA&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1546010361-3b7b468209e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxfHxCZWVmJTIwVGFydGFyZXxlbnwwfHx8fDE2MzM4NTA5NTk&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyfHxDaG9jb2xhdGUlMjBDYWtlfGVufDB8fHx8MTYzMzg1MTA2Mg&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1615915848347-5ad361d3e9fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyfHxDaHVycm9zfGVufDB8fHx8MTYzMzg1MTA5MA&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1621703032174-11ac4f2ef71e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxfHxCcmVhZCUyMFB1ZGRpbmd8ZW58MHx8fHwxNjMzODUxMTE1&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1614777986387-015c2a89b696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyfHxTcGFnaGV0dGklMjBCb2xvZ25lc2V8ZW58MHx8fHwxNjMzODUxMjUw&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1545809278-56c8739d74e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw1fHxEdW1wbGluZ3N8ZW58MHx8fHwxNjMzODUxMzAz&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw0fHxTdHJhd2JlcnJ5JTIwU2hvcnRjYWtlfGVufDB8fHx8MTYzMzg1MTM5MQ&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1624001934657-640af7e2c599?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw4fHxUaXJhbWlzdXxlbnwwfHx8fDE2MzM4NTE0NTk&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1568051243851-f9b136146e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxfHxXYWZmbGVzfGVufDB8fHx8MTYzMzg1MTUxOQ&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1579349443343-73da56a71a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyfHxHbm9jY2hpfGVufDB8fHx8MTYzMzg1MTY0Ng&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1585461276010-aff0f3dcd48f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzfHxGcmVuY2glMjBUb2FzdHxlbnwwfHx8fDE2MzM4NTE2ODQ&ixlib=rb-1.2.1&q=80&w=400",
    "https://images.unsplash.com/photo-1620019989549-bbb873b6612d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyfHxHdWFjYW1vbGV8ZW58MHx8fHwxNjMzODUxNzUw&ixlib=rb-1.2.1&q=80&w=400"
]

const animalClassification=[
"https://images.unsplash.com/photo-1557912407-eb2900cf49e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxNHx8YnV0dGVyZmx5fGVufDB8fHx8MTYzNTcwMjI1OQ&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1529190854500-fb19a9f851c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxNXx8TW90aHxlbnwwfHx8fDE2MzU3MDIyNzI&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1534829942-6f3792b99514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxMXx8c3RhcmZpc2h8ZW58MHx8fHwxNjM1NzAyMjk5&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1597305526414-f2f172412ed1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxN3x8c2hhcmt8ZW58MHx8fHwxNjM1NzAyMzI1&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1629100393327-a3a1550354fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxNXx8YmF0fGVufDB8fHx8MTYzNTcwMjM0OA&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1623721611706-8fe7385003ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwxM3x8Q2F0ZXJwaWxsYXJ8ZW58MHx8fHwxNjM1NzAyMzYz&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1624866684411-68b329c0dd96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyNHx8ZG9scGhpbnxlbnwwfHx8fDE2MzU3MDI0MDg&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1559041881-74dd9fd9b600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyM3x8dHVydGxlfGVufDB8fHx8MTYzNTcwMjQzNw&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1571043733612-d5444ff7d4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyOHx8dHVydGxlfGVufDB8fHx8MTYzNTcwMjQzNw&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1545411686-d80c95a45f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwyOXx8c2VhbHxlbnwwfHx8fDE2MzU3MDI0NTM&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1577617126614-fbe0997986cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzNHx8bGl6YXJkfGVufDB8fHx8MTYzNTcwMjU1NA&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1550700757-67374b7eca7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzMnx8U3F1aXJyZWx8ZW58MHx8fHwxNjM1NzAyNTY3&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1595659807720-763d958eec07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHwzNXx8dGlnZXJ8ZW58MHx8fHwxNjM1NzAyNjAz&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1629812456605-4a044aa38fbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw0M3x8bGlvbnxlbnwwfHx8fDE2MzU3MDI2NDE&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1515504198372-0f0d2baf1feb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw0OHx8b3h8ZW58MHx8fHwxNjM1NzAyNjU2&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1590670730655-f85de131a1dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw0NHx8Ym9hcnxlbnwwfHx8fDE2MzU3MDI2ODM&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1590692994802-fc18443010a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw0M3x8Z29yaWxsYXxlbnwwfHx8fDE2MzU3MDI3MDc&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1622020056804-671c3c919fbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw0NHx8T3Jhbmd1dGFufGVufDB8fHx8MTYzNTcwMjczMA&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1553445297-8bfd1c0ecfd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw0M3x8a29hbGF8ZW58MHx8fHwxNjM1NzAyNzg2&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1588008090012-71ba054d1620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw0Mnx8emVicmF8ZW58MHx8fHwxNjM1NzAyODA2&ixlib=rb-1.2.1&q=80&w=400",
"https://images.unsplash.com/photo-1628103833085-ce37a6c335b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw0OXx8aGFyZXxlbnwwfHx8fDE2MzU3MDI4NTU&ixlib=rb-1.2.1&q=80&w=400",
]

const randomIntFromInterval=(min=0, max=8)=> { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export const randomImages=(style)=>{
    if (style==='genderClassification'){
        return genderClassification[randomIntFromInterval(0 ,genderClassification.length)]  
    }else if(style==='catvsDog'){
        return catvsDog[randomIntFromInterval(0 ,8)]
    }else if(style==='emotionClassification' || style==='everything' || style==='glassesClassification' || style==='ageClassification'){
        const concat= [...emotionClassification, ...genderClassification, ...glassesClassification]
        return concat[randomIntFromInterval(0 ,concat.length)] 
    }else if (style==='birdsClassification'){
        return birdsClassification[randomIntFromInterval(0, birdsClassification.length)]
    }else if (style==='foodClassification'){
        return foodClassification[randomIntFromInterval(0 ,foodClassification.length)]
    }else if (style==='animalClassification'){
        return animalClassification[randomIntFromInterval(0 ,animalClassification.length)]
    }
};
