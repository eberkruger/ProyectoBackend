import ProductManagerDB from "../dao/mongo/products.dbManager.js"
import CartsManagerDB from "../dao/mongo/cartsManager.js"
import UsersManagerDB from "../dao/mongo/usersManager.js"
import MessagesManagerDB from "../dao/mongo/messages.dbManager.js"
import productsService from "./products.service.js"
import cartsService from "./carts.service.js"
import usersService from "./users.service.js"
import messageService from "./messages.service.js"

export const productService = new productsService(new ProductManagerDB)
export const cartService = new cartsService(new CartsManagerDB)
export const userService = new usersService(new UsersManagerDB)
export const messagesService = new messageService(new MessagesManagerDB)