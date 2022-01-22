import {Router} from 'express'
import * as productsCtrl from '../controllers/products.controller'
import { authJwt } from "../middlewares"
const router  = Router()

router.post('/', [authJwt.verifyToken, authJwt.isModerator],productsCtrl.createProducts)
router.get('/',productsCtrl.getProducts)
router.get('/:productId',productsCtrl.getProductById)
router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.updateProductById)
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin],productsCtrl.deleteProductById)


export default router