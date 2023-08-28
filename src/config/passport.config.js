import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import userModel from '../dao/models/users.model.js'
import UsersManagerDB from '../dao/mongo/usersManager.js'
import { createHash, isValidPassword } from '../utils.js'
import config from './dotEnv.config.js'

const LocalStrategy = local.Strategy
const user = new UsersManagerDB()

// Función para inicializar Passport y configurar las estrategias
const initializePassport = () => {
  // Estrategia para el registro de usuarios locales
  passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
      const { first_name, last_name, age, email } = req.body

      try {
        // Verificar si el usuario ya existe en la base de datos
        let userFound = await user.getUser({ email: username })
        if (userFound) return done(null, false, { message: 'User already exists' })

        // Verificar si el usuario está registrándose como administrador
        let isAdminRegistration = (email === config.adminEmail && password === config.adminPwd)

        // Crear un nuevo usuario en la base de datos con la contraseña cifrada
        let newUser = {
          first_name,
          last_name,
          email,
          age,
          password: createHash(password),
          role: isAdminRegistration ? 'admin' : 'user'
        }

        let result = await user.createUser(newUser)
        done(null, result)

      } catch (error) {
        done(`Error getting user: ${error}`)
      }
    }))

  // Estrategia para el inicio de sesión de usuarios locales
  passport.use('login', new LocalStrategy({ usernameField: 'email' },
    async (username, password, done) => {
      try {
        // Buscar al usuario en la base de datos
        let userFound = await user.getUser({ email: username })
        if (!userFound) return done(null, false, { message: 'User not found' })
        if (!isValidPassword(userFound, password)) return done(null, false, { message: 'Invalid password' })
        done(null, userFound)

      } catch (error) {
        done(`Error logging in user: ${error}`)
      }
    }))

  // Estrategia de autenticación con GitHub
  passport.use('github', new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackUrl,
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    try {
      // Obtener información del perfil de GitHub
      const { name, login } = profile._json
      let emailGit = `${login}@github.com`
      const nameParts = name.split(' ')
      const nameGit = nameParts[0]
      const lastNameGit = nameParts.length > 1 ? nameParts[1] : ''
      let userFound = await user.getUser({ email: emailGit })
      console.log(userFound)

      // Crear un nuevo usuario si no existe en la base de datos
      if (!userFound) {
        const newUser = {
          first_name: nameGit,
          last_name: lastNameGit,
          age: 29,
          email: emailGit,
          password: ' ' // Contraseña vacía ya que no es relevante para GitHub
        }
        const result = await user.createUser(newUser)
        return done(null, result)
      }

      done(null, userFound)

    } catch (error) {
      done(error)
    }
  }))

  // Funciones para serializar y deserializar usuarios en Passport
  passport.serializeUser((user, done) => { done(null, user._id) })

  passport.deserializeUser((async (id, done) => {
    let userFound = await userModel.findOne({ _id: id })
    return done(null, userFound)
  }))
}

export default initializePassport