import convert                    from '../index.js'
import { expect }                 from 'chai'
import { parseFragment as parse } from 'parse5'
import { Swahili }                from '../../samples/data/data.js'

import { findElement, getAttribute, hasAttribute } from '@web/parse5-utils'

describe(`metadata`, function() {

  it(`does not create an example header if no metadata is present`, function() {

    const { html } = convert(Swahili)
    const dom      = parse(html)
    const header   = findElement(dom, el => hasAttribute(el, `class`) && getAttribute(el, `class`).includes(`ex-header`))

    expect(header).to.not.exist

  })

  it(`creates the example header`, function() {

    const scription = `# Swahili\n${ Swahili }`
    const { html }  = convert(scription)
    const dom       = parse(html)
    const header    = findElement(dom, el => hasAttribute(el, `class`) && getAttribute(el, `class`).includes(`ex-header`))

    expect(header.childNodes[0].value).to.equal(`Swahili`)

  })

})
