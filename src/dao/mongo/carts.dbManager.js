import { cartModel } from '../models/carts.model.js'
import ProductManagerDB from './products.dbManager.js'

const productManager = new ProductManagerDB()

export default class CartsManagerDB {

  createCart = async () => {
    const cart = { products: [] }
    const result = await cartModel.create(cart)
    return result
  }

  getById = async (id) => {
    const cart = await cartModel.find({ _id: id }).lean()
    console.log(JSON.stringify(cart, null, '\t'))

    if (!cart) {
      return { status: 'error', error: 'Cart not found' }
    } else {
      return cart
    }
  }

  update = async (id, cart) => {
    const result = await cartModel.updateOne({ _id: id }, cart)
    return result
  }

  addProductToCart = async (cid, pid) => {

    const cart = await cartModel.findOne({ _id: cid })
    const product = await productManager.getById(pid)

    const exist = cart.products.findIndex(pro => pro.product.toString() === product._id.toString())
    console.log(exist)

    if (exist !== -1) {
      cart.products[exist].quantity++
    } else {
      cart.products.push({ product: product._id })
    }

    const result = await this.update(cart._id, cart)
    return result
  }

}