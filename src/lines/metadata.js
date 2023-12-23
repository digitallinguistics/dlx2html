export default function createHeader(metadata, { analysisLang }) {
  if (!metadata) return ``
  const lang = analysisLang ? `lang='${ analysisLang }'` : ``
  return `<p class=ex-header ${ lang }>${ metadata }</p>`
}
