const assert = require('assert')

const generator = require('../src/lib/generator')

describe('generator', () => {
  describe('compile', () => {
    it('should return compiled template with file tag converted', () => {
      const template = '<div>{{file}}</div>'
      const output = generator.compile(template, [
        { name: 'file', value: 'TestWord' }
      ])
      assert.equal(output, '<div>TestWord</div>')
    })

    it('should return compiled template with file tag converted paramCase', () => {
      const template = '<div>{{file|paramCase}}</div>'
      const output = generator.compile(template, [
        { name: 'file', value: 'TestWord' }
      ])
      assert.equal(output, '<div>test-word</div>')
    })

    it('should throw error with unexisting converter', () => {
      assert.throws(() => {
        const template = '<div>{{file|nonExistingConverter}}</div>'
        generator.compile(template, [{ name: 'file', value: 'TestWord' }])
      })
    })
  })
})
