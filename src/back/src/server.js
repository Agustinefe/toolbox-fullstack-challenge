import express from 'express'
import cors from 'cors'
import { config } from './config/config.js';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Toolbox fullstack challenge API",
      version: "1.0.0",
      description:
        "This is the API for the Toolbox fullstack challenge",
    },
  },
  apis: ["./src/files/infrastructure/files.router.js"],
};

export class Server {
  constructor (routers) {
    this.app = express()
    this.port = config.port || 3000

    this.app.use(cors())
    this.app.use(express.json())

    const specs = swaggerJsdoc(options);
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(specs)
    );

    this.app.use(routers.files.path, routers.files.router)

    this.app.use((err, req, res, next) => {
      console.log(err)
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
