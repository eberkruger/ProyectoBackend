import { Router } from 'express'
import CartsManagerDB from '../dao/mongo/cartsManager.js'

const router = Router()
const cartsManagerDB = new CartsManagerDB()

router.get('/', async (req, res) => {
  try {
    const carts = await cartsManagerDB.getCarts()
    res.status(200).json({ carts })

  } catch (error) {
    console.log(`Error al trtar de obtener los carritos en cart.router/router.get: ${error}`)
    res.status(500).send(`Internal server error trying to get carts: ${error}`)
  }
})

router.get('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid
    const cart = await cartsManagerDB.getCartById(cid)
    res.status(200).json({ cart })

  } catch (error) {
    console.log(`Error al tratar de obtener el carrito por ID en router.get:cid: ${error}`)
    res.status(500).send(`Internal server error trying to get cart by id: ${error}`)
  }
})

router.post('/', async (req, res) => {
  try {
    const product = req.body
    const newCart = await cartsManagerDB.addCart(product)
    console.log(newCart)
    res.status(200).json({ newCart })

  } catch (error) {
    console.log(`Error al tratar de crear el carrito en router.post: ${error}`);
    res.status(500).send(`Internal server error trying create cart: ${error}`)
  }
})

router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const currentCart = await cartsManagerDB.addProduct(cid, pid)
    res.status(202).json(currentCart)

  } catch (error) {
    console.log(`Error al tratar de agregar producto al carrito en router.post:cid:pid: ${error}`)
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`)
  }
})

router.put('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid
    const updatedProducts = req.body
    const currentCart = await cartsManagerDB.updateAllProducts(cid, updatedProducts)
    res.status(202).json(currentCart)

  } catch (error) {
    console.log(`Error al tratar de agregar un producto al carrito: ${error}`)
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`)
  }
})

router.put('/:pid/products/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const { updatedQuantity } = req.body
    const currentCart = await cartsManagerDB.updateQuantity(cid, pid, updatedQuantity)
    res.status(202).json(currentCart)

  } catch (error) {
    console.log(`Error al tratar de actualizar la cantidad del produto en el carrito en router.put:pid:pid: ${error}`)
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`)
  }
})

router.delete('/:cid', async (req, res) => {
  try{
    const cid = req.params.cid
    const currentCart = await cartsManagerDB.deleteAllProductsOfCart(cid)
    res.status(202).json(currentCart)

  }catch(error){
    console.log(`Error al tratar de eliminar los productos en router.delete: ${error}`)
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`)
  }
})

export default router