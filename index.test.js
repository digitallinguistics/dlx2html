import convert                    from './index.js'
import { expect }                 from 'chai'
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
    ${ swahili }
    `

    const runTest = () => convert(input)

    expect(runTest).not.to.throw()

  })

  it(`wraps utterances in <div class=igl> by default`, function() {

    const output = convert(swahili)
    const dom    = parse(output)

    expect(dom.childNodes).to.have.length(1)
    expect(dom.childNodes[0].tagName).to.equal(`div`)

  })

  it(`converts single utterances`, function() {

    const output = convert(swahili)
    const dom    = parse(output)

    expect(dom.childNodes).to.have.length(1)

    const [ex] = dom.childNodes

    expect(getTextContent(ex)).to.include(`ninaenda`)

  })

  it(`converts multiple utterances`, function() {

    const output = convert(`${ swahili }\n\n${ chiti }`)
    const dom    = parse(output)

    expect(dom.childNodes).to.have.length(2)

  })

  it(`option: tag`, function() {

    const tag    = `li`
    const output = convert(swahili, { tag })
    const dom    = parse(output)

    const [ex] = dom.childNodes

    expect(ex.tagName).to.equal(tag)

  })

})
