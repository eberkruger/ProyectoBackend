import fs from 'fs'

export default class ProductManager {

  constructor(path) {
    this.path = path
  }

  addProduct = async (obj) => {
    try {
      const products = await this.getProducts()

      const product = {
        title: obj.title,
        description: obj.description,
        code: obj.code,
        price: Number(obj.price),
        stock: Number(obj.stock),
        category: obj.category,
        thumbnails: [obj.thumbnails],
        status: obj.status,
      }

      if (products.length === 0) {
        product.id = 1
      } else {
        product.id = products[products.length - 1].id + 1
      }

      products.push(product)

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')
      console.log('Producto agregado correctamente')

      return product

    } catch (error) {
      console.log('Error en addProduct', error)
    }
  }

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const dataParse = JSON.parse(data)
        
        return dataParse

      } else {
        return []
      }

    } catch (error) {
      console.log('Error en getProducts', error)
    }
  }

  getProductById = async (id) => {
    try {
      const products = await this.getProducts()
      const product = products.find((prod) => prod.id === id)
      
      if (!product) {
        console.log("El producto no existe")
        return undefined
      } else {
        console.log(`El producto con el ID ${id} es: ${product.title}`)
        return product;
      }

    } catch (error) {
      console.log('Erorr en getProductById', error)
    }
  }

  updateProduct = async (id, obj) => {
    try {
      const products = await this.getProducts()
      const productBuscado = await this.getProductById(id)

      const product = { ...productBuscado, ...obj }

      const indexProduct = products.findIndex((prod) => prod.id === id)
      products.splice(indexProduct, 1)

      products.push(product)
      
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

      const productsList = await this.getProducts()
      console.log(productsList)

      return product

    } catch (error) {
      console.log('Error en updateProduct', error)
    }
  }

  deleteById = async (id) => {
    try {
      const products = await this.getProducts()
      const index = products.findIndex((prod) => prod.id === id)
  
      if (index !== -1) {
        products.splice(index, 1)
      } else {
        console.log("El producto no se encuentra")
        return
      }
  
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
  
      const productsList = await this.getProducts()
      console.log(productsList)
      
    } catch (error) {
      console.log('Error en deleteById', error)
    }
  }

  deleteAll = async () => {
    try {
      if (fs.existsSync(this.path)) {
        await fs.promises.unlink(this.path)
        console.log("Todos los elementos borrados exitosamente")
      } else {
        console.log("No hay elementos a eliminar")
      }

    } catch (error) {
      console.log(error)
    }
  }
}