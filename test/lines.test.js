import { expect }          from 'chai'
import findElementByClass  from './utilities/findElementByClass.js'
import findElementsByClass from './utilities/findElementsByClass.js'
import { getAttribute }    from '@web/parse5-utils'
import { getTextContent }  from '../node_modules/@web/parse5-utils/src/index.js'
import parse               from './utilities/convertAndParse.js'

import { ChitimachaText, Swahili } from '../samples/data/data.js'

describe(`lines`, function() {

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

  describe(`transcript`, function() {

    it(`produces one line per orthography`, function() {

      const { dom }     = parse(ChitimachaText)
      const [ex]        = dom.childNodes
      const transcripts = findElementsByClass(ex, `trs`)

      expect(transcripts).to.have.length(2)

      const [mod, swad] = transcripts

      expect(getAttribute(mod, `data-ortho`)).to.equal(`Modern`)
      expect(getAttribute(swad, `data-ortho`)).to.equal(`Swadesh`)

    })

  })

  describe(`transcription`, function() {

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

    })

  })

})

