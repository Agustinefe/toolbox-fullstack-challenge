export default class FilesController {
  constructor() {
    this.files = [
      "file1.txt",
      "file2.txt",
      "file3.txt"
    ]

    this.getFiles = async (req, res, next) => {
      try {
        res.status(200).json({files: this.files})
      } catch (error) {
        next(error)
      }
    }
  }
}