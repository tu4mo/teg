const config = require('./config')
const fs = require('fs')
const path = require('path')
const readdirRecursively = require('./util/readdirRecursively')

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates')

/**
 * Create home folder
 */
if (!fs.existsSync(config.HOME_DIR)) {
  try {
    fs.mkdirSync(config.HOME_DIR)
  } catch (err) {
    //
  }
}

/**
 * Create folder for templates
 */
if (!fs.existsSync(config.HOME_TEMPLATES_DIR)) {
  try {
    fs.mkdirSync(config.HOME_TEMPLATES_DIR)
  } catch (err) {
    //
  }
}

/**
 * Copy templates
 */
fs.readdirSync(TEMPLATES_DIR).forEach(dir => {
  const fullPath = path.join(TEMPLATES_DIR, dir)
  const fullHomePath = path.join(config.HOME_TEMPLATES_DIR, dir)

  // Skip if not a directory
  if (!fs.lstatSync(fullPath).isDirectory()) return

  // Copy template to home folder if it's not already there
  if (!fs.existsSync(fullHomePath)) {
    try {
      fs.mkdirSync(fullHomePath)
    } catch (err) {
      //
    }

    readdirRecursively(fullPath).forEach(file => {
      const fileInHome = path.join(fullHomePath, file.replace(`${fullPath}${path.sep}`, ''))

      try {
        if (fs.lstatSync(file).isDirectory()) {
          fs.mkdirSync(fileInHome)
        } else {
          fs.writeFileSync(fileInHome, fs.readFileSync(file, 'utf8'))
        }
      } catch (err) {
        //
      }
    })
  }
})
