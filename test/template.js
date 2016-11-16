const assert = require('assert')
const path = require('path')
const testHomePath = path.resolve(__dirname, 'test-home')

process.env.TEG_HOME = testHomePath

const template = require('../src/lib/template')

describe('template', () => {
  describe(`getTemplateFiles`, () => {
    it('should return 3 template files (index.css, index.js and test.txt)', done => {
      template.getTemplateFiles('test-template')
      .then(files => {
        const testTemplatePath = path.resolve(testHomePath, 'templates', 'test-template')
        assert.equal(files.length, 3)
        assert.equal(files.includes(path.resolve(testTemplatePath, '_index.css')), true)
        assert.equal(files.includes(path.resolve(testTemplatePath, '_index.js')), true)
        assert.equal(files.includes(path.resolve(testTemplatePath, 'test.txt')), true)
        done()
      })
      .catch(err => done(err))
    })
  })
})
