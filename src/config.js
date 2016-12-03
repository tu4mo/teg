const HOME = process.env.TEG_HOME || `${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}/.teg`

module.exports = {
  HOME
}
