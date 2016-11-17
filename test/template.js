const assert = require('assert')
const path = require('path')
const testHomePath = path.resolve(__dirname, 'test-home')

process.env.TEG_HOME = testHomePath

const template = require('../src/lib/template')

describe('template', () => {
  describe('getTemplateFiles', () => {
    it('should return 3 template files and 1 folder', done => {
      template.getTemplateFiles(`${testHomePath}/templates`, 'test-template')
      .then(files => {
        assert.equal(files.length, 4)
        assert.equal(files.includes('_index.css'), true)
        assert.equal(files.includes('_index.js'), true)
        assert.equal(files.includes('folder'), true)
        assert.equal(files.includes(path.join('folder', 'test.txt')), true)
        done()
      })
      .catch(done)
    })
  })
})
