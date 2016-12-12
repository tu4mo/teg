const os = require('os')
const path = require('path')

const HOME_DIR = process.env.TEG_HOME || path.join(os.homedir(), '.teg')
const HOME_TEMPLATES_DIR = path.join(HOME_DIR, 'templates')

module.exports = {
  HOME_DIR,
  HOME_TEMPLATES_DIR
}
