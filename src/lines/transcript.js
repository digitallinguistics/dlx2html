export default function createTranscript(data) {

  let html = ``

  for (const ortho in data) {
    const transcript = data[ortho]
    html += `<p class=trs data-ortho='${ ortho }'>${ transcript }</p>`
  }

  return html

}
