import { Router } from 'express'
import * as OrdersCtrl from '../controllers/orders.controller.js'
import { authJwt } from '../middlewares'

const router = Router()

router.post('/', [authJwt.verifyToken], OrdersCtrl.createOrder)

router.get('/', [authJwt.verifyToken], OrdersCtrl.getOrdersByUser)

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], OrdersCtrl.getOrders)



export default router

