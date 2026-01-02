export default class FileNotFoundException extends Error {
  constructor (message) {
    super(message)
    this.name = 'FileNotFoundException'
  }
}
