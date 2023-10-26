import convert                    from './index.js'
import { expect }                 from 'chai'
import { getAttribute }           from '@web/parse5-utils'
import { parseFragment as parse } from 'parse5'

import { Swahili } from '../samples/data/data.js'

function parseClassString(str) {
  return str.split(/\s+/giu)
}

describe(`scription2html`, function() {

  it(`no input → empty string`, function() {
    const result = convert()
    expect(result).to.equal(null)
  })

  it(`whitespace → empty string`, function() {
    const input    = `  `
    const { html } = convert(input)
    expect(html).to.equal(``)
  })

  it(`ignores the YAML header`, function() {

    const input = `
    ---
    title: The title of this story
    ---
    ${ Swahili }
    `

    const runTest = () => convert(input)

    expect(runTest).not.to.throw()

  })

  it(`can access the underlying data`, function() {
    const { data } = convert(Swahili)
    expect(data.utterances).to.have.length(1)
  })

  it(`wraps utterances in <div class=igl> by default`, function() {

    const { html } = convert(Swahili)
    const dom      = parse(html)

    expect(dom.childNodes).to.have.length(1)
    expect(dom.childNodes[0].tagName).to.equal(`div`)

  })

  it(`converts single utterances`, function() {

    const { html } = convert(Swahili)
    const dom      = parse(html)

    expect(dom.childNodes).to.have.length(1)

  })

  it(`converts multiple utterances`, function() {

    const scription = `${ Swahili }\n\n${ Swahili }`
    const { html }  = convert(scription)
    const dom       = parse(html)

    expect(dom.childNodes).to.have.length(2)

  })

  it(`option: classes`, function() {

    const classes  = [`example`, `interlinear`]
    const { html } = convert(Swahili, { classes })
    const dom      = parse(html)
    const [ex]     = dom.childNodes

    const classString   = getAttribute(ex, `class`)
    const outputClasses = parseClassString(classString)

    expect(outputClasses).to.have.length(2)
    expect(outputClasses).to.include(`example`)
    expect(outputClasses).to.include(`interlinear`)

  })

  it(`option: classes (validates)`, function() {

    const test1 = () => convert(Swahili, { classes: `example interlinear` })
    expect(test1).to.throw(`classes`)

    const test2 = () => convert(Swahili, { classes: [0] })
    expect(test2).to.throw(`classes`)

  })

  it(`option: scription`, function() {

    const scription = { utteranceMetadata: false }
    const text = `# This is some metadata.${ Swahili }`
    const { data } = convert(text, { scription })
    const [utterance] = data.utterances

    expect(utterance.metadata).to.be.undefined

  })

  it(`option: scription (validates)`, function() {
    const test = () => convert(Swahili, { scription: `string` })
    expect(test).to.throw(`scription`)
  })

  it(`option: tag`, function() {

    const tag      = `li`
    const { html } = convert(Swahili, { tag })
    const dom      = parse(html)
    const [ex]     = dom.childNodes

    expect(ex.tagName).to.equal(tag)

  })

  it(`option: tag (validates)`, function() {
    const test = () => convert(Swahili, { tag: 0 })
    expect(test).to.throw(`tag`)
  })

})
