import addEmphasis    from '../utilities/addEmphasis.js'
import replaceHyphens from '../utilities/replaceHyphens.js'

const glossRegExp  = /(?<gloss>[1-4]|[A-Z]+)/gv
const numberRegExp = /\b(?<number>sg|du|pl)\b/gv

export default function createGlossLine(
  data,
  analysisLang,
  cssClass,
  { abbreviations, glosses: glossesOption },
) {

  const lang = analysisLang ? `lang='${ analysisLang }'` : ``

  const wrapGloss = gloss => {
    const title = abbreviations[gloss] ? `title='${ abbreviations[gloss] }'` : ``
    return `<abbr ${ title }>${ gloss.toLowerCase() }</abbr>`
  }

  if (glossesOption === true) {
    data = data
    .replaceAll(numberRegExp, wrapGloss) // This replacement should come first, in order to avoid double-wrapping of number glosses.
    .replaceAll(glossRegExp, wrapGloss)
  }

  data = replaceHyphens(data)
  data = addEmphasis(data)

  return `<span class='${ cssClass }' ${ lang }>${ data }</span>`

}
