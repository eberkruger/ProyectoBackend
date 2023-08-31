export default class CartsService {
  constructor(dao) {
    this.dao = dao
  }

  getCarts = () => {
    return this.dao.getCarts()
  }

  getCartById = (id) => {
    return this.dao.getCartById(id)
  }

  addCart = (cart) => {
    return this.dao.addCart(cart)
  }

  addProduct = (cid, pid) => {
    return this.dao.addProduct(cid, pid)
  }

  updateAllProducts = (cid, products) => {
    return this.dao.updateAllProducts(cid, products)
  }

  updateQuantity = (cid, pid, updatedQuantity) => {
    return this.dao.updateQuantity(cid, pid, updatedQuantity)
  }

  deleteProductOfCart = (cid, pid) => {
    return this.dao.deleteProductOfCart(cid, pid)
  }

  deleteAllProductsOfCart = (cid) => {
    return this.dao.deleteAllProductsOfCart(cid)
  }
}