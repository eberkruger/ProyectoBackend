import { Router } from "express"
import productsController from '../controllers/products.controller.js'

const router = Router()

router.get('/', productsController.getAll)

router.get('/:pid', productsController.getById)

router.post('/', productsController.createProduct)

router.put("/:pid", productsController.updateById)

router.delete("/:pid", productsController.deleteById)

export default router



