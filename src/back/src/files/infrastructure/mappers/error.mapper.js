import InternalServerError from "../errors/internal-server-error.js";
import NotFoundException from "../errors/not-found-exception.error.js";

export default class FilesModuleErrorMapper {
  constructor() {
    this.mapper = new Map([
      ["FileNotFoundException", NotFoundException],
      ["InternalServerError", InternalServerError],
    ])
  }

  map(error) {
    const ErrorClass = this.mapper.get(error.name)
    if (!ErrorClass) {
      return new InternalServerError(error.message)
    }
    return new ErrorClass(error.message)
  }
}