import addEmphasis from '../utilities/addEmphasis.js'

export default function createTranscription(data, { language, targetLang }) {

  if (!data) return ``

  const lang = (language ?? targetLang) ? `lang='${ language ?? targetLang }'` : ``
  let   html = ``

  for (const ortho in data) {
    const txn = data[ortho]
    html += `<p class=txn data-ortho='${ ortho }' ${ lang }>${ addEmphasis(txn) }</p>`
  }

  return html

}
