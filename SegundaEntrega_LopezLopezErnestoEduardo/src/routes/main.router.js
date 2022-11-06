import {Router} from 'express'
const router= new Router();
import {login,logout} from '../middleware/SecurityManager.js'


router.get('/login', login)

router.get('/logout', logout)

export default router;

