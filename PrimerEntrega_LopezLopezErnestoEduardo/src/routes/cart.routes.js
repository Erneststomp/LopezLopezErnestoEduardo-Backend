import { Router } from "express"
import { Carts } from '../public/data/cart-manager.js';
import { Characters } from '../public/data/manager.js';
const Pokemons = new Characters();
const Contenedor = new Carts();

const router=Router();
let allCarts = await Contenedor.getAll()
let allPokemons = await Pokemons.getAll()

    router.get('/', async (req, res) => {
        res.send(allCarts)
    }) 

    router.post('/',(req,res)=>{
        let newTimestamp  = Date.now();
        let newId 
        let ids = allCarts.map(object => {
            return object.id;
          });
          let maxid=Math.max(...ids)
        //   if(maxid>allCarts.length-1){ 
        //     console.log('aqui es donde deberiamos poner la copmrpobacion ')
        //   }
        //   else{
            newId = maxid+1;
        //}

          let productsArray= []
          let newObject={id:newId,timestamp:newTimestamp,products:productsArray}
          console.log(newObject)
          allCarts.push(newObject)
          Contenedor.SaveCharacter1(allCarts)
        res.send({id:newId,timestamp:newTimestamp,products:productsArray})
    })

    router.delete('/:pos',(req,res)=>{
        let ids = allCarts.map(object => {
            return object.id;
          });
          let newId = Math.max(...ids);

        if(parseInt(req.params.pos)<1||parseInt(req.params.pos)>newId) return res.status(400).send("El id que solicita no se encuentra registrado")
        let newObject = allCarts.filter(data => data.id != parseInt(req.params.pos));
        console.log(newObject);
        allCarts=newObject;
        console.log(allCarts)
        res.send(allCarts)
        Contenedor.SaveCharacter1(allCarts)
    })
    
    router.get('/:id/products', async (req, res) => {
        let idCart=parseInt(req.params.id);
        if (isNaN(idCart))return res.status(400).send("Debe ingresar un numero")
        if(parseInt(idCart)<1||parseInt(idCart)>allCarts.length) return res.status(400).send("No se puede encontrar el Carrito")   
    
        allCarts.find(object =>{
            if(object.id===parseInt(idCart)){
                res.send(object.products)
            }
        });
    }) 

     router.post('/:id/products', async (req, res) => {
        let idCart=parseInt(req.params.id);
        let idProduct=parseInt(req.body.idp);
        let ammountProduct=parseInt(req.body.ammount);
        let Pokeids = allPokemons.map(object => {
            return object.id;
        });
        let ids = allCarts.map(object => {
            return object.id;
        });
        if(isNaN(idCart))return res.status(400).send("Debe ingresar un numero de carrito")
        if(idCart<1||idCart>(Math.max(...ids))) return res.status(400).send("El id que solicita no se encuentra registrado")
        if(!ids.includes(idCart)) return res.status(400).send("The selected cart was deleted, please choose another cart or create a new one")
        if(!Pokeids.includes(idProduct)) return res.status(400).send("The pokemon you are tying to select couldn't be found, verify the information")
        if(ammountProduct<1)return res.status(400).send("You must add a quantity superior to 1")
        


        let currentCart=allCarts.find(object =>object.id===idCart);
        console.log(currentCart)
        let PokeinCurentCart = currentCart.products.map(object => {
            return object.id;
        });
        if(!PokeinCurentCart.includes(idProduct)){
            let newObject={id:idProduct,ammount:ammountProduct}
            currentCart.products.push(newObject)
        }
        else{
           currentCart.products.forEach(element => {
            if(element.id===idProduct){
                element.ammount=ammountProduct+element.ammount
                console.log(element.ammount)
            }
           });
        }
        Contenedor.SaveCharacter1(allCarts)
        res.send(currentCart)
    })       
 

     router.delete('/:id/products/:pid',(req,res)=>{
        let idCart=parseInt(req.params.id);
        let idProduct=parseInt(req.params.pid);
        let ids = allCarts.map(object => {
            return object.id;
        });
        let Pokeids = allPokemons.map(object => {
            return object.id;
        });
        if(isNaN(idCart))return res.status(400).send("Debe ingresar un numero de carrito")
        if(idCart<1||idCart>(Math.max(...ids))) return res.status(400).send("El id que solicita no se encuentra registrado")
        if(!ids.includes(idCart)) return res.status(400).send("The selected cart was already deleted, please please verify and choose another one or create a new one")
        if(!Pokeids.includes(idProduct)) return res.status(400).send("The pokemon you are tying to select couldn't be found, verify the information")
        let currentCart=allCarts.find(object =>object.id===idCart);
        let currentpokemons = currentCart.products.map(object => {
            return object.id;
        });
        if(!currentpokemons.includes(idProduct)) return res.status(400).send("The pokemon you are tying to delete is not in the cart")
        currentCart.products = currentCart.products.filter(data => data.id != idProduct);
        console.log(currentCart.products)
        Contenedor.SaveCharacter1(allCarts)
        res.send(currentCart)
     })
    


export default router; 