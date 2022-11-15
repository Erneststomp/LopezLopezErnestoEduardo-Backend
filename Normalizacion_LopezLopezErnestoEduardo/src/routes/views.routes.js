import { Router } from "express";
const router= Router();

router.get('/', async(req,res)=>{
    res.render('chat.handlebars')
})

router.get('/api/productos-test', async(req,res)=>{
    res.render('chattable.handlebars')
})


export default router; 