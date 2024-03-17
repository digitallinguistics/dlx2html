export default function createSource(speaker, source) {

  if (!(speaker ?? source)) return ``

  speaker ||= ``
  source  ||= ``

  const text = [speaker, source]
  .filter(Boolean)
  .join(`; `)

  return text ? `<p class=ex-source>${ text }</p>` : ``

}
