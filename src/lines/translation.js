import addEmphasis from '../utilities/addEmphasis.js'

export default function createTranslation(data) {

  if (typeof data === `string`) {
    return `<p class=tln lang=en>${ addEmphasis(data) }</p>`
  }

  let html = ``

  for (const lang in data) {
    const tln = data[lang]
    html += `<p class=tln lang='${ lang }'>${ addEmphasis(tln) }</p>`
  }

  return html

}
