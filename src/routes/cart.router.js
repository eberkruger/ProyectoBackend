import { Router } from 'express'
import cartsController from '../controllers/carts.controller.js'

const router = Router()

router.get('/', cartsController.getCarts)

router.get('/:cid', cartsController.getCartById)

router.post('/', cartsController.addCart)

router.post('/:cid/products/:pid', cartsController.addProduct)

router.put('/:cid', cartsController.updateAllProducts)

router.put('/:pid/products/:pid', cartsController.updateQuantity)

router.delete('/:cid', cartsController.deleteAllProductsOfCart)

export default router