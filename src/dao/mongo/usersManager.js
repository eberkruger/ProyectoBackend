import userModel from '../models/users.model.js'

export default class UsersManagerDB {

  createUser = (user) => {
    return userModel.create(user)
  }

  getUser = (user) => {
    return userModel.findOne(user)
  }

  getAllUsers = () => {
    return userModel.find()
  }

  isEmailRegistered = async (email) => {
    const user = await userModel.findOne({ email })
    return user !== null
  }
  
}