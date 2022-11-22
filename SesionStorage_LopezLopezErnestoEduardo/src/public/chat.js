const {denormalize , schema}=window.normalizr
const author = new schema.Entity('authors')
const message = new schema.Entity('messages',{author:author})
const chat = new schema.Entity('chat',{author:author,content:[message]})
const socket=io(
    {autoConnect:false}
);
    let USER = JSON.parse(localStorage.getItem('User'));
    let NAME = JSON.parse(localStorage.getItem('Name'));
    let LASTNAME= JSON.parse(localStorage.getItem('Lastname'));
    let AGE = JSON.parse(localStorage.getItem('Age'));
    let AVATAR = JSON.parse(localStorage.getItem('Avatar'));
    let ALIAS= JSON.parse(localStorage.getItem('Alias'));
    let user;
    let userName;
    let userLastname;
    let userAge;
    let userAlias;
    let userAvatar
    let userEmail
    let messagechat=[]

    function sweetAlert(){
        (async () => {
        let i=1
        while(i==1){
            const  { value: formValues } = await Swal.fire({
                title: 'Access (all fields are NEEDED)',
                html:
                  '<p>email</p>' +
                  '<input id="swal-input0" class="swal2-input">'+
                  '<p>Name</p>' +
                  '<input id="swal-input1" class="swal2-input">'+
                  '<p>Lastame</p>' +
                  '<input id="swal-input2" class="swal2-input">' +
                  '<p>age</p>' +
                  '<input type="number" id="swal-input3" class="swal2-input">'+
                  '<p>Avatar URL</p>' +
                  '<input id="swal-input4" class="swal2-input">'+
                  '<p>Alias</p>' +
                  '<input id="swal-input5" class="swal2-input">',
                focusConfirm: false,
                preConfirm: () => {
                    let email=document.getElementById('swal-input0').value
                    let name=document.getElementById('swal-input1').value
                    let lastname=document.getElementById('swal-input2').value
                    let age=document.getElementById('swal-input3').value
                    let avatar=document.getElementById('swal-input4').value
                    let alias=document.getElementById('swal-input5').value
                  return [email,name,lastname,age,avatar,alias]
                }
              })
       
                if (formValues) {
                    
                    if (formValues[0]!==''&&formValues[1]!==''&&formValues[2]!==''&&formValues[3]!==''&&formValues[4]!==''&&formValues[5]!==''){
                    localStorage.setItem('User', JSON.stringify(formValues[0]));
                    localStorage.setItem('Name', JSON.stringify(formValues[1]));
                    localStorage.setItem('Lastname', JSON.stringify(formValues[2]));
                    localStorage.setItem('Age', JSON.stringify(formValues[3]));
                    localStorage.setItem('Avatar', JSON.stringify(formValues[4]));
                    localStorage.setItem('Alias', JSON.stringify(formValues[5]));
                    i=0;
                    userEmail=formValues[0]
                    userName=formValues[1]
                    userLastname=formValues[2]
                    userAge=formValues[3]
                    userAvatar=formValues[4]
                    userAlias=formValues[5]
                    socket.connect();
                    socket.emit('messagereq')
                    socket.emit('Charreq')}
                    else{
                        await Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'All fields are needed!'
                          })
                    }
                }
            }
      
        })()
      }

    
if(USER===null || NAME===null || LASTNAME===null || AGE===null || AVATAR===null ||ALIAS===null){
    sweetAlert()
}else{
    userEmail=USER
    userName=NAME 
    userLastname=LASTNAME
    userAge=AGE
    userAvatar=AVATAR
    userAlias=ALIAS
    socket.connect();
    socket.emit('messagereq')
    socket.emit('Charreq')
}


const ChatBox = document.getElementById('mymessage')
ChatBox.addEventListener('keyup',evt=>{ 
    if(evt.key==="Enter"){
        if(ChatBox.value.trim().length>0){
            const currentDate =new Date().toLocaleString()
            socket.emit('message',{author:{id:userEmail,name:userName ,lastname:userLastname ,age:userAge ,alias:userAlias,avatar:userAvatar},message:ChatBox.value, date:currentDate})
            ChatBox.value=''
        }
    }
})

socket.on('log',data=>{
    let log=document.getElementById('log_chat')
    let data1=denormalize(data.result,chat,data.entities)
    let messages=`<div ><p style="width:35px">no normalizado:${ (new TextEncoder().encode(JSON.stringify(data))).length}</p>
    <p style="color:brown"> normalizado: ${ (new TextEncoder().encode(JSON.stringify(data1))).length} </p> </div>`
    
    for(let i=0;i<data1.content.length;i++){
        messages=messages+`<div style="display:inline-flex"><img style="width:35px" src="${data1.content[i].author.avatar}">  </img><p style="color:brown"> ${data1.content[i].date} </p> <p style="color:blue; font-weight:bold"> ${data1.content[i].author.alias} </p> <p style="font-style: italic;color:green"> ${data1.content[i].message}</p></div><br>`
    }
    log.innerHTML=messages;
    
})

const CharBox = document.getElementById('sendNewChar')

CharBox.addEventListener('click',evt=>{ 
    evt.preventDefault()
    let titles= document.getElementById('title').value
    let prices= document.getElementById('price').value
    let thumbnails= document.getElementById('thumbnail').value
    if(titles!==''&&prices!==''&&thumbnails!==''){
    socket.emit('characters',{title:titles,price:prices,thumbnail:thumbnails})
    document.getElementById('title').value=''
    document.getElementById('price').value=''
    document.getElementById('thumbnail').value=''}
    else{
        alert('Ingrese todos los datos')
    }
}) 

socket.on('logchar',datachar=>{
    let char=document.getElementById('log_character')
    let Characterss=''
    for(let i=0;i<datachar.contentchar.length;i++){
        Characterss=Characterss+`<div>Character: ${datachar.contentchar[i].title} </p> <p> Reward: $ ${datachar.contentchar[i].price} </p> <img style="width:150px" src="${datachar.contentchar[i].thumbnail}"></img></div><br>`
    }

    char.innerHTML=Characterss;

}
)


