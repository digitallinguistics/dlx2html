import convert                    from './index.js'
import { expect }                 from 'chai'
import { getAttribute }           from '@web/parse5-utils'
import { getTextContent }         from './node_modules/@web/parse5-utils/src/index.js' // getTextContent() isn't exported by the ESM version for some reason.
import { parseFragment as parse } from 'parse5'

const swahili = `
ninaenda
ni-na-end-a
1SG-PRES-go-IND
I am going`

const chiti = `
waxdungu qasi
waxt-qungu qasi
day-one    man
one day a man
`

function parseClassString(str) {
  return str.split(/\s+/giv)
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
    ${ swahili }
    `

    const runTest = () => convert(input)

    expect(runTest).not.to.throw()

  })

  it(`can access the underlying data`, function() {
    const { data } = convert(swahili)
    expect(data.utterances).to.have.length(1)
  })

  it(`wraps utterances in <div class=igl> by default`, function() {

    const { html } = convert(swahili)
    const dom      = parse(html)

    expect(dom.childNodes).to.have.length(1)
    expect(dom.childNodes[0].tagName).to.equal(`div`)

  })

  it(`converts single utterances`, function() {

    const { html } = convert(swahili)
    const dom      = parse(html)

    expect(dom.childNodes).to.have.length(1)

    const [ex] = dom.childNodes

    expect(getTextContent(ex)).to.include(`ninaenda`)

  })

  it(`converts multiple utterances`, function() {

    const { html } = convert(`${ swahili }\n\n${ chiti }`)
    const dom      = parse(html)

    expect(dom.childNodes).to.have.length(2)

  })

  it(`option: classes`, function() {

    const classes  = [`example`, `interlinear`]
    const { html } = convert(swahili, { classes })
    const dom      = parse(html)
    const [ex]     = dom.childNodes

    const classString   = getAttribute(ex, `class`)
    const outputClasses = parseClassString(classString)

    expect(outputClasses).to.have.length(2)
    expect(outputClasses).to.include(`example`)
    expect(outputClasses).to.include(`interlinear`)

  })

  it(`option: tag`, function() {

    const tag      = `li`
    const { html } = convert(swahili, { tag })
    const dom      = parse(html)
    const [ex]     = dom.childNodes

    expect(ex.tagName).to.equal(tag)

  })

  it(`option: scription`, function() {

    const scription   = { utteranceMetadata: false }
    const text        = `# This is some metadata.${ swahili }`
    const { data }    = convert(text, { scription })
    const [utterance] = data.utterances

    expect(utterance.metadata).to.be.undefined

  })

})
