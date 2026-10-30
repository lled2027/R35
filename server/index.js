import 'dotenv/config'
import { createServer } from 'http'
import app from './main/app.js'

const PORT = process.env.PORT
const server = createServer(app)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})