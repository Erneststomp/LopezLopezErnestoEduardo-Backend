import express from "express";
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/cart.routes.js'


const app =express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>
    console.log(`Server running on: http://localhost:${server.address().port}/`))

const typeofuser=1
// app.use((req,res,next)=>{
// let user = req.query.user;
// console.log(user)

// if (user !==1 || user!==0 || user!=="Admin" || user!=="User"){
//      return res.status(401).send({error:`You need to be Authenticated through url. 
//      adding to the url, whichever direction the key: ?user=n 
//      Where n coul be 0 to login as Admin, 1 as User or you can write
//      Admin or  User between double quotation marks`})
// }
// next();
// })

app.use(express.json())
app.use(express.static('public'))


app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)


app.get('/',(req,res)=>{
    res.send("<h1>Bienvenido a Express</h1>")
})