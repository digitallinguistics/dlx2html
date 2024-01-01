import convert                    from '../../src/index.js'
import { parseFragment as parse } from 'parse5'
import prettier                   from 'prettier'

/**
 * A light wrapper/currying for scription2dlx -> parse5
 */
export default async function convertAndParse(scription, options) {
  const { data, html } = convert(scription, options)
  const dom            = parse(html)
  const formatted      = await prettier.format(html, { parser: `html` })
  return { data, dom, html: formatted }
}
