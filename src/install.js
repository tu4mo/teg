const config = require('./config')
const fs = require('fs')
const path = require('path')
const readdirRecursively = require('./util/readdirRecursively')

const HOME_DIR = config.HOME
const HOME_TEMPLATES_DIR = path.join(HOME_DIR, 'templates')
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates')

/**
 * Create home folder
 */
if (!fs.existsSync(HOME_DIR)) {
  try {
    fs.mkdirSync(HOME_DIR)
    console.log(`Created ${HOME_DIR}`)
  } catch (err) {
    console.error(`Unable to create ${HOME_DIR}`)
  }
}

/**
 * Create folder for templates
 */
if (!fs.existsSync(HOME_TEMPLATES_DIR)) {
  try {
    fs.mkdirSync(HOME_TEMPLATES_DIR)
    console.log(`Created ${HOME_TEMPLATES_DIR}`)
  } catch (err) {
    console.error(`Unable to create ${HOME_TEMPLATES_DIR}`)
  }
}

/**
 * Copy templates
 */
fs.readdirSync(TEMPLATES_DIR).forEach(dir => {
  const fullPath = path.join(TEMPLATES_DIR, dir)
  const fullHomePath = path.join(HOME_TEMPLATES_DIR, dir)

  // Skip if not a directory
  if (!fs.lstatSync(fullPath).isDirectory()) return

  // Copy template to home folder if it's not already there
  if (!fs.existsSync(fullHomePath)) {
    try {
      fs.mkdirSync(fullHomePath)
      console.log(`Created ${fullHomePath}`)
    } catch (err) {
      console.error(`Unable to create ${fullHomePath}`)
    }

    readdirRecursively(fullPath).forEach(file => {
      const fileInHome = path.join(fullHomePath, file.replace(`${fullPath}${path.sep}`, ''))

      try {
        if (fs.lstatSync(file).isDirectory()) {
          fs.mkdirSync(fileInHome)
        } else {
          fs.writeFileSync(fileInHome, fs.readFileSync(file, 'utf8'))
        }
        console.log(`Created ${fileInHome}`)
      } catch (err) {
        console.error(`Unable to create ${fileInHome}`)
      }
    })
  }
})
