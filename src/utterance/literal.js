import addEmphasis from '../utilities/addEmphasis.js'

export default function createLiteral(data, { analysisLang }) {

  if (!data) return ``

  if (typeof data === `string`) {
    const lang = analysisLang ? `lang='${ analysisLang }'` : ``
    return `<p class=lit><i lang=en>lit.</i> <span class=tln ${ lang }>${ addEmphasis(data) }</span></p>`
  }

  let html = ``

  for (const lang in data) {
    const lit = data[lang]
    html += `<p class=lit><i lang=en>lit.</i> <span class=tln lang='${ lang }'>${ addEmphasis(lit) }</span></p>`
  }

  return html

}
