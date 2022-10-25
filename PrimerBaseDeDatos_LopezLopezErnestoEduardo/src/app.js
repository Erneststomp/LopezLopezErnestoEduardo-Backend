import express from "express";
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.routes.js'
import { Server } from "socket.io";
import fs from 'fs';
import Messages1 from "./public/data/Messages1.js";
import Characters from "./public/data/Characters.js";

const app =express();
const PORT =   process.env.PORT || 8080;
const server = app.listen(PORT,()=>{
    Messages1.createMessagesTable()
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
        await Messages1.addNewMessage(data);
        const log= await Messages1.getAllMessages();
        io.emit('log',log)
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


