import { Router } from 'express'
import * as checkoutCtrl from '../controllers/checkout.controller'




const router = Router()

router.post('/', checkoutCtrl.createCheckout)

export default router
