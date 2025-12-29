import { Server } from './server.js'
import FilesRouter from './files/infrastructure/files.router.js'
import FilesController from './files/infrastructure/files.controller.js'

const app = async () => {
  const filesController = new FilesController()

  const routers = {
    files: new FilesRouter(filesController)
  }
  
  const server = new Server(routers)
  server.run()
}

export default app