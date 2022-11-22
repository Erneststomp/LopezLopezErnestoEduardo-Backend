import { Router } from "express";
import session, {Cookie} from "express-session";
import MongoStore from "connect-mongo";
const router= Router();

router.get('/', async(req,res)=>{
    
    if(req.session.user){
        let sesionUser=req.session.user
        res.render('chat.handlebars',{userData:sesionUser})
    }else{
        res.redirect('/login');
    }
    
})

router.post('/', async(req,res)=>{
    res.redirect('/logout');
})

router.post('/logout', async(req,res)=>{
    let sesionUser=req.session.user
    res.render('logout.handlebars',{userData:sesionUser})
    req.session.destroy()
})


router.get('/api/productos-test', async(req,res)=>{
    res.render('chattable.handlebars')
})

router.get('/login', async(req,res)=>{
    res.render('login.handlebars')
})

router.post('/login', async(req,res)=>{
    let id= req.body.email
    let names= req.body.name
    let lastname= req.body.lastname
    let age= req.body.age
    let avatar= req.body.avatar
    let alias= req.body.alias
    req.session.user={
        id,names,lastname,age,avatar,alias
    }
    res.redirect('/');
})


export default router;  