import convert from '@digitallinguistics/scription2dlx'

const defaultOptions = {
  classes:   [`igl`],
  scription: {},
  tag:       `div`,
}

function convertUtterance(u, { classes, tag }) {
  const classString = classes.join(` `)
  return `<${ tag } class='${ classString }'>${ JSON.stringify(u, null, 2) }</${ tag }>`
}

function validateOptions(opts) {

  if (`classes` in opts) {
    if (!Array.isArray(opts.classes)) throw new TypeError(`The 'classes' option must be an array.`)
    if (!opts.classes.every(cls => typeof cls === `string`)) throw new TypeError(`Each of the values of the 'classes' array must be a string.`)
  }

  if (`scription` in opts && typeof opts.scription !== `object`) throw new TypeError(`The 'scription' option must be an object.`)

  if (`tag` in opts && typeof opts.tag !== `string`) throw new TypeError(`The 'tag' option must be a string.`)

}

export default function scription2html(input, userOptions = {}) {

  validateOptions(userOptions)

  if (!input) return null

  const trimmed = input.trim()

  if (!trimmed) return { data: {}, html: `` }

  const computedOptions = Object.assign(defaultOptions, userOptions)
  const data            = convert(input, computedOptions.scription)
  const html            = data.utterances.map(u => convertUtterance(u, computedOptions)).join(``)

  return { data, html }

}
