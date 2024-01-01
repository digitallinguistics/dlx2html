import addEmphasis from '../utilities/addEmphasis.js'

export default function createTranslation(data, { analysisLang }) {

  if (!data) return ``

  if (typeof data === `string`) {
    const lang = analysisLang ? `lang='${ analysisLang }'` : ``
    return `<p class=tln ${ lang }>${ addEmphasis(data) }</p>`
  }

  let html = ``

  for (const lang in data) {
    const tln = data[lang]
    html += `<p class=tln lang='${ lang }'>${ addEmphasis(tln) }</p>`
  }

  return html

}
