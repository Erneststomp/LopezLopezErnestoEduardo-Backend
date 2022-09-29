import express from "express";
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.routes.js'
import { Server } from "socket.io";
import fs from 'fs'


const app =express();
const server = app.listen(8080,()=>console.log('Its Working'));
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
        const log=  await fs.promises.readFile('./src/public/data/data2.json','utf-8');
        io.emit('log',log)
    })

    socket.on('message',async(data)=>{
        console.log(data)
        const response =  await fs.promises.readFile('./src/public/data/data2.json','utf-8');
        let datas=JSON.parse(response)  
        datas.push(data);
        await fs.promises.writeFile('./src/public/data/data2.json', JSON.stringify(datas, null, '\t'))
        console.log(datas)
        const log= await fs.promises.readFile('./src/public/data/data2.json','utf-8');
        console.log(log)
        io.emit('log',log)
    })
    
    socket.on('Charreq',async()=>{
        const logchar=  await fs.promises.readFile('./src/public/data/data3.json','utf-8');
        io.emit('logchar',logchar)
    })

    socket.on('characters',async(datachar)=>{
        console.log(datachar)
        const responsechar =  await fs.promises.readFile('./src/public/data/data3.json','utf-8');
        let dataschar=JSON.parse(responsechar)  
        dataschar.push(datachar);
        await fs.promises.writeFile('./src/public/data/data3.json', JSON.stringify(dataschar, null, '\t'))
        console.log(dataschar)
        const logchar= await fs.promises.readFile('./src/public/data/data3.json','utf-8');
        console.log(logchar)
        io.emit('logchar',logchar)
    })






})


