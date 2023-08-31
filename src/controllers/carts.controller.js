import { cartService } from '../services/index.service.js'

const getCarts = async (req, res) => {
  try {
    const carts = await cartService.getCarts()
    res.status(200).json({ carts })

  } catch (error) {
    console.log(`Error al trtar de obtener los carritos en cart.router/router.get: ${error}`)
    res.status(500).send(`Internal server error trying to get carts: ${error}`)
  }
}

const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid
    const cart = await cartService.getCartById(cid)
    res.status(200).json({ cart })

  } catch (error) {
    console.log(`Error al tratar de obtener el carrito por ID en router.get:cid: ${error}`)
    res.status(500).send(`Internal server error trying to get cart by id: ${error}`)
  }
}

const addCart = async (req, res) => {
  try {
    const product = req.body
    const newCart = await cartService.addCart(product)
    console.log(newCart)
    res.status(200).json({ newCart })

  } catch (error) {
    console.log(`Error al tratar de crear el carrito en router.post: ${error}`);
    res.status(500).send(`Internal server error trying create cart: ${error}`)
  }
}

const addProduct = async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const currentCart = await cartService.addProduct(cid, pid)
    res.status(202).json(currentCart)

  } catch (error) {
    console.log(`Error al tratar de agregar producto al carrito en router.post:cid:pid: ${error}`)
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`)
  }
}

const deleteAllProductsOfCart = async (req, res) => {
  try{
    const cid = req.params.cid
    const currentCart = await cartService.deleteAllProductsOfCart(cid)
    res.status(202).json(currentCart)

  }catch(error){
    console.log(`Error al tratar de eliminar los productos en router.delete: ${error}`)
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`)
  }
}

const updateAllProducts = async (req, res) => {
  try {
    const cid = req.params.cid
    const updatedProducts = req.body
    const currentCart = await cartService.updateAllProducts(cid, updatedProducts)
    res.status(202).json(currentCart)

  } catch (error) {
    console.log(`Error al tratar de agregar un producto al carrito: ${error}`)
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`)
  }
}

const updateQuantity = async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const { updatedQuantity } = req.body
    const currentCart = await cartService.updateQuantity(cid, pid, updatedQuantity)
    res.status(202).json(currentCart)

  } catch (error) {
    console.log(`Error al tratar de actualizar la cantidad del produto en el carrito en router.put:pid:pid: ${error}`)
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`)
  }
}

export default {
  getCarts,
  getCartById,
  addCart,
  addProduct,
  deleteAllProductsOfCart,
  updateAllProducts,
  updateQuantity,
}