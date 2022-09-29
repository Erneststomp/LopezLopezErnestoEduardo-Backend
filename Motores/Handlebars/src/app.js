import express from "express";
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.routes.js'
const app =express();
const server = app.listen(8080,()=>console.log('Its Working'))
app.use(express.json())

//motor
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.urlencoded({extended:true}))
app.use('/',viewsRouter)