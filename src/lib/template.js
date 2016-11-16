const fs = require('fs')
const path = require('path')

const HOME = process.env.TEG_HOME || `${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}/.teg`

const getTemplateFiles = (template) => new Promise((resolve, reject) => {
  const templatePath = `${HOME}/templates/${template}`

  fs.readdir(templatePath, (err, dir) => {
    if (err) {
      return reject(new Error(`Template not found in '${templatePath}'`))
    }

    if (dir.length === 0) {
      return reject(new Error(`Template files not found in '${templatePath}'`))
    }

    const files = dir.map(file => path.resolve(templatePath, file))

    resolve(files)
  })
})

module.exports = {
  getTemplateFiles
}
