import servers from './app'
import config from './config/index'
import connectDB from './config/db.config'
import { Server } from 'http'

let server: Server

process.on('uncaughtException', () => {
  process.exit(1)
})

const startServer = async () => {
  await connectDB()
  servers.listen(config.port, () => {
    console.log('Digital cow is Running On Port', config.port)
  })
}

startServer()

process.on('unhandledRejection', () => {
  if (server) {
    server.close()
    process.exit(1)
  } else {
    process.exit(1)
  }
})

process.on('SIGTERM', () => {
  server.close()
})
