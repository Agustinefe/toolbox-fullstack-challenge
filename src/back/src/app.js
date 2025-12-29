import { Server } from './server.js'
import FilesRouter from './files/files.router.js'
import FilesController from './files/files.controller.js'

const filesController = new FilesController()

const routers = {
  files: new FilesRouter(filesController)
}

const server = new Server(routers)
server.run()