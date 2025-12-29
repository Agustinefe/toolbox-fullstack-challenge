export default class GetFilesUseCase {
  constructor(secretFilesExternalApi) {
    this.secretFilesExternalApi = secretFilesExternalApi
  }

  async execute() {
    return this.secretFilesExternalApi.getSecretFiles()
  }
}