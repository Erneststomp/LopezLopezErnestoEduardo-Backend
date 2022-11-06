import {Router} from 'express'
const router = new Router()
import {productsController} from '../controllers/products.contoller.js'
import {adminAuth} from '../middleware/SecurityManager.js'


// Delete Product List
router.delete('/', adminAuth, productsController.deleteProductList)

// Get Product List & Get Product by ID
router.get('/:pid?', async (req,res)=>{
        if(req.params.pid != undefined) {
            productsController.getProductById(req,res)
        }else{
            productsController.getAllProductList(req,res)
        }
})

// Add New Product
router.post('/',adminAuth ,productsController.addNewProduct)
// Edit Product by ID
router.put('/:pid',adminAuth ,productsController.updatetProductById)
// Delete Product by ID
router.delete('/:pid',adminAuth,productsController.deleteProductById)





// import { Router } from "express"
// import { Characters } from '../public/data/manager.js';
// import {adminAuth} from '../midleware/SecurityManager.js'

// const Contenedor = new Characters();

// const router=Router();
// let allCharacters = await Contenedor.getAll()

//     router.get('/', async (req, res) => {
//         res.send(allCharacters)
//     })
    
//     router.get('/:id', async (req, res) => {
//         let idData=parseInt(req.params.id);
//         if (isNaN(idData))return res.status(400).send("Debe ingresar un numero")
//         if(parseInt(idData)<1||parseInt(idData)>allCharacters.length) return res.status(400).send("No se puede encontrar al Pokemon")
//         allCharacters.find(object =>{
//             if(object.id===parseInt(idData)){
//                 res.send(object)
//             }
//         });

//     })  

//     router.post('/',adminAuth,(req,res)=>{
//         let newTitle  = req.body.title
//         let newPrice = req.body.price
//         let ids = allCharacters.map(object => {
//             return object.id;
//           });
//           let newId = Math.max(...ids)+1;
//           let newObject={title:newTitle,id:newId,price:newPrice,thumbnail:''}
//           console.log(newObject)
//           allCharacters.push(newObject)
//           Contenedor.SaveCharacter(newObject)
//           console.log(allCharacters)

//         res.send({title:newTitle,id:newId,price:newPrice})
//     })

//     router.put('/',adminAuth,(req,res)=>{
//         let idProduct=parseInt(req.body.id);
//         let stockProduct=parseInt(req.body.stock);
//         let priceProduct=parseInt(req.body.price);
//         let currentPokemon=allCharacters.find(object =>object.id===idProduct);
//         currentPokemon.stock=stockProduct
//         currentPokemon.price=priceProduct
//         Contenedor.SaveCharacter1(allCharacters)
//         res.send(currentPokemon)
//     })



//     router.delete('/:id',adminAuth,(req,res)=>{
//         let ids = allCharacters.map(object => {
//             return object.id;
//           });
//           let newId = Math.max(...ids);

//         if(parseInt(req.params.id)<1||parseInt(req.params.id)>newId) return res.status(400).send("El id que solicita no se encuentra registrado")
//         let newObject = allCharacters.filter(data => data.id != parseInt(req.params.id));
//         console.log(newObject);
//         allCharacters=newObject;
//         console.log(allCharacters)
//         res.send(allCharacters)
          
//         Contenedor.SaveCharacter1(allCharacters)
//     })
    




export default router; 