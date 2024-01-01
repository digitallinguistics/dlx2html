import addEmphasis from '../utilities/addEmphasis.js'

export default function createLiteral(data, { analysisLang }) {

  if (!data) return ``

  if (typeof data === `string`) {
    const lang = analysisLang ? `lang='${ analysisLang }'` : ``
    return `<p class=lit ${ lang }>${ addEmphasis(data) }</p>`
  }

  let html = ``

  for (const lang in data) {
    const lit = data[lang]
    html += `<p class=lit lang='${ lang }'>${ addEmphasis(lit) }</p>`
  }

  return html

}
