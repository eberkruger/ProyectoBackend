export default class MessagesService {
  constructor(dao) {
    this.dao = dao
  }

  addMensagger = (message) => {
    return this.dao.addMensagger(message)
  }

  getAllMessages = () => {
    return this.dao.getAllMessages()
  }
}