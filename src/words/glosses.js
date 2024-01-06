import addEmphasis    from '../utilities/addEmphasis.js'
import replaceHyphens from '../utilities/replaceHyphens.js'

export default function createGlosses(data, { analysisLang }) {

  if (!data) return ``

  if (typeof data === `string`) {

    const lang    = analysisLang ? `lang='${ analysisLang }'` : ``
    const glosses = addEmphasis(replaceHyphens(data))

    return `<span class=w-gl ${ lang }>${ glosses }</span>`

  }

  let html = ``

  for (const lang in data) {
    const glosses = addEmphasis(replaceHyphens(data[lang]))
    html += `<span class=w-gl lang='${ lang }'>${ glosses }</span>`
  }

  return html

}
