import convert                    from './index.js'
import { expect }                 from 'chai'
import { getTextContent }         from './node_modules/@web/parse5-utils/src/index.js' // getTextContent() isn't exported by the ESM version for some reason.
import { parseFragment as parse } from 'parse5'


const sample = `ninaenda
ni-na-end-a
1SG-PRES-go-IND
I am going`

describe(`scription2html`, function() {

  it(`no input → empty string`, function() {
    const output = convert()
    expect(output).to.equal(``)
  })

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

  it(`wraps utterances in <div class=igl> by default`, function() {

    const output = convert(sample)
    const dom    = parse(output)

    expect(dom.childNodes).to.have.length(1)
    expect(dom.childNodes[0].tagName).to.equal(`div`)

  })

  it(`converts single utterances`, function() {

    const output = convert(sample)
    const dom    = parse(output)

    expect(dom.childNodes).to.have.length(1)

    const [ex] = dom.childNodes

    expect(getTextContent(ex)).to.include(`ninaenda`)

  })

  it(`converts multiple utterances`)

  it(`returns one tag per utterance`)

})
