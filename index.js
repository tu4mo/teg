#!/usr/bin/env node

const argv = process.argv

const template = argv[2] || ''
const file = argv[3] || ''

if (!template || !file) {
  return console.log('usage: tecr [options] <template> <file>')
}
