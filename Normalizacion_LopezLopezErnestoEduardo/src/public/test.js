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
        socket.emit('test')
    });
}else{
    userName=USER
    socket.connect();
    socket.emit('test')
}


socket.on('logtest',logtest=>{
    console.log(logtest)
    let char=document.getElementById('log_character')
    let Characterss=''
    for(let i=0;i<logtest.length;i++){
        Characterss=Characterss+`<div> ${logtest[i].title} </p> <p> ${logtest[i].price} </p> <img src="${logtest[i].thumbnail}"></img></div><br>`
    }
    char.innerHTML=Characterss;}
    
)


