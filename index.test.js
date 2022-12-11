/* eslint-env mocha */

import convert    from './index.js'
import { expect } from 'chai'

describe(`scription2html`, function() {

  it(`accepts a string and returns HTML`, function() {
    const input  = ``
    const result = convert(input)
    expect(result).to.equal(input)
  })

})
