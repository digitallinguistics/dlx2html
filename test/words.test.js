import { expect }          from 'chai'
import findElementByClass  from './utilities/findElementByClass.js'
import findElementsByClass from './utilities/findElementsByClass.js'
import { getTextContent }  from '../node_modules/@web/parse5-utils/src/index.js'
import parse               from './utilities/convertAndParse.js'

import {
  findElement,
  getTagName,
} from '@web/parse5-utils'

describe(`words`, function() {

  it(`renders one HTML word per linguistic word`, async function() {

    const scription = `
    waxdungu qasi
    waxt-qungu qasi
    day-one    man
    one day a man
    `

    const { dom }        = await parse(scription)
    const wordsContainer = findElementByClass(dom, `words`)
    const wordItems      = wordsContainer.childNodes.filter(node => node.tagName === `li`)

    expect(wordItems).to.have.length(2)

  })

  it(`does not return a words element if there are no words lines`, async function() {

    const scription = `
    waxdungu qasi
    one day a man
    `

    const { dom }        = await parse(scription)
    const wordsContainer = findElementByClass(dom, `words`)

    expect(wordsContainer).to.not.exist

  })

  describe(`word transcription`, function() {

    it(`renders in multiple orthographies`, async function() {

      const scription = `
      \\w-mod  waxdungu   qasi
      \\w-swad wašdungu   ʔasi
      \\m      waxt-qungu qasi
      \\gl     day-one    man
      \\tln    one day a man
      `

      const { dom }                 = await parse(scription)
      const wordsContainer          = findElementByClass(dom, `words`)
      const [firstWord, secondWord] = wordsContainer.childNodes.filter(node => node.tagName === `li`)

      const firstText = getTextContent(firstWord)
      expect(firstText).to.include(`waxdungu`)
      expect(firstText).to.include(`wašdungu`)

      const secondText = getTextContent(secondWord)
      expect(secondText).to.include(`qasi`)
      expect(secondText).to.include(`ʔasi`)

    })

    it(`supports emphasis`, async function() {

      const scription = `
      \\w   *waxdungu* qasi
      \\wlt *one.day*  man
      `

      const { dom } = await parse(scription)
      const b       = findElement(dom, el => getTagName(el) === `b`)

      expect(getTextContent(b)).to.equal(`waxdungu`)

    })

  })

  describe(`literal word translation`, function() {

    it(`single language`, async function() {

      const scription = `
      \\w   waxdungu qasi
      \\wlt one.day  a.man
      `

      const { dom }                 = await parse(scription)
      const wordsContainer          = findElementByClass(dom, `words`)
      const [firstWord, secondWord] = wordsContainer.childNodes.filter(node => node.tagName === `li`)

      expect(getTextContent(firstWord)).to.include(`one.day`)
      expect(getTextContent(secondWord)).to.include(`a.man`)

    })

    it(`multiple languages`, async function() {

      const scription = `
      \\w      waxdungu qasi
      \\wlt-en one.day  a.man
      \\wlt-sp un.día   un.hombre
      `

      const { dom }                 = await parse(scription)
      const wordsContainer          = findElementByClass(dom, `words`)
      const [firstWord, secondWord] = wordsContainer.childNodes.filter(node => node.tagName === `li`)

      expect(getTextContent(firstWord)).to.include(`one.day`)
      expect(getTextContent(firstWord)).to.include(`un.día`)
      expect(getTextContent(secondWord)).to.include(`a.man`)
      expect(getTextContent(secondWord)).to.include(`un.hombre`)

    })

    it(`supports emphasis`, async function() {

      const scription = `
      \\w   waxdungu  qasi
      \\wlt *one.day* man
      `

      const { dom } = await parse(scription)
      const b       = findElement(dom, el => getTagName(el) === `b`)

      expect(getTextContent(b)).to.equal(`one.day`)

    })

  })

  describe(`morphemic analysis`, function() {

    it(`renders (with non-breaking hyphens)`, async function() {

      const scription = `
      ninakupenda
      ni-na-ku-pend-a
      1SG.SUBJ-PRES-2SG.OBJ-love-IND
      I love you
      `

      const { dom }   = await parse(scription)
      const morphemes = findElementByClass(dom, `w-m`)

      expect(getTextContent(morphemes)).to.equal(`ni‑na‑ku‑pend‑a`) // non-breaking hyphens

    })

    it(`supports multiple orthographies`, async function() {

      const scription = `
      \\m-mod  waxt-qungu qasi
      \\m-swad wašt-ʔungu ʔasi
      \\gl     day-one  man
      `

      const { dom, html } = await parse(scription)
      const [mod, swad]   = findElementsByClass(dom, `w-m`)

      expect(getTextContent(mod)).to.equal(`waxt‑qungu`) // non-breaking hypens
      expect(getTextContent(swad)).to.equal(`wašt‑ʔungu`) // non-breaking hypens

    })

    it(`supports emphasis`, async function() {

      const scription = `
      ninakupenda
      ni-na-ku-*pend*-a
      1SG.SUBJ-PRES-2SG.OBJ-love-IND
      I love you
      `

      const { dom } = await parse(scription)
      const b       = findElement(dom, el => getTagName(el) === `b`)

      expect(getTextContent(b)).to.equal(`pend`) // non-breaking hyphens

    })

  })

})
