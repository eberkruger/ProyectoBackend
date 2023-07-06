import { productModel } from '../models/products.model.js'

export default class ProductManagerDB {

  getAll = async () => {
    const products = await productModel.find().lean()

    if (products) {
      return products
    } else {
      return []
    }
  }

  getById = async (id) => {
    const product = await productModel.findOne({ _id: id }).lean()

    if (!product) {
      return { status: 'error', error: 'Product not found' }
    } else {
      return product
    }
  }

  getByCode = async (code) => {
    const product = await productModel.find({ code: code })
    if (product.length) {
      return { status: 'error', error: 'The code is repeted' }
    }
  }

  createProduct = async (product) => {
    const saveProduct = await productModel.create(product)
    return saveProduct
  }

  updateById = async (id, product) => {
    const productUpdate = await productModel.updateOne({ _id: id }, product)
    return productUpdate
  }

  deleteById = async (id) => {
    const product = await productModel.deleteOne({ _id: id })
    return product
  }

}