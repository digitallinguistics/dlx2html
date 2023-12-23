import convert            from '../src/index.js'
import { expect }         from 'chai'
import findElementByClass from './utilities/findElementByClass.js'
import { getAttribute }   from '@web/parse5-utils'
import { getTextContent } from '../node_modules/@web/parse5-utils/src/index.js'
import parse              from './utilities/convertAndParse.js'
import parseClassString   from './utilities/parseClassString.js'
import { Swahili }        from '../samples/data/data.js'


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

    const { dom } = parse(Swahili)

    expect(dom.childNodes).to.have.length(1)
    expect(dom.childNodes[0].tagName).to.equal(`div`)

  })

  it(`converts single utterances`, function() {
    const { dom } = parse(Swahili)
    expect(dom.childNodes).to.have.length(1)
  })

  it(`converts multiple utterances`, function() {

    const scription = `${ Swahili }\n\n${ Swahili }`
    const { dom }   = parse(scription)

    expect(dom.childNodes).to.have.length(2)

  })

  it(`option: analysisLang = undefined`, function() {

    const scription = `
    # Swahili
    \\txn ninakupenda
    \\m   ni-na-ku-pend-a
    \\gl  1SG.SUBJ-PRES-2SG.OBJ-love-IND
    \\lit Te estoy amando.
    \\tln Te amo.
    `

    const { dom } = parse(scription)

    const lit  = findElementByClass(dom, `lit`)
    const tln  = findElementByClass(dom, `tln`)
    const meta = findElementByClass(dom, `ex-header`)

    expect(getAttribute(lit, `lang`)).to.be.undefined
    expect(getAttribute(tln, `lang`)).to.be.undefined
    expect(getAttribute(meta, `lang`)).to.be.undefined

  })

  it(`option: analysisLang`, function() {

    const scription = `
    # Swahili
    \\txn ninakupenda
    \\m   ni-na-ku-pend-a
    \\gl  1SG.SUBJ-PRES-2SG.OBJ-love-IND
    \\lit Te estoy amando.
    \\tln Te amo.
    `

    const analysisLang = `sp`
    const { dom }      = parse(scription, { analysisLang })

    const lit  = findElementByClass(dom, `lit`)
    const tln  = findElementByClass(dom, `tln`)
    const meta = findElementByClass(dom, `ex-header`)

    expect(getAttribute(lit, `lang`)).to.equal(analysisLang)
    expect(getAttribute(tln, `lang`)).to.equal(analysisLang)
    expect(getAttribute(meta, `lang`)).to.equal(analysisLang)

  })

  it(`option: classes`, function() {

    const classes = [`example`, `interlinear`]
    const { dom } = parse(Swahili, { classes })
    const [ex]    = dom.childNodes

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

    const scription   = { utteranceMetadata: false }
    const text        = `# This is some metadata.${ Swahili }`
    const { data }    = convert(text, { scription })
    const [utterance] = data.utterances

    expect(utterance.metadata).to.be.undefined

  })

  it(`option: scription (validates)`, function() {
    const test = () => convert(Swahili, { scription: `string` })
    expect(test).to.throw(`scription`)
  })

  it(`option: tag`, function() {

    const tag     = `li`
    const { dom } = parse(Swahili, { tag })
    const [ex]    = dom.childNodes

    expect(ex.tagName).to.equal(tag)

  })

  it(`option: tag (validates)`, function() {
    const test = () => convert(Swahili, { tag: 0 })
    expect(test).to.throw(`tag`)
  })

})
