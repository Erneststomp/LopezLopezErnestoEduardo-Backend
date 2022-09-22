import express from "express";
import usersRouter from './routes/users.routes.js'

const app =express();
const server = app.listen(8080,()=>console.log('Its Working'))
app.use(express.json())
app.use('/api',usersRouter )
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send("<h1>Bienvenido a Express</h1>")

})