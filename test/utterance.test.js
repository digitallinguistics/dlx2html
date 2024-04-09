import { expect }          from 'chai'
import findElementByClass  from './utilities/findElementByClass.js'
import findElementsByClass from './utilities/findElementsByClass.js'
import { getTextContent }  from '../node_modules/@web/parse5-utils/src/index.js'
import parse               from './utilities/convertAndParse.js'

import {
  findElement,
  getAttribute,
  getTagName,
} from '@web/parse5-utils'

import { ChitimachaText, OldLatin, Swahili } from '../samples/data/data.js'

describe(`utterance`, function() {

  describe(`free translation`, function() {

    it(`renders`, async function() {

      const { dom } = await parse(OldLatin)
      const tln     = findElementsByClass(dom, `tln`)

      expect(tln).to.have.length(2)

      const [lat, eng] = tln

      expect(getAttribute(lat, `lang`)).to.equal(`lat`)
      expect(getAttribute(eng, `lang`)).to.equal(`eng`)
      expect(getTextContent(lat)).to.include(`mittit`)
      expect(getTextContent(eng)).to.include(`sends`)

    })

    it(`renders with emphasis`, async function() {

      // Mandinka, from ex. 2 of your dissertation
      const scription = `
      \\txn *Kuuráŋ*o mâŋ díyaa.
      \\m   *kuuráŋ*-o mâŋ     díyaa
      \\gl  *sick*-def pfv.neg pleasant
      \\tln *Sickness* is not pleasant.
      \\s   Creissels 2017: 46

      \\txn Díndíŋo máŋ *kuraŋ*.
      \\m   díndíŋ-o  máŋ     *kuraŋ*
      \\gl  child-def pfv.neg *sick*
      \\tln The child is not *sick*.
      \\s   Creissels 2017: 46
      `

      const { dom } = await parse(scription)
      const tln     = findElementByClass(dom, `tln`)
      const b       = findElement(tln, el => getTagName(el) === `b`)

      expect(getTextContent(b)).to.equal(`Sickness`)

    })

  })


  describe(`literal translation`, function() {

    it(`renders`, async function() {

      const scription = `
      \\txn    xaa qapx guxna
      \\m      xaq qapx guxt-na
      \\gl     mouth recip eat-nf.pl
      \\tln    they kissed each other
      \\lit-en they ate each other's mouths
      \\lit-sp se comen sus bocas
      `

      const { dom } = await parse(scription)
      const literal = findElementsByClass(dom, `lit`)

      expect(literal).to.have.length(2)

      const [eng, spa] = literal
      const engLiteral = findElementByClass(eng, `tln`)
      const spaLiteral = findElementByClass(spa, `tln`)

      expect(getAttribute(engLiteral, `lang`)).to.equal(`en`)
      expect(getAttribute(spaLiteral, `lang`)).to.equal(`sp`)
      expect(getTextContent(engLiteral)).to.equal(`they ate each other's mouths`)
      expect(getTextContent(spaLiteral)).to.equal(`se comen sus bocas`)

    })

    it(`renders with emphasis`, async function() {

      const scription = `# Causative-Reversive
      \\trs Satia’tawi*’t*á*hsi*!
      \\m   s-at-ia’t-a-wi-*’t*-a-*hsi*
      \\gl  2sg.agt-mid-body-jr-cover-*caus*-jr-*rev*
      \\lit *un-cause* your body to be covered, uncover your body
      \\tln Take your coat off!`

      const { dom } = await parse(scription)
      const literal = findElementByClass(dom, `lit`)
      const b       = findElement(literal, el => getTagName(el) === `b`)

      expect(getTextContent(b)).to.equal(`un-cause`)

    })

  })

  describe(`metadata`, function() {

    it(`is not present when there is no data`, async function() {

      const { dom } = await parse(Swahili)
      const header  = findElementByClass(dom, `ex-header`)

      expect(header).to.not.exist

    })

    it(`creates the example header`, async function() {

      const scription = `# Swahili\n${ Swahili }`
      const { dom }   = await parse(scription)
      const header    = findElementByClass(dom, `ex-header`)

      expect(header.childNodes[0].value).to.equal(`Swahili`)

    })

  })

  describe(`phonemic transcription`, function() {

    it(`produces one line per orthography`, async function() {

      const scription = `
      \\txn-mod  waxdungu qasi
      \\txn-swad wašdungu ʔasi
      \\txn-apa  waštʼunkʼu ʔasi
      \\m        waxt-qungu qasi
      \\gl       day-one    man
      \\tln      one day a man
      `

      const { dom } = await parse(scription)
      const [ex] = dom.childNodes
      const transcripts = findElementsByClass(ex, `txn`)

      expect(transcripts).to.have.length(3)

      const [mod, swad, apa] = transcripts

      expect(getAttribute(mod, `data-ortho`)).to.equal(`mod`)
      expect(getAttribute(swad, `data-ortho`)).to.equal(`swad`)
      expect(getAttribute(apa, `data-ortho`)).to.equal(`apa`)

      expect(getTextContent(mod)).to.equal(`waxdungu qasi`)
      expect(getTextContent(swad)).to.equal(`wašdungu ʔasi`)
      expect(getTextContent(apa)).to.equal(`waštʼunkʼu ʔasi`)

    })

    it(`renders emphasis`, async function() {

      const scription = `
      \\txn  wax*d*ungu qasi
      \\m    waxt-qungu qasi
      \\gl   day-one    man
      \\tln  one day a man
      `

      const { dom } = await parse(scription)
      const txn = findElementByClass(dom, `txn`)
      const b = findElement(txn, el => getTagName(el) === `b`)

      expect(getTextContent(b)).to.equal(`d`)

    })

  })

  describe(`phonetic transcription`, function() {

    it(`renders`, async function() {

      const phonetic = `ɔ́gɔ̀tɛ́ɛ́rɛ̀rà`

      const scription = `
      \\phon ${ phonetic }
      \\m    ó-ko-tɛ́ɛr-er-a
      \\gl   pp-5-sing-appl-ind
      `

      const { dom } = await parse(scription)
      const el      = findElementByClass(dom, `phon`)

      expect(getTextContent(el)).to.equal(phonetic)

    })

    it(`renders with emphasis`, async function() {

      const phonetic = `ɔ́gɔ̀*tɛ́ɛ́r*ɛ̀rà`

      const scription = `
      \\phon ${ phonetic }
      \\m    ó-ko-*tɛ́ɛr*-er-a
      \\gl   pp-5-*sing*-appl-ind
      `

      const { dom } = await parse(scription)
      const phon    = findElementByClass(dom, `phon`)
      const b       = findElement(phon, el => getTagName(el) === `b`)

      expect(getTextContent(b)).to.equal(`tɛ́ɛ́r`)

    })

    it(`option: targetLang = undefined`, async function() {

      const scription = `
      \\phon ɔ́gɔ̀tɛ́ɛ́rɛ̀rà
      \\m    ó-ko-tɛ́ɛr-er-a
      \\gl   pp-5-sing-appl-ind
      `

      const { dom } = await parse(scription)
      const phon    = findElementByClass(dom, `phon`)

      expect(getAttribute(phon, `lang`)).to.be.undefined

    })

    it(`option: targetLang`, async function() {

      const scription = `
      \\phon ɔ́gɔ̀tɛ́ɛ́rɛ̀rà
      \\m    ó-ko-tɛ́ɛr-er-a
      \\gl   pp-5-sing-appl-ind
      `

      const { dom } = await parse(scription, { targetLang: `guz` })
      const phon    = findElementByClass(dom, `phon`)

      expect(getAttribute(phon, `lang`)).to.equal(`guz-fonipa`)

    })

  })

  describe(`source`, function() {

    it(`is not present when there is no data`, async function() {

      const { dom } = await parse(Swahili)
      const source  = findElementByClass(dom, `ex-source`)

      expect(source).not.to.exist

    })

    it(`contains the speaker data`, async function() {

      const scription = `
      \\txn ninaenda
      \\m   ni-na-end-a
      \\gl  1sg.subj-pres-go-ind
      \\tln I am going
      \\sp  Hamisi
      `

      const { dom } = await parse(scription)
      const source  = findElementByClass(dom, `ex-source`)
      const text    = getTextContent(source)

      expect(text).to.equal(`Hamisi`)

    })

    it(`contains the bibliographic source data`, async function() {

      const scription = `
      \\txn ninaenda
      \\m   ni-na-end-a
      \\gl  1sg.subj-pres-go-ind
      \\tln I am going
      \\s   Hieber (2018: 1)
      `

      const { dom } = await parse(scription)
      const source  = findElementByClass(dom, `ex-source`)
      const text    = getTextContent(source)

      expect(text).to.equal(`Hieber (2018: 1)`)

    })

    it(`contains both speaker and source data`, async function() {

      const scription = `
      \\txn ninaenda
      \\m   ni-na-end-a
      \\gl  1sg.subj-pres-go-ind
      \\tln I am going
      \\sp  Hamisi
      \\s   (Hieber 2018: 1)
      `

      const { dom } = await parse(scription)
      const source  = findElementByClass(dom, `ex-source`)
      const text    = getTextContent(source)

      expect(text).to.equal(`Hamisi; (Hieber 2018: 1)`)

    })

  })

  it(`timespan`, async function() {

    const scription = `
    \\txn ninaenda
    \\m   ni-na-end-a
    \\gl  1SG-PRES-go-IND
    \\tln I am going
    \\t   1.234-5.678
    `

    const { dom }  = await parse(scription)
    const timespan = findElementByClass(dom, `timespan`)
    const text     = getTextContent(timespan)

    expect(text).to.include(`1.234`)
    expect(text).to.include(`5.678`)

  })

  describe(`transcript`, function() {

    it(`produces one line per orthography`, async function() {

      const { dom }     = await parse(ChitimachaText)
      const [ex]        = dom.childNodes
      const transcripts = findElementsByClass(ex, `trs`)

      expect(transcripts).to.have.length(2)

      const [mod, swad] = transcripts

      expect(getAttribute(mod, `data-ortho`)).to.equal(`Modern`)
      expect(getAttribute(swad, `data-ortho`)).to.equal(`Swadesh`)
      expect(getTextContent(mod)).to.include(`naancaakamankx`)
      expect(getTextContent(swad)).to.include(`na·nča·kamankšˊ`)

    })

    it(`renders emphasis`, async function() {

      const scription = `# Causative-Reversive
      \\trs Satia’tawi*’t*á*hsi*!
      \\m   s-at-ia’t-a-wi-*’t*-a-*hsi*
      \\gl  2sg.agt-mid-body-jr-cover-*caus*-jr-*rev*
      \\lit *un-cause* your body to be covered, uncover your body
      \\tln Take your coat off!`

      const { dom }    = await parse(scription)
      const transcript = findElementByClass(dom, `trs`)
      const b          = findElement(transcript, el => getTagName(el) === `b`)

      expect(getTextContent(b)).to.equal(`’t`)

    })

  })

})

