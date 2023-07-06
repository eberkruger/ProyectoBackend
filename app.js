import express  from 'express'
import handlebars from 'express-handlebars'
import http from 'http'
import { Server } from 'socket.io'
import __dirname from './src/utils.js'
import mongoose from 'mongoose'


import ProductManager from './src/dao/fs/productManager.js'
const productManager = new ProductManager('./src/files/products.json')


const PORT = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = new Server(server)

/* middlewares */
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* handlebars */
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

try {
  await mongoose.connect('mongodb+srv://eberkruger:zU415sC6F3UgAK1d@backendcoder.je3pu0q.mongodb.net/ecommerce')
  console.log('Connected to DB')
} catch (error) {
  console.log(error)
}

/* server */
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



