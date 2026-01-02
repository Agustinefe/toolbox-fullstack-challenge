import { Router } from 'express'

/**
 * @swagger
 * components:
 *   schemas:
 *     FileContent:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: The text of the file
 *         number:
 *           type: string
 *           description: The number of the file
 *         hex:
 *           type: string
 *           description: The hex of the file
 *       example:
 *         text: The text of the file
 *         number: 1
 *         hex: 1234567890
 *     File:
 *       type: object
 *       properties:
 *         file:
 *           type: string
 *           description: The name of the file
 *         lines:
 *           type: [FileContent]
 *           description: The file content
 */

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: API for the files module
 */
export default class FilesRouter {
  constructor (controller) {
    this.router = Router()
    this.path = '/files'

  /**
   * @swagger
   * /files/data:
   *   get:
   *     summary: Get files content
   *     tags: [Files]
   *     parameters:
   *       - in: query
   *         name: fileName
   *         schema:
   *           type: string
   *         required: false
   *         description: Optional file name to filter by a specific file
   *     responses:
   *       200:
   *         description: The files content
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/File'
   *       404:
   *         description: File not found
   *       500:
   *         description: Some server error
   *
   */
    this.router.get('/data', controller.getFilesContent)

  /**
   * @swagger
   * /files/list:
   *   get:
   *     summary: Get the list of file names
   *     tags: [Files]
   *     responses:
   *       200:
   *         description: The filename list
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: string
   *       500:
   *         description: Some server error
   *
   */
    this.router.get('/list', controller.getFilesList)
  }
}
