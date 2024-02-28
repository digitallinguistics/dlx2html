import convertUtterance from './utterance/index.js'
import validateOptions  from './options.js'

const defaultOptions = {
  abbreviations: {},
  classes:       [`igl`],
  glosses:       false,
  tag:           `div`,
}

export default function dlx2html(data, userOptions = {}) {

  validateOptions(userOptions)

  const computedOptions = Object.assign({}, defaultOptions, userOptions)
  const html            = data.utterances.map(u => convertUtterance(u, computedOptions)).join(``)

  return { data, html }

}
