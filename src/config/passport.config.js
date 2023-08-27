import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import userModel from '../dao/models/users.model.js'
import UsersManagerDB from '../dao/mongo/usersManager.js'
import { createHash, isValidPassword } from '../utils.js'
import config from './dotEnv.config.js'

const LocalStrategy = local.Strategy
const user = new UsersManagerDB()

const initializePassport = () => {
  passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
      const { first_name, last_name, email } = req.body

      try {
        let userFound = await user.getUser({ email: username })
        if (userFound) return done(null, false, { message: 'User already exist' })

        let newUser = { first_name, last_name, email, password: createHash(password) }
        let result = await user.createUser(newUser)
        done(null, result)

      } catch (error) {
        done(`Error getting user: ${error}`)
      }
    }))

  passport.use('login', new LocalStrategy({ usernameField: 'email' },
    async (username, password, done) => {
      try {
        let userFound = await user.getUser({ email: username })
        if (!userFound) return done(null, false, { message: 'User not found' })
        if (!isValidPassword(userFound, password)) return done(null, false, { message: 'Invalid password' })
        done(null, userFound)

      } catch (error) {
        done(`Error login user: ${error}`)
      }
    }))

  passport.use('github', new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackUrl,
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    try {
      const { name, login } = profile._json
      let emailGit = `${login}@github.com`
      const nameParts = name.split(' ')
      const nameGit = nameParts[0]
      const lastNameGit = nameParts.length > 1 ? nameParts[1] : ''
      let userFound = await user.getUser({ email: emailGit })
      console.log(userFound)

      if (!userFound) {
        const newUser = {
          first_name: nameGit,
          last_name: lastNameGit,
          age: 29,
          email: emailGit,
          password: ' '
        }
        const result = await user.createUser(newUser)
        return done(null, result)
      }

      done(null, userFound)

    } catch (error) {
      done(error)
    }
  }))

  passport.serializeUser((user, done) => { done(null, user._id) })

  passport.deserializeUser((async (id, done) => {
    let userFound = await userModel.findOne({ _id: id })
    return done(null, userFound)
  }))
}

export default initializePassport