export default class FileEntity {
  constructor (file, lines) {
    this.file = file
    this.lines = lines
  }

  static parseCsvString (content) {
    const lines = content.split('\n')

    const headers = lines[0].split(',').slice(1)
    const data = lines
      .slice(1)
      .map(line => line.split(','))
      .map(line => line.slice(1))
      .filter(line => line.length === headers.length)
      .filter(line => line.every(value => value !== ''))

    return {
      headers,
      data
    }
  }

  static parseLineToObject (line, headers) {
    const obj = {}

    line.forEach((value, index) => {
      obj[headers[index]] = value
    })

    return obj
  }

  static fromCsvString (name, content) {
    const { headers, data } = FileEntity.parseCsvString(content)
    const lines = data.map(line => FileEntity.parseLineToObject(line, headers))
    return new FileEntity(name, lines)
  }
}
