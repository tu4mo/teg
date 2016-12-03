const path = require('path')

const readdirRecursively = require('../util/readdirRecursively')

const getTemplateFiles = (templatePath) => {
  const files = readdirRecursively(templatePath).map(file => {
    return file.replace(`${templatePath}${path.sep}`, '')
  })

  if (files.length === 0) {
    throw new Error(`Template files not found in '${templatePath}'`)
  }

  return files
}

module.exports = {
  getTemplateFiles
}
