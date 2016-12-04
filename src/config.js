const os = require('os')
const path = require('path')

const HOME = process.env.TEG_HOME || path.join(os.homedir(), '.teg')

module.exports = {
  HOME
}
