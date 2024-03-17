import addEmphasis from '../utilities/addEmphasis.js'

export default function createLiteral(data, { analysisLang }) {

  if (!data) return ``

  if (typeof data === `string`) {
    const lang = analysisLang ? `lang='${ analysisLang }'` : ``
    return `<span class=wlt ${ lang }>${ addEmphasis(data) }</span>`
  }

  let html = ``

  for (const lang in data) {
    const tln = data[lang]
    html += `<span class=wlt lang='${ lang }'>${ addEmphasis(tln) }</span>`
  }

  return html

}
