import { Router } from "express"
import ProductManagerDB from '../dao/mongo/products.dbManager.js'

const router = Router()
const productManagerDB = new ProductManagerDB()

router.get('/', async (req, res) => {
  try {
    const { limit, sort, query, page } = req.query
    const products = await productManagerDB.getAll(limit, page, sort, query)
    res.status(200).send(products)
  } catch (error) {
    res.status(500).send(`Error al obtener los productos: ${error}`)
  }
})

router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  const product = await productManagerDB.getById(pid)
  !product ? res.status(404).json({ error: "Product not found" }) : res.status(200).json(product)
})

router.post('/', async (req, res) => {
  const product = req.body
  const { title, description, code, price, thumbnail = [], stock, category, status } = product

  if (title && description && price && status && code && stock && category) {
    const addedProduct = await productManagerDB.createProduct(product)
    !addedProduct
      ? res.status(400).json({ error: 'No se pudo agregar el producto' })
      : res.status(201).json(product)
  } else {
    return res.send({ status: 'Alguno de los campos no fue completado' })
  }
})

router.put("/:pid", async (req, res) => {
  const { pid } = req.params
  const modification = req.body
  const modifiedProduct = await productManagerDB.updateById(pid, modification)
  !modifiedProduct
    ? res.status(400).json({ error: 'No se pudo modificar el producto' })
    : res.status(200).json(modifiedProduct)
})

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params
  const removedProduct = await productManagerDB.deleteById(parseInt(pid))
  !removedProduct
    ? res.status(404).json({ error: "Product not found" })
    : res.status(200).json(removedProduct)
})

export default router



