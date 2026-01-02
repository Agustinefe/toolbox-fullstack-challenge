import express from 'express'
import cors from 'cors'

export class Server {
  constructor (routers) {
    this.app = express()
    this.port = process.env.PORT || 3000

    this.app.use(cors())
    this.app.use(express.json())

    this.app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    this.app.use(routers.files.path, routers.files.router)

    this.app.use((err, req, res, next) => {
      res.status(err.statusCode || 500).json({
        error: err.message || 'Internal Server Error'
      })
    })
  }

  run () {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })
  }
}
