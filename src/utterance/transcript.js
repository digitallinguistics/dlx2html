import addEmphasis from '../utilities/addEmphasis.js'

export default function createTranscript(data, { language, targetLang }) {

  if (!data) return ``

  let html = ``

  for (const ortho in data) {
    const transcript = data[ortho]
    const lang = (language ?? targetLang) ? `lang='${ language ?? targetLang }'` : ``
    html += `<p class=trs data-ortho='${ ortho }' ${ lang }>${ addEmphasis(transcript) }</p>`
  }

  return html

}
