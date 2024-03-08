import { Router } from 'express'
import * as OrdersCtrl from '../controllers/orders.controller.js'
import { authJwt } from '../middlewares'

const router = Router()

router.post('/', OrdersCtrl.createOrder)

// router.get('/:IdUsuario', [authJwt.verifyToken], OrdersCtrl.getOrdersByUser)

router.get('/', OrdersCtrl.getOrders)

router.get('/:orderId', OrdersCtrl.getOrderById)

router.put('/:orderId', OrdersCtrl.updateOrderById)


export default router

