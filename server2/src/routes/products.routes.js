import { Router } from 'express'
import * as productsCtrl from '../controllers/products.controller.js'
import { authJwt } from '../middlewares'



const router = Router();

router.get('/', productsCtrl.getProducts);

router.post('/', [authJwt.verifyToken, authJwt.isAdmin] ,productsCtrl.createProduct);

router.get('/:productId', [authJwt.verifyToken] ,productsCtrl.getProductById);

router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.updateProductById);

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById);
                                                                    


export default router

