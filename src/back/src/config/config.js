import dotenv from 'dotenv'
dotenv.config()

export const config = {
  get secretFilesExternalApiUrl () {
    return process.env.SECRET_FILES_EXTERNAL_API_URL
  },
  get secretFilesExternalApiBearerToken () {
    return process.env.SECRET_FILES_EXTERNAL_API_BEARER_TOKEN
  }
}
