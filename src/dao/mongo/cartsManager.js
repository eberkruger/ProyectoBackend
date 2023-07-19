import cartModel from '../models/carts.model.js'

export default class CartsManagerDB {

  getCarts = async () => {
    try {
      const carts = await cartModel.find().populate('products.product')
      return carts

    } catch (error) {
      console.log(`Error al tratar de obtener los carritos en CartsManagerDB/getCarts: ${error}`)
    }
  }

  getCartById = async (id) => {
    try {
      const cart = await cartModel.findById(id).lean().populate('products.product')
      return cart

    } catch (error) {
      console.log(`Error al tratar de obtener el carrito por ID en CartsManagerDB/getCartById: ${error}`)
    }
  }

  addCart = async (cart) => {
    const idProduct = cart.product.trim()
    const quantityProduct = Number(cart.quantity)

    if (quantityProduct < 1 || idProduct.length < 1) return

    const formattedCart = {
      products: [{ product: idProduct, quantity: quantityProduct }]
    }
    try {
      const newCart = new cartModel(formattedCart)
      await newCart.save()
      return newCart

    } catch (error) {
      console.log(`Error al tratar de agregar carrrito en CartsManagerDB/addCart: ${error}`)
    }
  }

  addProduct = async (cid, pid) => {
    const newProduct = { product: pid, quantity: 1 }
    try {
      const cart = await cartModel.findById(cid)
      const indexProduct = cart.products.findIndex((item) => item.product == pid)

      if (indexProduct < 0) {
        cart.products.push(newProduct)
      } else {
        cart.products[indexProduct].quantity += 1
      }

      await cart.save()
      return cart

    } catch (error) {
      console.log(`Error al tratar de agregar un producto al carrito en CartsManagerDB/addProduct: ${error}`)
    }
  }

  deleteProductOfCart = async (cid, pid) => {
    try {
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { product: pid } } },
        { new: true }
      ).populate("products.product")

      if (updatedCart) {
        return updatedCart
      } else {
        return 'Product not found in the cart.'
      }

    }catch(error){
      console.log(`Error al tratar de eliminar el producto del carrito en CartsManagerDB/deleteProductOfCart: ${error}`)
    }
  }

  deleteAllProductsOfCart = async (cid) => {
    try {
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cid },
        { $set: { products: [] } },
        { new: true }
      ).populate("products.product")

      if (updatedCart) {
        return updatedCart
      } else {
        return 'No products found in the cart.'
      }

    } catch (error) {
      console.log(`Error al tratar de eliminar todos los productos en CartsManagerDB/deleteAllProductsOfCart: ${error}`)
    }
  }

  updateAllProducts = async (cid, products) => {
    try {
      await this.deleteAllProductsOfCart(cid)
      await products.forEach((product) => {
        this.addProduct(cid, product.id)
      })

      return this.getCartById(cid)

    } catch (error) {
      console.log(`Error al tratar de actualizar los productos en CartsManagerDB/updateAllProducts: ${error}`)
    }
  }

  updateQuantity = async (cid, pid, updatedQuantity) => {
    try {
      const currentCart = await this.getCartById(cid)
      const indexProduct = currentCart.products.findIndex((item) => item.product.toString() === pid)
  
      if (indexProduct !== -1) {
        currentCart.products[indexProduct].quantity = updatedQuantity
        await currentCart.save()
        return currentCart
      } else {
        return 'Product not found on cart'
      }
    } catch (error) {
      console.log(`Error al tratar de actualizar la cantidad del producto en CartsManagerDB/updateQuantity: ${error}`)
    }
  }

}