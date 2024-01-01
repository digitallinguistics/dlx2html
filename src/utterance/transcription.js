import addEmphasis from '../utilities/addEmphasis.js'

export default function createTranscription(data, { targetLang }) {

  if (!data) return ``

  const lang = targetLang ? `lang='${ targetLang }'` : ``
  let   html = ``

  for (const ortho in data) {
    const txn = data[ortho]
    html += `<p class=txn data-ortho='${ ortho }' ${ lang }>${ addEmphasis(txn) }</p>`
  }

  return html

}
