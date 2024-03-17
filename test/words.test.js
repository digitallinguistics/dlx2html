import { expect }          from 'chai'
import findElementByClass  from './utilities/findElementByClass.js'
import findElementsByClass from './utilities/findElementsByClass.js'
import { getTextContent }  from '../node_modules/@web/parse5-utils/src/index.js'
import parse               from './utilities/convertAndParse.js'

import {
  findElement,
  findElements,
  getAttribute,
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

    it(`has the correct number of lines`, async function() {

      const scription = `
      ninakupenda
      ni-na-ku-pend-a
      1SG.SUBJ-PRES-2SG.OBJ-love-IND
      I love you`

      const { dom } = await parse(scription)
      const word    = findElementByClass(dom, `word`)

      expect(word.childNodes).to.have.length(2)

    })

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

    it(`supports (manual) glosses`, async function() {

      const scription = `
      \\w qasi hix cuyi
      \\wlt man <abbr>erg</abbr> he.went
      `

      const { dom } = await parse(scription, { glosses: true })
      const abbr    = findElement(dom, el => getTagName(el) === `abbr`)

      expect(getTextContent(abbr)).to.equal(`erg`)

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
      const morphemes = findElementByClass(dom, `m`)

      expect(getTextContent(morphemes)).to.equal(`ni‑na‑ku‑pend‑a`) // non-breaking hyphens

    })

    it(`supports multiple orthographies`, async function() {

      const scription = `
      \\m-mod  waxt-qungu qasi
      \\m-swad wašt-ʔungu ʔasi
      \\gl     day-one  man
      `

      const { dom }     = await parse(scription)
      const [mod, swad] = findElementsByClass(dom, `m`)

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

  describe(`glosses`, function() {

    it(`renders (with non-breaking hyphens)`, async function() {

      const scription = `
      ninakupenda
      ni-na-ku-pend-a
      1SG.SUBJ-PRES-2SG.OBJ-love-IND
      I love you
      `

      const { dom }   = await parse(scription)
      const morphemes = findElementByClass(dom, `glosses`)

      expect(getTextContent(morphemes)).to.equal(`1SG.SUBJ‑PRES‑2SG.OBJ‑love‑IND`) // non-breaking hyphens

    })

    it(`supports multiple analysis languages`, async function() {

      const scription = `
      \\txn   ninakupenda
      \\m     ni-na-ku-pend-a
      \\gl-en 1SG.SUBJ-PRES-2SG.OBJ-love-IND
      \\gl-sp 1SG.SJ-PRES-2SG.OJ-amar-IND
      \\tln   I love you
      `

      const { dom }                   = await parse(scription)
      const [firstGloss, secondGloss] = findElementsByClass(dom, `glosses`)

      expect(getTextContent(firstGloss)).to.include(`SUBJ`)
      expect(getTextContent(secondGloss)).to.include(`SJ`)

    })

    it(`supports emphasis`, async function() {

      const scription = `
      ninakupenda
      ni-na-ku-pend-a
      1SG.SUBJ-PRES-*2SG.OBJ*-love-IND
      I love you
      `

      const { dom } = await parse(scription)
      const b       = findElement(dom, el => getTagName(el) === `b`)

      expect(getTextContent(b)).to.equal(`2SG.OBJ`)

    })

    it(`option: glosses = false (default)`, async function() {

      const scription = `
      ninakupenda
      ni-na-ku-pend-a
      1SG.SUBJ-PRES-2SG.OBJ-love-IND
      I love you
      `

      const { dom } = await parse(scription)
      const abbr    = findElement(dom, el => getTagName(el) === `abbr`)

      expect(abbr).not.to.exist

    })

    it(`option: glosses = true`, async function() {

      const scription = `
      ninakupenda
      ni-na-ku-pend-a
      1SG.SUBJ-PRES-2SG.OBJ-love-IND
      I love you
      `

      const { dom, html }       = await parse(scription, { glosses: true })
      const glosses       = findElements(dom, el => getTagName(el) === `abbr`)
      const [person, num] = glosses

      expect(glosses).to.have.length(8)
      expect(getTextContent(person)).to.equal(`1`)
      expect(getTextContent(num)).to.equal(`sg`)

    })

    it(`option: glosses (lowercase glosses)`, async function() {

      const scription = `
      ninakupenda
      ni-na-ku-pend-a
      1sg.SUBJ-PRES-2sg.OBJ-love-IND
      I love you
      `

      const { dom }       = await parse(scription, { glosses: true })
      const glosses       = findElements(dom, el => getTagName(el) === `abbr`)
      const [person, num] = glosses

      expect(glosses).to.have.length(8)
      expect(getTextContent(person)).to.equal(`1`)
      expect(getTextContent(num)).to.equal(`sg`)

    })

    it(`option: glosses (lowercase smallcaps)`, async function() {

      const scription = `
      ninakupenda
      ni-na-ku-pend-a
      1SG.SUBJ-PRES-2SG.OBJ-love-IND
      I love you
      `

      const { dom, html } = await parse(scription, { glosses: true })
      const glosses       = findElements(dom, el => getTagName(el) === `abbr`)
      const [person, num] = glosses

      expect(getTextContent(person)).to.equal(`1`)
      expect(getTextContent(num)).to.equal(`sg`)

    })

    it(`option: abbreviations`, async function() {

      const scription = `
      ninakupenda
      ni-na-ku-pend-a
      1SG.SUBJ-PRES-2SG.OBJ-love-IND
      I love you
      `

      const abbreviations = {
        1:  `first person`,
        SG:  `singular`,
      }

      const { dom }       = await parse(scription, { abbreviations, glosses: true })
      const glosses       = findElements(dom, el => getTagName(el) === `abbr`)
      const [person, num] = glosses

      expect(glosses).to.have.length(8)
      expect(getAttribute(person, `title`)).to.equal(`first person`)
      expect(getAttribute(num, `title`)).to.equal(`singular`)

    })

  })

})
