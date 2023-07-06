import { messageModel } from '../models/messages.model.js'

export default class MessagesManagerDB {

  async addMensagger(message) {
    const result = await messageModel.create(message)
    return result
  }

  async getAllMessages() {
    const result = await messageModel.find().lean()
    return result
  }

}

