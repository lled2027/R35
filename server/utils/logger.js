import 'dotenv/config'

import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

import { __dirname } from './dirname.js'

const isProduction = process.env.NODE_ENV === 'production'

const logDirectory = path.join(__dirname, '../logs')
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

const accessLogStream = fs.createWriteStream(
    path.join(logDirectory, isProduction ? 'production.log' : 'development.log'), { flags: 'a' }
)

const logger = morgan(isProduction ? 'combined' : 'dev', {
  stream: accessLogStream,
  skip: isProduction ? (req, res) => res.statusCode < 400 : () => false,
})

export default logger