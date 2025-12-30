import SecretFilesApiError from '../../domain/errors/secret-files-api.error.js'

export default class GetSecretFilesResponseValidator {
  static validate (response) {
    if (!response || typeof response !== 'object') {
      throw new SecretFilesApiError('Invalid response: expected an object')
    }
    if (!response.files || !Array.isArray(response.files)) {
      throw new SecretFilesApiError('Invalid response: expected files array')
    }
    if (!response.files.every(file => typeof file === 'string')) {
      throw new SecretFilesApiError('Invalid response: all files must be strings')
    }
  }
}
