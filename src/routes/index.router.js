import { Router } from "express"
import products from './products.router.js'
import carts from './cart.router.js'
import views from './views.router.js'
import sessions from './sessions.router.js'

const router = Router()

router.use('/api/products', products)
router.use('/api/carts', carts)
router.use('/api/sessions', sessions)
router.use('/', views)

export default router