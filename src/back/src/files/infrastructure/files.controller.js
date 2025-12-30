export default class FilesController {
  constructor ({ getFilesContentUseCase, getFilesListUseCase }) {
    this.getFilesContent = async (req, res, next) => {
      try {
        const fileName = req.query.fileName
        const files = await getFilesContentUseCase.execute(fileName)
        res.status(200).json({ files })
      } catch (error) {
        next(error)
      }
    }

    this.getFilesList = async (req, res, next) => {
      try {
        const files = await getFilesListUseCase.execute()
        res.status(200).json({ files })
      } catch (error) {
        next(error)
      }
    }
  }
}
