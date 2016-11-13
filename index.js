#!/usr/bin/env node


const argv = process.argv
const selectedTemplate = argv[2] || ''
const selectedFile = argv[3] || ''

if (!selectedTemplate || !selectedFile) {
  console.log('usage: tecr [options] <template> <file>')
  process.exit(1)
}
