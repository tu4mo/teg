const assert = require('assert')
const path = require('path')
const templatesPath = path.resolve(__dirname, '..', 'templates')

process.env.TEG_HOME = templatesPath

const template = require('../lib/template')

describe('template', () => {
  describe(`getTemplateFiles('react-class')`, () => {
    it('should return 3 template files (index.css, index.js and test.txt)', done => {
      template.getTemplateFiles('react-class')
      .then(files => {
        const templatePath = path.resolve(templatesPath, 'react-class')
        assert.equal(files.length, 3)
        assert.equal(files.includes(path.resolve(templatePath, 'index.css')), true)
        assert.equal(files.includes(path.resolve(templatePath, 'index.js')), true)
        assert.equal(files.includes(path.resolve(templatePath, 'test.txt')), true)
        done()
      })
      .catch(err => done(err))
    })
  })
})
