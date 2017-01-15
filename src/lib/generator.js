const changeCase = require('change-case')
const fs = require('fs')
const path = require('path')

const generateFiles = (templatePath, templateFiles, output) => {
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
        throw new Error(`Unable to create directory '${err.path}'`)
      }
    } else {
      let data

      try {
        data = fs.readFileSync(fullTemplateFilePath, 'utf8')
      } catch (err) {
        throw new Error(`Unable to read template file '${err.path}'`)
      }

      data = compile(data, [
        { name: 'file', value: path.basename(output) }
      ])

      if (fs.existsSync(outputFile)) {
        throw new Error(`File '${outputFile}' already exists`)
      }

      try {
        fs.writeFileSync(outputFile, data)
      } catch (err) {
        throw new Error(`Unable to write to '${outputFile}'`)
      }
    }

    writtenFiles.push(outputFile)
  })

  return writtenFiles
}

const compile = (body, tags) => {
  tags.forEach(tag => {
    const tagRegExp = new RegExp(`{{(${tag.name}\\|?[a-zA-Z]*)}}`, 'g')
    let tagArray
    while ((tagArray = tagRegExp.exec(body)) !== null) {
      const fullTag = tagArray[0]
      const tagContent = tagArray[1]
      const pipe = tagContent.split('|')[1]

      if (pipe && typeof changeCase[pipe] !== 'function') {
        throw new Error(`Pipe "${pipe}" doesn't exist.`)
      }

      const value = pipe ? changeCase[pipe](tag.value) : tag.value

      body = body.split(fullTag).join(value)
    }
  })

  return body
}

module.exports = {
  compile,
  generateFiles
}
