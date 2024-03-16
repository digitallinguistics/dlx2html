import convert            from '../src/index.js'
import { expect }         from 'chai'
import findElementByClass from './utilities/findElementByClass.js'
import { getAttribute }   from '@web/parse5-utils'
import parse              from './utilities/convertAndParse.js'
import parseClassString   from './utilities/parseClassString.js'
import { Swahili }        from '../samples/data/data.js'

describe(`dlx2html`, function() {

  it(`wraps utterances in <div class=igl> by default`, async function() {

    const { dom } = await parse(Swahili)

    expect(dom.childNodes).to.have.length(1)
    expect(dom.childNodes[0].tagName).to.equal(`div`)

  })

  it(`converts single utterances`, async function() {
    const { dom } = await parse(Swahili)
    expect(dom.childNodes).to.have.length(1)
  })

  it(`converts multiple utterances`, async function() {

    const scription = `${ Swahili }\n\n${ Swahili }`
    const { dom }   = await parse(scription)

    expect(dom.childNodes).to.have.length(2)

  })

  it(`option: analysisLang = undefined`, async function() {

    const scription = `
    # Swahili
    \\txn ninakupenda
    \\m   ni-na-ku-pend-a
    \\gl  1SG.SUBJ-PRES-2SG.OBJ-love-IND
    \\lit Te estoy amando.
    \\tln Te amo.
    `

    const { dom } = await parse(scription)

    const lit  = findElementByClass(dom, `lit`)
    const tln  = findElementByClass(dom, `tln`)
    const meta = findElementByClass(dom, `ex-header`)

    expect(getAttribute(lit, `lang`)).to.be.undefined
    expect(getAttribute(tln, `lang`)).to.be.undefined
    expect(getAttribute(meta, `lang`)).to.be.undefined

  })

  it(`option: analysisLang`, async function() {

    const scription = `
    # Swahili
    \\txn ninakupenda
    \\m   ni-na-ku-pend-a
    \\gl  1SG.SUBJ-PRES-2SG.OBJ-love-IND
    \\lit Te estoy amando.
    \\tln Te amo.
    `

    const analysisLang = `sp`
    const { dom, html }      = await parse(scription, { analysisLang })

    const lit                = findElementByClass(dom, `lit`)
    const tln                = findElementByClass(dom, `tln`)
    const meta               = findElementByClass(dom, `ex-header`)
    const literalTranslation = findElementByClass(lit, `tln`)

    expect(getAttribute(literalTranslation, `lang`)).to.equal(analysisLang)
    expect(getAttribute(tln, `lang`)).to.equal(analysisLang)
    expect(getAttribute(meta, `lang`)).to.equal(analysisLang)

  })

  it(`option: classes`, async function() {

    const classes = [`example`, `interlinear`]
    const { dom } = await parse(Swahili, { classes })
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

  it(`option: tag`, async function() {

    const tag     = `li`
    const { dom } = await parse(Swahili, { tag })
    const [ex]    = dom.childNodes

    expect(ex.tagName).to.equal(tag)

  })

  it(`option: tag (validates)`, async function() {
    try {
      await parse(Swahili, { tag: 0 })
    } catch (error) {
      expect(error.message).to.contain(`tag`)
    }
  })

  it(`option: targetLang = undefined`, async function() {

    const scription = `
    \\trs Ninakupenda.↗
    `

    const { dom } = await parse(scription)

    const transcript = findElementByClass(dom, `trs`)

    expect(getAttribute(transcript, `lang`)).to.be.undefined


  })

  it(`option: targetLang`, async function() {

    const scription = `
    \\trs Ninakupenda.↗
    \\txn ninakupenda
    `

    const targetLang = `swa`
    const { dom }    = await parse(scription, { targetLang })
    const trs        = findElementByClass(dom, `trs`)
    const txn        = findElementByClass(dom, `txn`)

    expect(getAttribute(trs, `lang`)).to.equal(targetLang)
    expect(getAttribute(txn, `lang`)).to.equal(targetLang)


  })

})
