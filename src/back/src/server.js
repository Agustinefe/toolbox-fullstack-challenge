import express from 'express'

export class Server {
  constructor(routers) {
      this.app = express()
      this.port = process.env.PORT || 3000

      this.app.use(express.json())

      this.app.get('/', (req, res) => {
        res.send('Hello World!')
      })

      this.app.use(routers.files.path, routers.files.router)
  }

  run() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })
  }

}