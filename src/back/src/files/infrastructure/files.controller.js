export default class FilesController {
  constructor ({ getFilesContentUseCase }) {
    this.getFiles = async (req, res, next) => {
      try {
        const fileName = req.query.fileName
        const files = await getFilesContentUseCase.execute(fileName)
        res.status(200).json({ files })
      } catch (error) {
        next(error)
      }
    }
  }
}
