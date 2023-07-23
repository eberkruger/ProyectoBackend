import { Router } from 'express'
import UsersManagerDB from '../dao/mongo/usersManager.js'

const router = Router()
const usersManagerDB = new UsersManagerDB

router.post('/register', async (req, res) => {
  const { email } = req.body
  const emailRegistered = await usersManagerDB.isEmailRegistered(email)
  if (emailRegistered) {
    return res.status(400).send({ status: 'Error', message: 'El correo electrónico ya está registrado.' })
  }

  const newUser = await usersManagerDB.createUser(req.body)
  res.send({ status: 'success', payload: newUser })
})

router.get('/all', async (req, res) => {
  const users = await usersManagerDB.getAllUsers()
  res.send(users)
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (email === 'adminCoder@coder.com' && password === 'coder123') {
    req.session.usersManagerDB = {
      name: 'Admin',
      email: '...',
      role: 'admin'
    }
    res.status(200).send({ status: 'success', payload: 'Admin' })
  }

  const user = await usersManagerDB.getUser({ email, password })
  if (!user) {
    return res.status(400).send({ status: 'Error', payload: 'Credenciales incorrectas' })
  }
  req.session.usersManagerDB = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    role: user.role
  }
  return res.status(200).send({ status: 'success', payload: 'Credenciales correctas' })
})

router.get('/logout', async (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(400).send({ status: 'Error', payload: err })
    res.redirect('/login')
  })
})

export default router