import { expect } from 'chai'
import request from 'supertest'
import { Server } from '../src/server.js'
import FilesRouter from '../src/files/infrastructure/files.router.js'
import FilesController from '../src/files/infrastructure/files.controller.js'
import GetFilesContentUseCase from '../src/files/application/use-cases/get-files-content.use-case.js'
import GetFileListUseCase from '../src/files/application/use-cases/get-file-list.use-case.js'
import FilesModuleErrorMapper from '../src/files/infrastructure/mappers/error.mapper.js'
import FileNotFoundException from '../src/files/domain/errors/file-not-found.error.js'

describe('Files E2E Tests', () => {
  let app
  let mockSecretFilesExternalApi

  beforeEach(() => {
    mockSecretFilesExternalApi = {
      getSecretFiles: async () => ({}),
      getFileContent: async () => ''
    }

    const getFilesContentUseCase = new GetFilesContentUseCase(mockSecretFilesExternalApi)
    const getFilesListUseCase = new GetFileListUseCase(mockSecretFilesExternalApi)
    const filesModuleErrorMapper = new FilesModuleErrorMapper()

    const filesController = new FilesController({ getFilesContentUseCase, getFilesListUseCase, filesModuleErrorMapper })
    const filesRouter = new FilesRouter(filesController)

    const server = new Server({ files: filesRouter })
    app = server.app
  })

  describe('GET /files/list', () => {
    it('should return 200 with file list when external API responds correctly', async () => {
      const mockFilesList = ['test1.csv', 'test2.csv']
      mockSecretFilesExternalApi.getSecretFiles = async () => ({
        files: mockFilesList
      })

      const response = await request(app)
        .get('/files/list')
        .expect(200)
      expect(response.body).to.have.property('files')
      expect(response.body.files).to.be.an('array')
      expect(response.body.files).to.have.lengthOf(2)
    })

    it('should return 500 when external API fails to get file list', async () => {
      const error = new Error('API Error')
      mockSecretFilesExternalApi.getSecretFiles = async () => {
        throw error
      }
      await request(app)
        .get('/files/list')
        .expect(500)
    })
  })

  describe('GET /files/data', () => {
    it('should return 200 with file list when external API responds correctly', async () => {
      const mockFilesList = ['test1.csv', 'test2.csv']
      const mockFileContent1 = 'file,text,number,hex\ntest1.csv,text1,1,abc123'
      const mockFileContent2 = 'file,text,number,hex\ntest2.csv,text2,2,def456'

      mockSecretFilesExternalApi.getSecretFiles = async () => ({
        files: mockFilesList
      })

      mockSecretFilesExternalApi.getFileContent = async (fileName) => {
        if (fileName === 'test1.csv') return mockFileContent1
        if (fileName === 'test2.csv') return mockFileContent2
        return ''
      }

      const response = await request(app)
        .get('/files/data')
        .expect(200)

      expect(response.body).to.be.an('array')
      expect(response.body).to.have.lengthOf(2)
      expect(response.body[0]).to.have.property('file')
      expect(response.body[0]).to.have.property('lines')
      expect(response.body[0].file).to.equal('test1.csv')
      expect(response.body[0].lines).to.be.an('array')
      expect(response.body[0].lines[0]).to.deep.equal({
        text: 'text1',
        number: 1,
        hex: 'abc123'
      })
      expect(response.body[1].lines[0]).to.deep.equal({
        text: 'text2',
        number: 2,
        hex: 'def456'
      })
    })

    it('should return files with correct structure when CSV is valid', async () => {
      // Arrange
      const mockFilesList = ['valid.csv']
      const mockFileContent = 'file,text,number,hex\nvalid.csv,Hello World,123,abc123def'

      mockSecretFilesExternalApi.getSecretFiles = async () => ({
        files: mockFilesList
      })

      mockSecretFilesExternalApi.getFileContent = async () => mockFileContent

      // Act
      const response = await request(app)
        .get('/files/data')
        .expect(200)

      // Assert
      expect(response.body[0].file).to.equal('valid.csv')
      expect(response.body[0].lines).to.be.an('array')
      expect(response.body[0].lines).to.have.lengthOf(1)
      expect(response.body[0].lines[0]).to.deep.equal({
        text: 'Hello World',
        number: 123,
        hex: 'abc123def'
      })
    })

    it('should filter files with invalid content and return only valid ones', async () => {
      // Arrange
      const mockFilesList = ['valid.csv', 'invalid.csv', 'another-valid.csv']
      const validContent = 'file,text,number,hex\nvalid.csv,Text,1,abc'
      const invalidContent = 'file,text,number\ninvalid.csv,Incomplete' // Missing columns
      const anotherValidContent = 'file,text,number,hex\nanother-valid.csv,Text2,2,def'

      mockSecretFilesExternalApi.getSecretFiles = async () => ({
        files: mockFilesList
      })

      mockSecretFilesExternalApi.getFileContent = async (fileName) => {
        if (fileName === 'valid.csv') return validContent
        if (fileName === 'invalid.csv') return invalidContent
        if (fileName === 'another-valid.csv') return anotherValidContent
        return ''
      }

      // Act
      const response = await request(app)
        .get('/files/data')
        .expect(200)

      // Assert
      expect(response.body).to.be.an('array')
      // Should only return valid files
      const fileNames = response.body.map(f => f.file)
      expect(fileNames).to.include('valid.csv')
      expect(fileNames).to.include('another-valid.csv')
    })

    it('should return empty array when there are no files', async () => {
      // Arrange
      mockSecretFilesExternalApi.getSecretFiles = async () => ({
        files: []
      })

      // Act
      const response = await request(app)
        .get('/files/data')
        .expect(200)

      // Assert
      expect(response.body).to.be.an('array')
      expect(response.body).to.have.lengthOf(0)
    })

    it('should handle errors when external API fails to get file list', async () => {
      const error = new Error('API Error')
      mockSecretFilesExternalApi.getSecretFiles = async () => {
        throw error
      }

      const response = await request(app)
        .get('/files/data')
        .expect(500)

      expect(response.body).to.have.property('error')
    })

    it('should handle errors when external API fails to get file content', async () => {
      const mockFilesList = ['file1.csv', 'file2.csv']
      mockSecretFilesExternalApi.getSecretFiles = async () => ({
        files: mockFilesList
      })

      mockSecretFilesExternalApi.getFileContent = async () => {
        throw new Error('Failed to fetch file content')
      }

      const response = await request(app)
        .get('/files/data')
        .expect(200)

      expect(response.body).to.be.an('array')
      expect(response.body).to.have.lengthOf(0)
    })

    it('should handle files with empty lines or missing values correctly', async () => {
      const mockFilesList = ['file.csv']
      const mockFileContent = 'file,text,number,hex\nfile.csv,Text1,1,abc\nfile.csv,,,\nfile.csv,Text2,2,def'

      mockSecretFilesExternalApi.getSecretFiles = async () => ({
        files: mockFilesList
      })

      mockSecretFilesExternalApi.getFileContent = async () => mockFileContent

      const response = await request(app)
        .get('/files/data')
        .expect(200)

      expect(response.body[0].lines).to.be.an('array')
      expect(response.body[0].lines.length).to.be.lessThan(3)
      expect(response.body[0].lines.every(line => line.text && line.number && line.hex)).to.be.true
    })

    it('should return only one file when fileName is provided', async () => {
      const mockFilesList = ['test1.csv', 'test2.csv']
      const mockFileContent1 = 'file,text,number,hex\ntest1.csv,text1,1,abc123'
      const mockFileContent2 = 'file,text,number,hex\ntest2.csv,text2,2,def456'

      mockSecretFilesExternalApi.getSecretFiles = async () => ({
        files: mockFilesList
      })

      mockSecretFilesExternalApi.getFileContent = async (fileName) => {
        if (fileName === 'test1.csv') return mockFileContent1
        if (fileName === 'test2.csv') return mockFileContent2
        return ''
      }

      const response = await request(app)
        .get('/files/data?fileName=test1.csv')
        .expect(200)

      expect(response.body).to.be.an('array')
      expect(response.body).to.have.lengthOf(1)
      expect(response.body[0]).to.have.property('file')
      expect(response.body[0]).to.have.property('lines')
      expect(response.body[0].file).to.equal('test1.csv')
      expect(response.body[0].lines).to.be.an('array')
      expect(response.body[0].lines[0]).to.deep.equal({
        text: 'text1',
        number: 1,
        hex: 'abc123'
      })
    })

    it('should throw a Not Found Exception when fileName does not exist', async () => {
      const mockFilesList = ['test1.csv', 'test2.csv']
      const mockFileContent1 = 'file,text,number,hex\ntest1.csv,text1,1,abc123'
      const mockFileContent2 = 'file,text,number,hex\ntest2.csv,text2,2,def456'

      mockSecretFilesExternalApi.getSecretFiles = async () => ({
        files: mockFilesList
      })

      mockSecretFilesExternalApi.getFileContent = async (fileName) => {
        if (fileName === 'test1.csv') return mockFileContent1
        if (fileName === 'test2.csv') return mockFileContent2
        throw new FileNotFoundException('File not found')
      }

      await request(app)
        .get('/files/data?fileName=test3.csv')
        .expect(404)
    })
  })
})
