const fs = require('fs')
const path = require('path')

const HOME = process.env.TEG_HOME || `${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}/.teg`

const getTemplateFiles = (template) => new Promise((resolve, reject) => {
  const templatePath = `${HOME}/templates/${template}`

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
      return reject(new Error(`Template not found in '${templatePath}'`))
    }
  }

  const files = readdirRecursively(templatePath)

  if (files.length === 0) {
    return reject(new Error(`Template files not found in '${templatePath}'`))
  }

  resolve(files)
})

module.exports = {
  getTemplateFiles
}
