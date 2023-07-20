import { Router } from "express"

import MessagesManagerDB from '../dao/mongo/messages.dbManager.js'
import ProductManagerDB from '../dao/mongo/products.dbManager.js'
import CartsManagerDB from '../dao/mongo/cartsManager.js'

const router = Router()
const messagesManagerDB = new MessagesManagerDB()
const productManagerDB = new ProductManagerDB()
const cartsManagerDB = new CartsManagerDB()

/* home */
router.get('/', async (req, res) => {
  const { limit = 4, page, sort, query } = req.query
  const products = await productManagerDB.getAll(limit, page, sort, query)

  console.log(products)

  const url = '/?'
  products.prevLink = products.hasPrevPage ? `${url}page=${products.prevPage}` : null
  products.nextLink = products.hasNextPage ? `${url}page=${products.nextPage}` : null

  res.render('home', {
    style: 'home.css',
    title: 'Home',
    products: products.docs,
    pagination: products
  })
})

/* realTimeProducts */
router.get('/realtimeproducts', async (req, res) => {
  const { limit, page, sort, query } = req.query
  const { docs } = await productManagerDB.getAll(limit, page, sort, query)
  //const products = await productManagerDB.getAll()

  res.render('realTimeProducts', {
    style: 'realTimeProducts.css',
    title: 'Real Time Products',
    products: docs,
  })
})

/* Carts */
router.get('/carts/:cid', async (req, res) => {
  const cartId = req.params.cid

  try{
      const cart = await cartsManagerDB.getCartById(cartId)
      console.log(cart)
      res.status(200).render('cart', {
          style: "cart.css",
          title: "Cart",
          cart: cart
      })

  }catch(error){
      res.status(500).send(`Error trying to fetch cart data: ${error}`)
  }
})

/* chat */
router.get('/chat', async (req, res) => {
  const messages = await messagesManagerDB.getAllMessages()

  res.render('chat', {
    style: 'chat.css',
    title: 'Chat',
    messages: messages,
  })
})

export default router;