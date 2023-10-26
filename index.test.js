import convert    from './index.js'
import { expect } from 'chai'

import { describe, it } from 'node:test'

describe(`scription2html`, function() {

  it(`returns the input`, function() {

    const input  = `This is the input`
    const output = convert(input)

    expect(output).to.equal(input)

  })

})
