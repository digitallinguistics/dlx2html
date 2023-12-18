import addEmphasis from '../utilities/addEmphasis.js'

export default function createTranscript(data) {

  let html = ``

  for (const ortho in data) {
    const transcript = data[ortho]
    html += `<p class=trs data-ortho='${ ortho }'>${ addEmphasis(transcript) }</p>`
  }

  return html

}
