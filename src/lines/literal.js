export default function createLiteral(data) {

  if (typeof data === `string`) {
    return `<p class=lit lang=en>${ data }</p>`
  }

  let html = ``

  for (const lang in data) {
    const lit = data[lang]
    html += `<p class=lit lang='${ lang }'>${ lit }</p>`
  }

  return html

}
