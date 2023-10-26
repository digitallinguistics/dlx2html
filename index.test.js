import convert    from './index.js'
import { expect } from 'chai'

import { describe, it } from 'node:test'

const sample = `ninaenda
ni-na-end-a
1SG-PRES-go-IND
I am going`

describe(`scription2html`, function() {

  it(`whitespace → empty string`, function() {
    const input  = `  `
    const output = convert(input)
    expect(output).to.equal(``)
  })

  it(`ignores the YAML header`, function() {

    const input = `
    ---
    title: The title of this story
    ---
    ${ sample }
    `

    const runTest = () => convert(input)

    expect(runTest).not.to.throw()

  })

  it(`wraps utterances in <div class=igl> by default`)

  it(`converts single utterances`)

  it(`converts multiple utterances`)


})
