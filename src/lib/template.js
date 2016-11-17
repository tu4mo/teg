const fs = require('fs')
const path = require('path')

const getTemplateFiles = (templatePath) => {
  const files = readdirRecursively(templatePath).map(file => {
    return file.replace(`${templatePath}${path.sep}`, '')
  })

  if (files.length === 0) {
    throw new Error(`Template files not found in '${templatePath}'`)
  }

  return files
}

const readdirRecursively = (dir, files = []) => {
  try {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file)
      files.push(fullPath)
      if (fs.lstatSync(fullPath).isDirectory()) {
        return readdirRecursively(fullPath, files)
      }
    })

    return files
  } catch (err) {
    throw new Error(`Template not found in '${err.path}'`)
  }
}

module.exports = {
  getTemplateFiles
}
