#!/usr/bin/env node

const HOME = process.env.TEG_HOME || `${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}/.teg`

const generator = require('./lib/generator')
const template = require('./lib/template')

const argv = process.argv
const selectedTemplate = argv[2] || ''
const selectedFile = argv[3] || ''

const templatesPath = `${HOME}/templates`
const templatePath = `${templatesPath}/${selectedTemplate}`

if (!selectedTemplate || !selectedFile) {
  console.log('usage: teg <template> <file>')
  process.exit(1)
}

let templateFiles = []

try {
  templateFiles = template.getTemplateFiles(templatePath)
} catch (err) {
  exitWithError(err)
}

generator.generateFiles(templatePath, templateFiles, selectedFile)
.then(writtenFiles => {
  console.log(`Generated ${writtenFiles.length} templates:`)
  writtenFiles.forEach(file => {
    console.log(`    - ${file}`)
  })
})
.catch(exitWithError)

function exitWithError (err) {
  console.log(err.message)
  process.exit(1)
}
