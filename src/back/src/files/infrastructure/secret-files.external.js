import SecretFilesApiError from '../domain/errors/secret-files-api.error.js'
import GetSecretFilesResponseValidator from './validators/secret-files-response.validator.js'

export default class SecretFilesExternalApi {
  constructor () {
    this.baseUrl = 'https://echo-serv.tbxnet.com/v1/secret/'
    this.headers = {
      authorization: 'Bearer aSuperSecretKey'
    }
  }

  async get (path) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: this.headers
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  }

  async getSecretFiles () {
    try {
      const response = await this.get('files').then(res => res.json())
      GetSecretFilesResponseValidator.validate(response)
      return response
    } catch (error) {
      if (error instanceof SecretFilesApiError) {
        throw error
      }
      throw new SecretFilesApiError(error.message)
    }
  }

  async getFileContent (fileName) {
    try {
      const response = await this.get(`file/${fileName}`).then(res => res.text())
      return response
    } catch (error) {
      if (error instanceof SecretFilesApiError) {
        throw error
      }
      throw new SecretFilesApiError(error.message)
    }
  }
}
