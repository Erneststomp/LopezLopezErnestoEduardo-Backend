import express from "express";
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/cart.routes.js'
import mainRouter from "./routes/main.router.js";


const app =express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>
    console.log(`Server running on: http://localhost:${server.address().port}/`))





app.use(express.json())
app.use(express.static('public'))


app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use('/api',mainRouter)


app.get('/',(req,res)=>{
    res.send("<h1>Bienvenido a Express</h1>")
})