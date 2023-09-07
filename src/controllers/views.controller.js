import { productService, cartService, messagesService } from "../services/index.service.js"

const getAllProducts = async (req, res) => {
  const { limit = 4, page, sort, query } = req.query
  const products = await productService.getAll(limit, page, sort, query)

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
}

const realtimeproducts = async (req, res) => {
  const { limit, page, sort, query } = req.query
  const { docs } = await productService.getAll(limit, page, sort, query)
  //const products = await productManagerDB.getAll()

  res.render('realTimeProducts', {
    style: 'realTimeProducts.css',
    title: 'Real Time Products',
    products: docs,
    user: req.session.user,
  })
}

const getCart = async (req, res) => {
  const cartId = req.params.cid

  try {
    const cart = await cartService.getCartById(cartId)
    console.log(cart)
    res.status(200).render('cart', {
      style: "cart.css",
      title: "Cart",
      cart: cart
    })

  } catch (error) {
    res.status(500).send(`Error trying to fetch cart data: ${error}`)
  }
}

const chat = async (req, res) => {
  const messages = await messagesService.getAllMessages()

  res.render('chat', {
    style: 'chat.css',
    title: 'Chat',
    messages: messages,
  })
}

const register = async (req, res) => {
  res.render('register', {
    style: 'home.css'
  })
}

const login = async (req, res) => {
  res.render('login', {
    style: 'home.css'
  })
}

const profile = async (req, res) => {
  res.render('profile', {
    user: req.session.user,
    style: 'home.css',
  })
}

export default {
  getAllProducts,
  realtimeproducts,
  getCart,
  chat,
  register,
  login,
  profile
}