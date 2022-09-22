import { Router } from "express"
import { Characters } from '../public/data/manager.js';
const Contenedor = new Characters();

const router=Router();
let allCharacters = await Contenedor.getAll()

    router.get('/productos', async (req, res) => {
        res.send(allCharacters)
    })
    
    router.get('/productos/:id', async (req, res) => {
        let idData=parseInt(req.params.id);
        if (isNaN(idData))return res.status(400).send("Debe ingresar un numero")
        if(parseInt(idData)<1||parseInt(idData)>allCharacters.length) return res.status(400).send("No se puede encontrar la palabra deseada")
        
    
        allCharacters.find(object =>{
            if(object.id===parseInt(idData)){
                res.send(object)
            }
        });

    })  

    router.post('/productos',(req,res)=>{
        let newTitle  = req.body.title
        let newPrice = req.body.price
        let ids = allCharacters.map(object => {
            return object.id;
          });
          let newId = Math.max(...ids)+1;
          let newObject={title:newTitle,id:newId,price:newPrice,thumbnail:''}
          console.log(newObject)
          allCharacters.push(newObject)
          Contenedor.SaveCharacter(newObject)
          console.log(allCharacters)

        res.send({title:newTitle,id:newId,price:newPrice})
    })

    
    router.put('/productos/:pos',(req,res)=>{
        if (isNaN(req.params.pos))return res.status(400).send("Debe ingresar un id numerico")
        let ids = allCharacters.map(object => {
            return object.id;
          });
          let newId = Math.max(...ids);

        if(parseInt(req.params.pos)<1||parseInt(req.params.pos)>newId) return res.status(400).send("El id que solicita no se encuentra registrado")
        let newTitle  = req.body.title
        let newPrice = req.body.price
        
        for (const obj of allCharacters) {
            if (obj.id === parseInt(req.params.pos)) {
              obj.title = newTitle;
              obj.price = newPrice;
          
              break;
        }}
        console.log(allCharacters)
        Contenedor.SaveCharacter1(allCharacters)
        res.send({title:newTitle,price:newPrice})

    
    })
    
    router.delete('/productos/:pos',(req,res)=>{
        let ids = allCharacters.map(object => {
            return object.id;
          });
          let newId = Math.max(...ids);

        if(parseInt(req.params.pos)<1||parseInt(req.params.pos)>newId) return res.status(400).send("El id que solicita no se encuentra registrado")
        let newObject = allCharacters.filter(data => data.id != parseInt(req.params.pos));
        console.log(newObject);
        allCharacters=newObject;
        console.log(allCharacters)
        res.send(allCharacters)
          
        Contenedor.SaveCharacter1(allCharacters)
    })
    




export default router; 