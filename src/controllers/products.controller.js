import { productService } from '../services/index.service.js'

const getAll = async (req, res) => {
  try {
    const { limit = 10, sort, query, page } = req.query
    const products = await productService.getAll(limit, page, sort, query)

    if (page > products.totalPages || page <= 0) {
      return res.status(400).send({ status: 'error', error: 'This page no exist' })
    }

    const url = '/products?'
    products.prevLink = products.hasPrevPage ? `${url}page=${products.prevPage}` : null
    products.nextLink = products.hasNextPage ? `${url}page=${products.nextPage}` : null

    if (products.totalPages > 1) {
      products.totalPagesArray = []
      for (let i = 1; i <= products.totalPages; i++) {
        products.totalPagesArray.push(i)
      }
    }

    res.status(200).send(products)
  } catch (error) {
    res.status(500).send(`Error al obtener los productos: ${error}`)
  }
}

const getById = async (req, res) => {
  try {
    const { pid } = req.params
    const product = await productService.getById(pid)
    !product ? res.status(404).json({ error: "Product not found" }) : res.status(200).json(product)
  } catch (error) {
    console.log(error)
  }
}

const createProduct = async (req, res) => {
  try {
    const product = req.body
    const { title, description, code, price, thumbnail = [], stock, category, status } = product

    if (title && description && price && status && code && stock && category) {
      const addedProduct = await productService.createProduct(product)
      !addedProduct
        ? res.status(400).json({ error: 'No se pudo agregar el producto' })
        : res.status(201).json(product)
    } else {
      return res.send({ status: 'Alguno de los campos no fue completado' })
    }
  } catch (error) {
    console.log(error)
  }
}

const updateById = async (req, res) => {
  try {
    const { pid } = req.params
    const modification = req.body
    const modifiedProduct = await productService.updateById(pid, modification)
    !modifiedProduct
      ? res.status(400).json({ error: 'No se pudo modificar el producto' })
      : res.status(200).json(modifiedProduct)
  } catch (error) {
    console.log(error)
  }
}

const deleteById = async (req, res) => {
  try {
    const { pid } = req.params
    const removedProduct = await productService.deleteById(parseInt(pid))
    !removedProduct
      ? res.status(404).json({ error: "Product not found" })
      : res.status(200).json(removedProduct)
  } catch (error) {
    console.log(error)
  }
}

export default {
  getAll,
  getById,
  createProduct,
  updateById,
  deleteById
}