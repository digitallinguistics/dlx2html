import addEmphasis    from '../utilities/addEmphasis.js'
import replaceHyphens from '../utilities/replaceHyphens.js'

export default function createMorphemes(data, { targetLang }) {

  const lang = targetLang ? `lang='${ targetLang }'` : ``
  let html = ``

  for (const ortho in data) {
    const morphemes = addEmphasis(replaceHyphens(data[ortho]))
    html += `<span class=w-m data-ortho='${ ortho }' ${ lang }>${ morphemes }</span>`
  }

  return html

}
