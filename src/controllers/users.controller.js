import { userService } from "../services/index.service.js"

const register = async (req, res) => {
  res.send({ status: 'success', message: 'User Registered' })
}

const registerError = async (req, res) => {
  res.status(400).json({ status: 'Error', error: req.session.messages })
}

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.send(users)
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ status: 'error', error: 'Invalid Credentials' })
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role
    }
    res.send({ status: 'success', message: 'Login success' })
  } catch (error) {
    console.log(error)
  }
}

const loginError = async (req, res) => {
  try {
    if (!req.session) { return res.status(400).json({ message: 'Sesión no encontrada' }) }

    if (req.session.messages) { if (req.session.messages.length > 4) { return res.status(400).json({ message: 'Cantidad de intentos superada' }) } }

    res.status(400).json({ status: 'Error', error: req.session.messages })
  } catch (error) {
    console.log(error)
  }
}

const logout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) return res.status(400).send({ status: 'Error', payload: err })
      res.redirect('/login')
    })
  } catch (error) {
    console.log(error)
  }
}

const github = async (req, res) => {
  try {
    res.send({ status: 'success', mesagge: 'User registered' })
  } catch (error) {
    console.log(error)
  }
}

const githubcallback = async (req, res) => {
  try {
    req.session.user = req.user
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}

const current = async (req, res) => {
  try {
    const user = req.session.user
    return res.send({ status: 'success', user })
  } catch (error) {
    console.log(error)
  }
}

export default {
  register,
  registerError,
  getAllUsers,
  login,
  loginError,
  logout,
  github,
  githubcallback,
  current
}

