const fs = require('fs')
const path = require('path')

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
    throw new Error(`Directory not found in '${err.path}'`)
  }
}

module.exports = readdirRecursively
