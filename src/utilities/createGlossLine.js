import addEmphasis    from '../utilities/addEmphasis.js'
import replaceHyphens from '../utilities/replaceHyphens.js'

const glossRegExp  = /(?<gloss>[1-4]|[A-Z]+)/gv
const numberRegExp = /(?<=[1-4])(?<number>sg|du|pl)\b/giv

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
    // These replacements are sensitive to ordering.
    data = data
    .replaceAll(numberRegExp, wrapGloss)
    .replaceAll(glossRegExp, wrapGloss)
  }

  data = replaceHyphens(data)
  data = addEmphasis(data)

  return `<span class='${ cssClass }' ${ lang }>${ data }</span>`

}
