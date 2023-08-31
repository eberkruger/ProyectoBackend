export default class ProductsService {
  constructor(dao) {
    this.dao = dao
  }

  getAllProducts = () => {
    return this.dao.getAllProducts()
  }

  getAll = (limit, page, sort, query) => {
    return this.dao.getAll(limit, page, sort, query)
  }

  getById = (id) => {
    return this.dao.getById(id)
  }

  getByCode = (code) => {
    return this.dao.getByCode(code)
  }

  createProduct = (product) => {
    return this.dao.createProduct(product)
  }

  updateById = (id, product) => {
    return this.dao.updateById(id, product)
  }

  deleteById = (id) => {
    return this.dao.deleteById(id)
  }
}