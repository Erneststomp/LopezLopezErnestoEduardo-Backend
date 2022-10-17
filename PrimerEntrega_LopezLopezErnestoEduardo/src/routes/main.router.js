import {Router} from 'express'
const router= new Router();
import {login,logout} from '../midleware/SecurityManager.js'


router.get('/login', login)

router.get('/logout', logout)

export default router;

