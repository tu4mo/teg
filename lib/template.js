const fs = require('fs')
const path = require('path')

const getTemplateFiles = (template) => new Promise((resolve, reject) => {
  const templatePath = `${getUserHome()}/.teg/${template}`

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

const getUserHome = () => {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
}

module.exports = {
  getTemplateFiles
}
