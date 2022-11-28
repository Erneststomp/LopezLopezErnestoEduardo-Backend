import { Router } from "express";
import passport from "passport";
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
    if(req.session.user){
        let sesionUser=req.session.user
        req.session.destroy()
        res.render('logout.handlebars',{userData:sesionUser})
        
    }else{
        res.redirect('/login');
    }    
})
router.get('/api/productos-test', async(req,res)=>{
    res.render('chattable.handlebars')
})
router.get('/login', async(req,res)=>{
    res.render('login.handlebars')
})
router.post('/login',passport.authenticate('login',{failureRedirect:'/loginfail'}) ,async(req,res)=>{
    req.session.user={
        id:req.user.id,names:req.user.names, lastname:req.user.lastnames,age:req.user.age,avatar:req.user.avatar,alias:req.user.avatar
    }
    res.redirect('/');
})

router.get('/loginfail', async(req,res)=>{
    res.render('loginfail.handlebars')
})

router.get('/register', async(req,res)=>{
    res.render('register.handlebars')
})
router.post('/register', passport.authenticate('register',{failureRedirect:'/registerfail'}), async(req,res)=>{
    res.redirect('/');
})

router.get('/registerfail', async(req,res)=>{
    res.render('registerfail.handlebars')
})


export default router;  