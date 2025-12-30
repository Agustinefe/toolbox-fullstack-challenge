import SecretFilesApiError from '../domain/errors/secret-files-api.error.js'
import GetSecretFilesResponseValidator from './validators/secret-files-response.validator.js'

export default class SecretFilesExternalApi {

  constructor() {
    this.baseUrl = 'https://echo-serv.tbxnet.com/v1/secret/'
    this.headers = {
      'authorization': "Bearer aSuperSecretKey"
    }
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: this.headers
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await response.json()
  }

  async getSecretFiles() {
    try {
      const response = await this.get('files')
      GetSecretFilesResponseValidator.validate(response)
      return response
    } catch (error) {
      if (error instanceof SecretFilesApiError) {
        throw error
      }
      throw new SecretFilesApiError(error.message)
    }
  }
}