import { Router } from 'express'
import UsersManagerDB from '../dao/mongo/usersManager.js'
import passport from 'passport'

const router = Router()
const usersManagerDB = new UsersManagerDB

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/registerError', failureMessage: true }),
  async (req, res) => {
    console.log(req.message)
    res.send({ status: 'success', message: 'User Registered' })
  })

router.get('/registerError', async (req, res) => {
  res.status(400).json({ status: 'Error', error: req.session.messages })
})

router.get('/all', async (req, res) => {
  const users = await usersManagerDB.getAllUsers()
  res.send(users)
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/loginError', failureMessage: true }),
  async (req, res) => {
    if (!req.user) return res.status(500).send({ status: 'error', error: 'Invalid Credentials' })
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role
    }
    res.send({ status: 'Error', error: 'Login failed' })
  })

router.get('/loginError', (req, res) => {
  if (req.session.messages) {
    if (req.session.messages.length > 4) return res.status(400).json({ message: 'Bloquea los intentos ya!' })
  }
  res.status(400).json({ status: 'Error', error: req.session.messages })
})

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
  res.send({ status: 'success', mesagge: 'User registered' })
})

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
  req.session.user = req.user
  res.redirect('/')
})

router.get('/logout', async (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(400).send({ status: 'Error', payload: err })
    res.redirect('/login')
  })
})

export default router