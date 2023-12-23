import addEmphasis from '../utilities/addEmphasis.js'

export default function createTranscript(data, { targetLang }) {

  if (!data) return ``

  let html = ``

  for (const ortho in data) {
    const transcript = data[ortho]
    const lang = targetLang ? `lang='${ targetLang }'` : ``
    html += `<p class=trs data-ortho='${ ortho }' ${ lang }>${ addEmphasis(transcript) }</p>`
  }

  return html

}
