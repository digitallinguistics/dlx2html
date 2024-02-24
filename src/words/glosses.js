import addEmphasis    from '../utilities/addEmphasis.js'
import replaceHyphens from '../utilities/replaceHyphens.js'

const glossRegExp  = /(?<gloss>[1-4]|[A-Z]+)/gv
const numberRegExp = /\b(?<number>sg|du|pl)\b/gv

function createGlossLine(glosses, language, { abbreviations, glosses: glossesOption }) {

  const lang = language ? `lang='${ language }'` : ``

  const wrapGloss = gloss => {
    const title = abbreviations[gloss] ? `title='${ abbreviations[gloss] }'` : ``
    return `<abbr ${ title }>${ gloss }</abbr>`
  }

  if (glossesOption === true) {
    glosses = glosses
    .replaceAll(glossRegExp, wrapGloss)
    .replaceAll(numberRegExp, wrapGloss)
  }

  glosses = replaceHyphens(glosses)
  glosses = addEmphasis(glosses)

  return `<span class=glosses ${ lang }>${ glosses }</span>`

}

export default function createGlosses(data, options) {

  if (!data) return ``

  if (typeof data === `string`) {
    return createGlossLine(data, options.analysisLang, options)
  }

  let html = ``

  for (const lang in data) {
    html += createGlossLine(data[lang], lang, options)
  }

  return html

}
