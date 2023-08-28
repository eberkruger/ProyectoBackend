import { productModel } from '../models/products.model.js'

export default class ProductManagerDB {

  getAllProducts = async () => {
    try {
      const products = await productModel.find().lean()
      if (products) {
        return products
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  getAll = async (limit, page, sort, query) => {

    let queryLimit = limit ? Number(limit) : 20
    let queryPage = page ? Number(page) : 1
    let findQuery = query ? { category: query.toLowerCase() } : {}

    let querySort
    if (sort === 'asc') {
      querySort = 1
    } else if (sort === 'desc') {
      querySort = -1
    } else if (sort && sort !== 'asc' && sort !== 'desc') {
      throw new Error('Error: Solo se admite asc o desc')
    }

    try {
      const products = await productModel.paginate(findQuery, { page: queryPage, limit: queryLimit, sort: { price: querySort }, lean: true })
      //console.log(products)
      if (products) {
        return products
      } else {
        return null
      }

    } catch (error) {
      console.log(`Error al tratar de obtener los productos: ${error}`)
      throw error
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