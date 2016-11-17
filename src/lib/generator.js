const fs = require('fs')
const path = require('path')

const generateFiles = (templatePath, templateFiles, output) => {
  return new Promise((resolve, reject) => {
    let writtenFiles = []

    templateFiles.forEach(templateFile => {
      const fullTemplateFilePath = path.resolve(templatePath, templateFile)
      const outputFile = templateFile.split(path.sep).reduce((prev, curr) => {
        const parsedFile = path.parse(curr)
        return path.join(prev, parsedFile.name === '_index' ? `${output}${parsedFile.ext}` : curr)
      }, '')

      if (fs.lstatSync(fullTemplateFilePath).isDirectory()) {
        try {
          fs.mkdirSync(`${outputFile}`)
        } catch (err) {
          return reject(new Error(`Unable to create directory '${err.path}'`))
        }
      } else {
        let data

        try {
          data = fs.readFileSync(fullTemplateFilePath, 'utf8')
        } catch (err) {
          return reject(new Error(`Unable to read template file '${err.path}'`))
        }

        data = compile(data, [
          { name: 'file', value: path.basename(output) }
        ])

        try {
          if (fs.existsSync(outputFile)) {
            return reject(new Error(`File '${outputFile}' already exists`))
          }

          fs.writeFileSync(outputFile, data)
        } catch (err) {
          return reject(new Error(`Unable to write to '${outputFile}'`))
        }
      }

      writtenFiles.push(outputFile)
    })

    resolve(writtenFiles)
  })
}

const compile = (body, variables) => {
  variables.forEach(variable => {
    body = body.split(`{{${variable.name}}}`).join(variable.value)
  })

  return body
}

module.exports = {
  compile,
  generateFiles
}
