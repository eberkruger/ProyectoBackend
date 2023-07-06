import { Router } from "express"

import MessagesManagerDB from '../dao/mongo/messages.dbManager.js'
import ProductManagerDB from '../dao/mongo/products.dbManager.js'

const router = Router()
const messagesManagerDB = new MessagesManagerDB()
const productManagerDB = new ProductManagerDB()

/* home */
router.get('/', async (req, res) => {
  const products = await productManagerDB.getAll()

  res.render("home", {
    style: "home.css",
    title: "Home",
    products: products,
  })
})

/* realTimeProducts */
router.get('/realtimeproducts', async (req, res) => {
  const products = await productManagerDB.getAll()

  res.render("realTimeProducts", {
    style: "realTimeProducts.css",
    title: "Real Time Products",
    products: products,
  })
})

/* chat */
router.get("/chat", async (req, res) => {
  const messages = await messagesManagerDB.getAllMessages()

  res.render("chat", {
    style: "chat.css",
    title: "Chat",
    messages: messages,
  })
})

export default router