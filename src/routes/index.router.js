import { Router } from "express"
import products from './products.router.js'
import carts from './cart.router.js'
import views from './views.router.js'

const router = Router()

router.use('/api/products', products)
router.use('/api/carts', carts)
router.use('/', views)

export default router