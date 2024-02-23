import addEmphasis from '../utilities/addEmphasis.js'

export default function createLiteral(data, { analysisLang }) {

  if (!data) return ``

  if (typeof data === `string`) {
    const lang = analysisLang ? `lang='${ analysisLang }'` : ``
    return `<span class=lit ${ lang }>${ addEmphasis(data) }</span>`
  }

  let html = ``

  for (const lang in data) {
    const tln = data[lang]
    html += `<span class=lit lang='${ lang }'>${ addEmphasis(tln) }</span>`
  }

  return html

}
