import { Router } from 'express'
import UsersManagerDB from '../dao/mongo/usersManager.js'

const router = Router()
const usersManagerDB = new UsersManagerDB

router.post('/register', async (req, res) => {
  const { email } = req.body
  let emailRegistered = await usersManagerDB.isEmailRegistered(email)
  if (emailRegistered) {
    return res.status(400).send({ status: 'Error', message: 'El correo electrónico ya está registrado.' })
  }

  let newUser = await usersManagerDB.createUser(req.body)
  res.send({ status: 'success', payload: newUser })
})

router.get('/all', async (req, res) => {
  const users = await usersManagerDB.getAllUsers()
  res.send(users)
})

router.post('/login', async (req, res) => {
  let userLogin = req.body

  try {
    let allUsers = await usersManagerDB.getAllUsers()

    let userFound = allUsers.find(us => {
      return us.email === userLogin.email && us.password === userLogin.password
    })

    if (userLogin.email === 'adminCoder@coder.com' && userLogin.password === 'coder123') {
      req.session.user = {
        name: 'Admin',
        email: '...',
        role: 'admin'
      }
      return res.status(200).send({ status: 'success', payload: 'admin' })
    }

    if (userFound) {
      req.session.user = {
        name: userFound.first_name + ' ' + userFound.last_name,
        email: userFound.email.toLowerCase(),
        role: userFound.role
      }
    } else {
      return res.status(400).send({ status: 'Error', payload: 'Credenciales incorrectas' })
    }

    return res.status(200).send({ status: 'success', payload: 'Credenciales correctas' })
  } catch (error) {
    console.error('Error al obtener los usuarios:', error)
    return res.status(500).send({ status: 'Error', payload: 'Error interno del servidor' })
  }
})

router.get('/logout', async (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(400).send({ status: 'Error', payload: err })
    res.redirect('/login')
  })
})

export default router