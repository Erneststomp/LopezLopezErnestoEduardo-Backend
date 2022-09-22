import { Router } from "express";
import { Characters } from '../public/data/manager.js';
const router= Router();
const Contenedor = new Characters();

router.get('/', async(req,res)=>{
    let characters =  await Contenedor.getAll()
    res.render('chat.handlebars')
})




export default router; 