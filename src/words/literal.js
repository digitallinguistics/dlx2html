import createGlossLine from '../utilities/createGlossLine.js'

const cssClass = `wlt`

export default function createLiteral(data, options) {

  if (!data) return ``

  if (typeof data === `string`) {
    return createGlossLine(data, cssClass, options.analysisLang, options)
  }

  let html = ``

  for (const lang in data) {
    html += createGlossLine(data[lang], cssClass, lang, options)
  }

  return html

}
