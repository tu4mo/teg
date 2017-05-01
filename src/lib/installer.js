const fs = require('fs')
const path = require('path')
const readdirRecursively = require('../util/readdirRecursively')

const { HOME_DIR, HOME_TEMPLATES_DIR } = require('../config')
const TEMPLATES_DIR = path.join(__dirname, '..', '..', 'templates')

const createFolder = path => {
  if (fs.existsSync(path)) return

  try {
    fs.mkdirSync(path)
  } catch (err) {
    throw err
  }
}

const copyTemplates = (from, to) => {
  fs.readdirSync(from).forEach(dir => {
    const fullPath = path.join(from, dir)
    const fullHomePath = path.join(to, dir)

    // Skip if not a directory
    if (!fs.lstatSync(fullPath).isDirectory()) return

    // Skip if template already exists
    if (fs.existsSync(fullHomePath)) return

    createFolder(fullHomePath)

    readdirRecursively(fullPath).forEach(file => {
      const fileInHome = path.join(
        fullHomePath,
        file.replace(`${fullPath}${path.sep}`, '')
      )

      try {
        if (fs.lstatSync(file).isDirectory()) {
          createFolder(fileInHome)
        } else {
          fs.writeFileSync(fileInHome, fs.readFileSync(file, 'utf8'))
        }
      } catch (err) {
        throw err
      }
    })
  })
}

const install = () => {
  try {
    createFolder(HOME_DIR)
    createFolder(HOME_TEMPLATES_DIR)
    copyTemplates(TEMPLATES_DIR, HOME_TEMPLATES_DIR)
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = {
  install
}
