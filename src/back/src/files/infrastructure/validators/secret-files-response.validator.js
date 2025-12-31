import SecretFilesApiException from '../../domain/errors/secret-files-api.error.js'

export default class GetSecretFilesResponseValidator {
  static validate (response) {
    if (!response || typeof response !== 'object') {
      throw new SecretFilesApiException('Invalid response: expected an object')
    }
    if (!response.files || !Array.isArray(response.files)) {
      throw new SecretFilesApiException('Invalid response: expected files array')
    }
    if (!response.files.every(file => typeof file === 'string')) {
      throw new SecretFilesApiException('Invalid response: all files must be strings')
    }
  }
}
