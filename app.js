import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import http from 'http'
import __dirname from './src/utils.js'
import routers from './src/routes/index.router.js'

import ProductManagerDB from './src/dao/mongo/products.dbManager.js'
import MessagesManagerDB from './src/dao/mongo/messages.dbManager.js'
const productManagerDB = new ProductManagerDB()
const messagesManagerDB = new MessagesManagerDB()


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


/* server */
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/* DB */
try {
  await mongoose.connect('mongodb+srv://eberkruger:zU415sC6F3UgAK1d@backendcoder.je3pu0q.mongodb.net/ecommerce')
  console.log('Connected to DB')
} catch (error) {
  console.log(error)
}

/* routers */
app.use('/', routers)
app.use('/api', routers)

/* webSocket */
io.on('connection', async socket => {
  console.log('Nuevo cliente conectado')

  const products = await productManagerDB.getAll()
  const messages = await messagesManagerDB.getAllMessages()

  socket.emit('products', products)

  socket.on('newProduct', async (data) => {
    const result = await productManagerDB.createProduct(data)
    socket.emit('products', result)
  })

  socket.on("deleteProduct", async (id) => {
    const products = await productManagerDB.deleteById(id)
    socket.emit("products", products)
  })

  socket.emit("messages", messages)

  socket.on("newMessage", async (data) => {
    await messagesManagerDB.addMensagger(data)
    socket.emit("messages", messages)
  })

  socket.on('authenticated', async data => {
    socket.emit('messages', messages)
    console.log(messages)

    socket.broadcast.emit('newUserConnected', data)
})
 
})




