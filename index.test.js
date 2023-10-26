import convert    from './index.js'
import { expect } from 'chai'

import { describe, it } from 'node:test'

describe(`scription2html`, function() {

  it(`whitespace → empty string`, function() {
    const input  = `  `
    const output = convert(input)
    expect(output).to.equal(``)
  })

})
