const fs = require('fs')
const path = require('path')

const generateFiles = (input, output) => new Promise((resolve, reject) => {
  let writtenFiles = []

  input.forEach(templateFile => {
    let data

    try {
      data = fs.readFileSync(templateFile, 'utf8')
    } catch (err) {
      return reject(new Error(`Unable to read template file '${err.path}'`))
    }

    const templateFileParsed = path.parse(templateFile)
    const outputFile = templateFileParsed.name === 'index'
      ? `${output}${templateFileParsed.ext}`
      : templateFileParsed.base

    try {
      if (fs.existsSync(outputFile)) {
        return reject(new Error(`File '${outputFile}' already exists`))
      }

      fs.writeFileSync(outputFile, data)
    } catch (err) {
      return reject(new Error(`Unable to write to '${outputFile}'`))
    }

    writtenFiles.push(outputFile)
  })

  resolve(writtenFiles)
})

module.exports = {
  generateFiles
}
