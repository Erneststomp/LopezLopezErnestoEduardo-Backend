import express from "express";
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.routes.js'
import { Server } from "socket.io";
import fs from 'fs';
import testProducts from "./faker.js";
import Messages1 from "./options/FirebaseContainer.js";
import Characters from "./public/data/Characters.js";


const app =express();
const PORT =   process.env.PORT || 8080;
const server = app.listen(PORT,async()=>{
    let existen=await Messages1.getMessage()
    if (existen==0){
        Messages1.createMessagesTable()
        console.log('fue creada')
    }
    // 
    Characters.createProductsTable()
    console.log('Its Working')
});
const io= new Server(server);
app.use(express.json());

//motor
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.urlencoded({extended:true}));
app.use('/',viewsRouter);
app.use(express.static(__dirname+'/public'));

io.on('connection', socket=>{

    socket.on('messagereq',async()=>{
        const log= await Messages1.getAllMessages();
        io.emit('log',log)
    })

    socket.on('message',async(data)=>{
        let log= await Messages1.getAllMessages();
        data.id=Object.keys(log.entities.messages).length+1
        await Messages1.addNewMessage(data);
        log= await Messages1.getAllMessages();
        io.emit('log',log)
    }) 
      
    socket.on('test',async()=>{
        const logtest = await testProducts.getTest();
        io.emit('logtest',logtest)
    }) 

    socket.on('Charreq',async()=>{
        const logchar = await Characters.getAllProduct()
        if(logchar.length == 0) {
            let initialProducts =await fs.promises.readFile('./src/public/data/data3.json','utf-8');
            initialProducts=JSON.parse(initialProducts)
            await Characters.addNewProduct(initialProducts[0])
        }
        io.emit('logchar',logchar) 
    })

    socket.on('characters',async(datachar)=>{
        console.log(datachar)
        await Characters.addNewProduct(datachar)
        const logchar= await Characters.getAllProduct()
        io.emit('logchar',logchar)
    })

})