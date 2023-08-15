import { Router } from "express"
import { authorization } from "../middlewares/auth.js"

import MessagesManagerDB from '../dao/mongo/messages.dbManager.js'
import ProductManagerDB from '../dao/mongo/products.dbManager.js'
import CartsManagerDB from '../dao/mongo/cartsManager.js'
import UsersManagerDB from '../dao/mongo/usersManager.js'

const router = Router()
const messagesManagerDB = new MessagesManagerDB()
const productManagerDB = new ProductManagerDB()
const cartsManagerDB = new CartsManagerDB()
const usersManagerDB = new UsersManagerDB()


/* home */
router.get('/', authorization('USER'), async (req, res) => {
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
    pagination: products,
    user: req.session.user
  })
})

/* realTimeProducts */
router.get('/realtimeproducts', authorization('USER'), async (req, res) => {
  const { limit, page, sort, query } = req.query
  const { docs } = await productManagerDB.getAll(limit, page, sort, query)
  //const products = await productManagerDB.getAll()

  res.render('realTimeProducts', {
    style: 'realTimeProducts.css',
    title: 'Real Time Products',
    products: docs,
    user: req.session.user,
  })
})

/* Carts */
router.get('/carts/:cid', authorization('USER'), async (req, res) => {
  const cartId = req.params.cid

  try {
    const cart = await cartsManagerDB.getCartById(cartId)
    console.log(cart)
    res.status(200).render('cart', {
      style: "cart.css",
      title: "Cart",
      cart: cart
    })

  } catch (error) {
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

/* Sessions */
router.get('/register', async (req, res) => {
  res.render('register', {
    style: 'home.css'
  })
})

router.get('/login', async (req, res) => {
  res.render('login', {
    style: 'home.css'
  })
})

router.get('/profile', authorization('USER'), async (req, res) => {
  res.render('profile', {
    user: req.session.user,
    style: 'home.css',
  })
})



export default router;