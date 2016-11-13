#!/usr/bin/env node

const generator = require('./lib/generator')
const template = require('./lib/template')

const argv = process.argv
const selectedTemplate = argv[2] || ''
const selectedFile = argv[3] || ''

if (!selectedTemplate || !selectedFile) {
  console.log('usage: teg <template> <file>')
  process.exit(1)
}

template.getTemplateFiles(selectedTemplate)
.then(templateFiles => generator.generateFiles(templateFiles, selectedFile))
.then(writtenFiles => {
  console.log(`Generated ${writtenFiles.length} templates:`)
  writtenFiles.forEach(file => {
    console.log(`    - ${file}`)
  })
})
.catch(err => {
  console.log(err.message)
  process.exit(1)
})
