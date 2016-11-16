const assert = require('assert')

const generator = require('../src/lib/generator')

describe('generator', () => {
  describe('compile', () => {
    it('should return compiled template', () => {
      const template = '<div>{{file}}</div>'
      const output = generator.compile(template, [
        { name: 'file', value: 'test' }
      ])
      assert.equal(output, '<div>test</div>')
    })
  })
})
