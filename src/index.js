import convertUtterance from './utterance/index.js'
import scription2dlx    from '@digitallinguistics/scription2dlx'
import validateOptions  from './options.js'

const defaultOptions = {
  classes:   [`igl`],
  scription: {},
  tag:       `div`,
}

export default function scription2html(input, userOptions = {}) {

  validateOptions(userOptions)

  if (!input) return null

  const trimmed = input.trim()

  if (!trimmed) return { data: {}, html: `` }

  const computedOptions = Object.assign({}, defaultOptions, userOptions)
  const data            = scription2dlx(input, computedOptions.scription)
  const html            = data.utterances.map(u => convertUtterance(u, computedOptions)).join(``)

  return { data, html }

}
