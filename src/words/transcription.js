import addEmphasis from '../utilities/addEmphasis.js'

export default function createTranscription(data, { language, targetLang }) {

  const lang = (language ?? targetLang) ? `lang='${ language ?? targetLang }'` : ``
  let html = ``

  for (const ortho in data) {
    const txn = data[ortho]
    if (!txn) continue
    html += `<span class=w data-ortho='${ ortho }' ${ lang }>${ addEmphasis(txn) }</span>`
  }

  return html

}
