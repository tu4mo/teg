#!/usr/bin/env node

const config = require('./config')

require('./install')

const generator = require('./lib/generator')
const template = require('./lib/template')

const argv = process.argv
const selectedTemplate = argv[2] || ''
const selectedFile = argv[3] || ''

const templatesPath = `${config.HOME}/templates`
const templatePath = `${templatesPath}/${selectedTemplate}`

if (!selectedTemplate || !selectedFile) {
  console.log('Usage: teg <template> <file>')
  process.exit(1)
}

let templateFiles = []
let writtenFiles = []

try {
  templateFiles = template.getTemplateFiles(templatePath)
  writtenFiles = generator.generateFiles(templatePath, templateFiles, selectedFile)
  console.log(`Generated ${writtenFiles.length} templates:`)
  writtenFiles.forEach(file => {
    console.log(`    - ${file}`)
  })
} catch (err) {
  console.log(err.message)
  process.exit(1)
}
