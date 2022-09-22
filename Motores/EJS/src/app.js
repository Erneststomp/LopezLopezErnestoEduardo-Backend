import express from "express";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.routes.js"

const app =express();
const server = app.listen(8080,()=>console.log('Its Working'))
app.use(express.json())
app.use(express.static('public'))

//motor
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}))
app.use('/',viewsRouter)