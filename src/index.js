#!/usr/bin/env node

const config = require('./config')

require('./lib/installer').install()

const generator = require('./lib/generator')
const template = require('./lib/template')

const [ , , selectedTemplate, selectedFile ] = process.argv
const templatePath = `${config.HOME_TEMPLATES_DIR}/${selectedTemplate}`

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
