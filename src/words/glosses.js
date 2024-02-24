import addEmphasis    from '../utilities/addEmphasis.js'
import replaceHyphens from '../utilities/replaceHyphens.js'

const glossRegExp  = /(?<gloss>[1-4]|[A-Z]+)/gv
const numberRegExp = /\b(?<number>sg|du|pl)\b/gv

function createGlossLine(glosses, language, option) {

  const lang = language ? `lang='${ language }'` : ``

  if (option === true) glosses = wrapGlosses(glosses)
  glosses = replaceHyphens(glosses)
  glosses = addEmphasis(glosses)

  return `<span class=glosses ${ lang }>${ glosses }</span>`

}

/**
 * Finds all numbers and capitalized glosses in a string and wraps them in `<abbr>` tags.
 * @param {string} glosses
 * @returns {string}
 */
function wrapGlosses(glosses) {
  return glosses
  .replaceAll(glossRegExp, `<abbr>$1</abbr>`)
  .replaceAll(numberRegExp, `<abbr>$1</abbr>`)
}

export default function createGlosses(data, { analysisLang, glosses: glossesOption }) {

  if (!data) return ``

  if (typeof data === `string`) {
    return createGlossLine(data, analysisLang, glossesOption)
  }

  let html = ``

  for (const lang in data) {
    html += createGlossLine(data[lang], lang, glossesOption)
  }

  return html

}
