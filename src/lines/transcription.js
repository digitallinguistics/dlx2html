import addEmphasis from '../utilities/addEmphasis.js'

export default function createTranscription(data, { targetLang }) {

  if (!data) return ``

  let html = ``

  for (const ortho in data) {
    const txn  = data[ortho]
    const lang = targetLang ? `lang='${ targetLang }'` : ``
    html += `<p class=txn data-ortho='${ ortho }' ${ lang }>${ addEmphasis(txn) }</p>`
  }

  return html

}
