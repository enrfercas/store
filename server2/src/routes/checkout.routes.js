import { Router } from 'express'
import * as checkoutCtrl from '../controllers/checkout.controller'

import { authJwt } from '../middlewares'


const router = Router()

router.post('/', checkoutCtrl.createCheckout)

export default router