import { expect }          from 'chai'
import findElementByClass  from './utilities/findElementByClass.js'
import findElementsByClass from './utilities/findElementsByClass.js'
import { getAttribute }    from '@web/parse5-utils'
import { getTextContent }  from '../node_modules/@web/parse5-utils/src/index.js'
import parse               from './utilities/convertAndParse.js'

import { ChitimachaText, OldLatin, Swahili } from '../samples/data/data.js'

describe(`lines`, function() {

  it(`free translation`, function() {

    const { dom } = parse(OldLatin)
    const tln     = findElementsByClass(dom, `tln`)

    expect(tln).to.have.length(2)

    const [lat, eng] = tln

    expect(getAttribute(lat, `lang`)).to.equal(`lat`)
    expect(getAttribute(eng, `lang`)).to.equal(`eng`)
    expect(getTextContent(lat)).to.include(`mittit`)
    expect(getTextContent(eng)).to.include(`sends`)

  })

  it(`literal translation`, function() {

    const scription = `
    \\txn    xaa qapx guxna
    \\m      xaq qapx guxt-na
    \\gl     mouth recip eat-nf.pl
    \\tln    they kissed each other
    \\lit-en they ate each other's mouths
    \\lit-sp se comen sus bocas
    `

    const { dom } = parse(scription)
    const literal = findElementsByClass(dom, `lit`)

    expect(literal).to.have.length(2)

    const [eng, spa] = literal

    expect(getAttribute(eng, `lang`)).to.equal(`en`)
    expect(getAttribute(spa, `lang`)).to.equal(`sp`)
    expect(getTextContent(eng)).to.equal(`they ate each other's mouths`)
    expect(getTextContent(spa)).to.equal(`se comen sus bocas`)

  })

  describe(`metadata`, function() {

    it(`is not present when there is no data`, function() {

      const { dom } = parse(Swahili)
      const header  = findElementByClass(dom, `ex-header`)

      expect(header).to.not.exist

    })

    it(`creates the example header`, function() {

      const scription = `# Swahili\n${ Swahili }`
      const { dom }   = parse(scription)
      const header    = findElementByClass(dom, `ex-header`)

      expect(header.childNodes[0].value).to.equal(`Swahili`)

    })

  })

  it(`phonetic transcription`, function() {

    const phonetic = `ɔ́gɔ̀tɛ́ɛ́rɛ̀rà`

    const scription = `
    \\phon ${ phonetic }
    \\m    ó-ko-tɛ́ɛr-er-a
    \\gl   pp-5-sing-appl-ind
    `

    const { dom } = parse(scription)
    const el      = findElementByClass(dom, `phon`)

    // has .phon class
    expect(getTextContent(el)).to.equal(phonetic)

  })

  describe(`phonemic transcription`, function() {

    it(`produces one line per orthography`, function() {

      const scription = `
      \\txn-mod  waxdungu qasi
      \\txn-swad wašdungu ʔasi
      \\txn-apa  waštʼunkʼu ʔasi
      \\m        waxt-qungu qasi
      \\gl       day-one    man
      \\tln      one day a man
      `

      const { dom }     = parse(scription)
      const [ex]        = dom.childNodes
      const transcripts = findElementsByClass(ex, `txn`)

      expect(transcripts).to.have.length(3)

      const [mod, swad, apa] = transcripts

      expect(getAttribute(mod, `data-ortho`)).to.equal(`mod`)
      expect(getAttribute(swad, `data-ortho`)).to.equal(`swad`)
      expect(getAttribute(apa, `data-ortho`)).to.equal(`apa`)
      // have correct text

    })

  })

  describe(`source`, function() {

    it(`is not present when there is no data`, function() {

      const { dom } = parse(Swahili)
      const source  = findElementByClass(dom, `ex-source`)

      expect(source).not.to.exist

    })

    it(`contains the speaker data`, function() {

      const scription = `
      \\txn ninaenda
      \\m   ni-na-end-a
      \\gl  1sg.subj-pres-go-ind
      \\tln I am going
      \\sp  Hamisi
      `

      const { dom } = parse(scription)
      const source  = findElementByClass(dom, `ex-source`)
      const text    = getTextContent(source)

      expect(text).to.equal(`Hamisi`)
      // has correct CSS class

    })

    it(`contains the bibliographic source data`, function() {

      const scription = `
      \\txn ninaenda
      \\m   ni-na-end-a
      \\gl  1sg.subj-pres-go-ind
      \\tln I am going
      \\s   Hieber 2018: 1
      `

      const { dom } = parse(scription)
      const source  = findElementByClass(dom, `ex-source`)
      const text    = getTextContent(source)

      expect(text).to.equal(`(Hieber 2018: 1)`)
      // has correct CSS class

    })

    it(`contains both speaker and source data`, function() {

      const scription = `
      \\txn ninaenda
      \\m   ni-na-end-a
      \\gl  1sg.subj-pres-go-ind
      \\tln I am going
      \\sp  Hamisi
      \\s   Hieber 2018: 1
      `

      const { dom } = parse(scription)
      const source = findElementByClass(dom, `ex-source`)
      const text = getTextContent(source)

      expect(text).to.equal(`Hamisi (Hieber 2018: 1)`)
      // has correct CSS class

    })

  })

  describe(`transcript`, function() {

    it(`produces one line per orthography`, function() {

      const { dom }     = parse(ChitimachaText)
      const [ex]        = dom.childNodes
      const transcripts = findElementsByClass(ex, `trs`)

      expect(transcripts).to.have.length(2)

      const [mod, swad] = transcripts

      expect(getAttribute(mod, `data-ortho`)).to.equal(`Modern`)
      expect(getAttribute(swad, `data-ortho`)).to.equal(`Swadesh`)
      // has correct text

    })

  })

})

