export default class GetFilesUseCase {
  constructor(secretFilesExternalApi) {
    this.secretFilesExternalApi = secretFilesExternalApi
  }

  async execute() {
    const {files} = await this.secretFilesExternalApi.getSecretFiles()
    return files
  }
}