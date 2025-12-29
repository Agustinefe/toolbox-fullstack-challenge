export default class FilesController {
  constructor ({ getFilesUseCase }) {
    this.getFiles = async (req, res, next) => {
      try {
        const files = await getFilesUseCase.execute()
        res.status(200).json({ files })
      } catch (error) {
        next(error)
      }
    }
  }
}
