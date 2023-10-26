import convert                    from '../../src/index.js'
import { parseFragment as parse } from 'parse5'

/**
 * A light wrapper/currying for scription2dlx -> parse5
 */
export default function convertToDOM(scription, options) {
  const { data, html } = convert(scription, options)
  const dom            = parse(html)
  return { data, dom, html }
}
