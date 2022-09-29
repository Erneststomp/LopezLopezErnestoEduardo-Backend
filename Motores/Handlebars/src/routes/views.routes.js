import { Router } from "express";
import { Characters } from '../public/data/manager.js';
const router= Router();
const Contenedor = new Characters();

router.get('/',(req,res)=>{
    res.render('welcome.handlebars')
})

router.get('/users', async(req,res)=>{
    let characters =  await Contenedor.getAll()
    res.render('users',{characters})
})


router.post('/', async(req, res) => {
    try {
        const newObject = {
            title: req.body.title,
            price: req.body.price,
            especie: req.body.especie,
            thumbnail: req.body.thumbnail,
        }
        console.log(newObject)
        await Contenedor.SaveCharacter(newObject)
        res.redirect('/')
    }catch (error) {
        console.log('ERROR')
    }
})
    



export default router; 