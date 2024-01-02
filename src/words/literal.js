export default function createLiteral(data, { analysisLang }) {

  if (!data) return ``

  if (typeof data === `string`) {
    const lang = analysisLang ? `lang='${ analysisLang }'` : ``
    return `<span class=w-lit ${ lang }>${ data }</span>`
  }

  let html = ``

  for (const lang in data) {
    const tln = data[lang]
    html += `<span class=w-lit lang='${ lang }'>${ tln }</span>`
  }

  return html

}
