export default class SecretFilesApiError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SecretFilesApiError'
  }
}