import HttpException from './http-exception.error.js'

export default class InternalServerError extends HttpException {
  constructor (message) {
    super(500, message)
  }
}
