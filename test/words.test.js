import { expect }         from 'chai'
import findElementByClass from './utilities/findElementByClass.js'
import parse              from './utilities/convertAndParse.js'

describe(`words`, function() {

  it(`renders one HTML word per linguistic word`, function() {

    const scription = `
    waxdungu qasi
    waxt-qungu qasi
    day-one    man
    one day a man
    `

    const { dom }        = parse(scription)
    const wordsContainer = findElementByClass(dom, `words`)
    const wordItems      = wordsContainer.childNodes.filter(node => node.tagName === `li`)

    expect(wordItems).to.have.length(2)

  })

  it(`does not return a words element if there are no words lines`, function() {

    const scription = `
    waxdungu qasi
    one day a man
    `

    const { dom, html } = parse(scription)
    const wordsContainer = findElementByClass(dom, `words`)

    expect(wordsContainer).to.not.exist

  })

})
