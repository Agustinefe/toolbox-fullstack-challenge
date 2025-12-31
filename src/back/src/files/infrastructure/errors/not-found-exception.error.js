import HttpException from "./http-exception.error.js";

export default class NotFoundException extends HttpException {
  constructor(message) {
    super(404, message)
  }
}