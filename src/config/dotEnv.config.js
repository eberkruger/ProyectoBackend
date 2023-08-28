import dotenv from 'dotenv'

dotenv.config()

export default {
  mongoUrl : process.env.MONGO_DB_URL,
  mongoSecret : process.env.MONGO_SECRET,
  clientID : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  callbackUrl : process.env.CALLBACK_URL,
  adminEmail : process.env.ADMIN_EMAIL,
  adminPwd : process.env.ADMIN_PWD,
}