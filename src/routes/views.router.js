import { Router } from "express"

import MessagesManagerDB from '../dao/mongo/messages.dbManager.js'
import ProductManagerDB from '../dao/mongo/products.dbManager.js'

const router = Router()
const messagesManagerDB = new MessagesManagerDB()
const productManagerDB = new ProductManagerDB()

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