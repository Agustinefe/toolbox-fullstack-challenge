export default class FilesController {
  constructor ({ getFilesUseCase }) {
    this.getFiles = async (req, res, next) => {
      try {
        const fileName = req.query.fileName
        const files = await getFilesUseCase.execute(fileName)
        res.status(200).json({ files })
      } catch (error) {
        next(error)
      }
    }
  }
}
