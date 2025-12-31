export default class SecretFilesApiException extends Error {
  constructor (message) {
    super(message)
    this.name = 'SecretFilesApiException'
  }
}
