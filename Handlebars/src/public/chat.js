const socket=io(
    {autoConnect:false}
);
    let USER = JSON.parse(localStorage.getItem('User'));
    console.log(USER)
if(USER===null){
  Swal.fire({
    title: 'Log In',
    input: 'email',
    inputPlaceholder: 'Set your email address',
    allowOutsideClick: false,
    allowEscapeKey: false,
    })
    .then(result => {
        userName = result.value
        localStorage.setItem('User', JSON.stringify(userName));
        socket.connect();
        socket.emit('messagereq')
        socket.emit('Charreq')
    });
}else{
    userName=USER
    socket.connect();
    socket.emit('messagereq')
    socket.emit('Charreq')
}

  
let user;
let messagechat=[]

const ChatBox = document.getElementById('mymessage')
ChatBox.addEventListener('keyup',evt=>{ 
    if(evt.key==="Enter"){
        if(ChatBox.value.trim().length>0){
            const currentDate =new Date().toLocaleString()
            console.log(currentDate)
            socket.emit('message',{user:userName,message:ChatBox.value, date:currentDate})
            ChatBox.value=''
        }
    }
})

socket.on('log',data=>{
    let log=document.getElementById('log_chat')
    let messages=''
    data=JSON.parse(data)
    for(let i=0;i<data.length;i++){
        messages=messages+`<div style="display:inline-flex"><p style="color:brown"> ${data[i].date} </p> <p style="color:blue; font-weight:bold"> ${data[i].user} </p> <p style="font-style: italic;color:green"> ${data[i].message}</p></div><br>`
    }

    log.innerHTML=messages;
    
})




const CharBox = document.getElementById('sendNewChar')

CharBox.addEventListener('click',evt=>{ 
    evt.preventDefault()
    let titles= document.getElementById('title').value
    let prices= document.getElementById('price').value
    let especies= document.getElementById('especie').value
    let thumbnails= document.getElementById('thumbnail').value
    if(titles!==''&&prices!==''&&especies!==''&&thumbnails!==''){
    socket.emit('characters',{title:titles,price:prices,especie:especies,thumbnail:thumbnails})
    document.getElementById('title').value=''
    document.getElementById('price').value=''
    document.getElementById('especie').value=''
    document.getElementById('thumbnail').value=''}
    else{
        alert('Ingrese todos los datos')
    }
})

socket.on('logchar',datachar=>{
    let char=document.getElementById('log_character')
    let Characterss=''
    datachar=JSON.parse(datachar)
    for(let i=0;i<datachar.length;i++){
        Characterss=Characterss+`<div> ${datachar[i].title} </p> <p> ${datachar[i].price} </p> <p> ${datachar[i].especie}</p> <img src="${datachar[i].thumbnail}"></img></div><br>`
    }

    char.innerHTML=Characterss;
    
})
