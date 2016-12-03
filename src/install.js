const config = require('./config')
const fs = require('fs')
const path = require('path')

const HOME_DIR = config.HOME
const HOME_TEMPLATES_DIR = path.join(HOME_DIR, 'templates')

/**
 * Create home folder
 */
if (!fs.existsSync(HOME_DIR)) {
  fs.mkdirSync(HOME_DIR)
}

/**
 * Create folder for templates
 */
if (!fs.existsSync(HOME_TEMPLATES_DIR)) {
  fs.mkdirSync(HOME_TEMPLATES_DIR)
}
