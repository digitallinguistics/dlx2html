export default function createSource(speaker, source) {

  if (!(speaker ?? source)) return ``

  speaker ||= ``
  source    = source ? `(${ source })` : ``

  const text = `${ speaker } ${ source }`.trim()

  return text ? `<p class=ex-source>${ text }</p>` : ``

}