import FileEntity from '../../domain/entities/file.entity.js'

export default class GetFilesContentUseCase {
  constructor (secretFilesExternalApi) {
    this.secretFilesExternalApi = secretFilesExternalApi
  }

  async getFileContent (fileName) {
    return await this.secretFilesExternalApi.getFileContent(fileName).then(res => FileEntity.fromCsvString(fileName, res))
  }

  async execute (fileName) {
    if (fileName) {
      const fileContent = await this.getFileContent(fileName)
      return [fileContent]
    }

    const { files } = await this.secretFilesExternalApi.getSecretFiles()

    const fileContent = await Promise.allSettled(
      files.map(file => this.getFileContent(file))
    ).then(results =>
      results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value)
    )
    return fileContent
  }
}
