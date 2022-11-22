const socket=io(
    {autoConnect:false}
);

// const LoginBox = document.getElementById('send')
// LoginBox.addEventListener('click',evt=>{ 
//     evt.preventDefault()
//         let email=document.getElementById('email').value
//         let name=document.getElementById('name').value
//         let lastname=document.getElementById('lastname').value
//         let age=document.getElementById('age').value
//         let avatar=document.getElementById('avatar').value
//         let alias=document.getElementById('alias').value
//     if(email!==''&&name!==''&&lastname!==''&&age!==''&&avatar!==''&&alias!==''){
//     document.getElementById('name').value=''
//     document.getElementById('lastname').value=''
//     document.getElementById('email').value=''
//     document.getElementById('age').value=''
//     document.getElementById('avatar').value=''
//     document.getElementById('alias').value=''
//     socket.connect();
//     socket.emit('login',{id:email,name:name ,lastname:lastname ,age:age ,alias:alias,avatar:avatar})
// }
//     else{
//         alert('Ingrese todos los datos')
//     }
// }) 

// socket.on('login',login=>{
    
// })