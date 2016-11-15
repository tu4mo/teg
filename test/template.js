const assert = require('assert')
const path = require('path')
const templatesPath = path.resolve(__dirname)

process.env.TEG_HOME = templatesPath

const template = require('../lib/template')

describe('template', () => {
  describe(`getTemplateFiles`, () => {
    it('should return 3 template files (index.css, index.js and test.txt)', done => {
      template.getTemplateFiles('test-template')
      .then(files => {
        const templatePath = path.resolve(templatesPath, 'test-template')
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
