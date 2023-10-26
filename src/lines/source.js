export default function createSource(speaker, source) {

  speaker ||= ``
  source    = source ? `(${ source })` : ``

  const text = `${ speaker } ${ source }`.trim()

  return text ? `<p class=ex-source>${ text }</p>` : ``

}
