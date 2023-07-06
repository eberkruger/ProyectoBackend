import { Router } from "express"

import ProductManagerDB from '../dao/mongo/products.dbManager.js'
import CartsManagerDB from '../dao/mongo/carts.dbManager.js'

const router = Router()
const productManagerDB = new ProductManagerDB()
const cartsManagerDB = new CartsManagerDB()

router.post('/', async (req, res) => {
  await cartsManagerDB.createCart()
  res.status(201).json({ mensaje: "Carrito creado con exito" })
})

router.get('/:cid', async (req, res) => {
  const { cid } = req.params
  const cart = await cartsManagerDB.getById(+cid)
  !cart ? res.status(404).json({ error: "Product not found" }) : res.status(200).json(cart)
})

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params
  const product = await productManagerDB.getById(parseInt(pid))

  if (product) {
    const cart = await cartsManagerDB.addProductToCart(parseInt(cid), parseInt(pid))

    !cart ? res.status(404).json({ error: "Product not found" }) : res.status(200).json(cart)
  } else {
    res.status(404).json({ error: "Product not found" })
  }
})

export default router

