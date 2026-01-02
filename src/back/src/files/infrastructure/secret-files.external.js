import FileNotFoundException from '../domain/errors/file-not-found.error.js'
import { config } from '../../config/config.js'
import SecretFilesApiException from '../domain/errors/secret-files-api.error.js'
import GetSecretFilesResponseValidator from './validators/secret-files-response.validator.js'

export default class SecretFilesExternalApi {
  constructor () {
    this.baseUrl = config.secretFilesExternalApiUrl
    this.headers = {
      authorization: config.secretFilesExternalApiBearerToken
    }
  }

  async performRequest (path) {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        headers: this.headers
      })
      return response
    } catch (error) {
      console.error(error)
      throw new SecretFilesApiException("Could not perform request to external API")
    }

  }

  async get (path) {
    const response = await this.performRequest(`${this.baseUrl}${path}`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new FileNotFoundException(response.statusText)
      }
      throw new SecretFilesApiException(response.statusText)
    }
    return response
  }

  async getSecretFiles () {
    const response = await this.get('files').then(res => res.json())
    GetSecretFilesResponseValidator.validate(response)
    return response
  }

  async getFileContent (fileName) {
    const response = await this.get(`file/${fileName}`).then(res => res.text())
    return response
  }
}
