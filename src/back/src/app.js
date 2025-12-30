import { Server } from './server.js'
import FilesRouter from './files/infrastructure/files.router.js'
import FilesController from './files/infrastructure/files.controller.js'
import GetFilesContentUseCase from './files/application/use-cases/get-files-content.use-case.js'
import SecretFilesExternalApi from './files/infrastructure/secret-files.external.js'
import GetFileListUseCase from './files/application/use-cases/get-file-list.use-case.js'

const app = async () => {
  const secretFilesExternalApi = new SecretFilesExternalApi()

  const getFilesContentUseCase = new GetFilesContentUseCase(secretFilesExternalApi)
  const getFilesListUseCase = new GetFileListUseCase(secretFilesExternalApi)

  const filesController = new FilesController({
    getFilesContentUseCase,
    getFilesListUseCase
  })

  const routers = {
    files: new FilesRouter(filesController)
  }

  const server = new Server(routers)
  server.run()

  return { app: server.app }
}

export default app
