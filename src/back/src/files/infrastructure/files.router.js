import { Router } from 'express'

export default class FilesRouter {
  constructor (controller) {
    this.router = Router()
    this.path = '/files'

    this.router.get('/data', controller.getFilesContent)
    this.router.get('/list', controller.getFilesList)
  }
}
