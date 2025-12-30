export default class GetFileListUseCase {
  constructor (secretFilesExternalApi) {
    this.secretFilesExternalApi = secretFilesExternalApi
  }

  async execute () {
    const { files } = await this.secretFilesExternalApi.getSecretFiles()
    return files
  }
}
