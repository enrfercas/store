import { Router } from 'express'
import {createCheckout} from '../controllers/checkout.controller'
import * as userCtrl from '../controllers/user.controller'
import { authJwt } from '../middlewares'


const router = Router()

router.post('/',authJwt.verifyToken, createCheckout)

export default router