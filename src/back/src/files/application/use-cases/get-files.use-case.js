import FileEntity from '../../domain/entities/file.entity.js'

export default class GetFilesUseCase {
  constructor (secretFilesExternalApi) {
    this.secretFilesExternalApi = secretFilesExternalApi
  }

  async getFileContent (fileName) {
    return await this.secretFilesExternalApi.getFileContent(fileName).then(res => FileEntity.fromCsvString(fileName, res))
  }

  async execute (fileName) {
    const { files } = fileName ? {files: [fileName]} : await this.secretFilesExternalApi.getSecretFiles()

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
