import ProductManagerDB from "../dao/mongo/products.dbManager"
import CartsManagerDB from "../dao/mongo/cartsManager"
import UsersManagerDB from "../dao/mongo/usersManager"
import MessagesManagerDB from "../dao/mongo/messages.dbManager"
import productsService from "./products.service"
import cartsService from "./carts.service"
import usersService from "./users.service"
import messageService from "./messages.service"

export const productService = new productsService(new ProductManagerDB)
export const cartService = new cartsService(new CartsManagerDB)
export const userService = new usersService(new UsersManagerDB)
export const messageService = new messageService(new MessagesManagerDB)