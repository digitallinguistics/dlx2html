import convert from '@digitallinguistics/scription2dlx'

function convertUtterance(u, { classes, tag }) {
  const classString = classes.join(` `)
  return `<${ tag } class='${ classString }'>${ JSON.stringify(u, null, 2) }</${ tag }>`
}

const defaultOptions = {
  classes:   [`igl`],
  scription: {},
  tag:       `div`,
}

export default function scription2html(input, userOptions = {}) {

  if (!input) return null

  const trimmed = input.trim()

  if (!trimmed) return { data: {}, html: `` }

  const computedOptions = Object.assign(defaultOptions, userOptions)
  const data            = convert(input, computedOptions.scription)
  const html            = data.utterances.map(u => convertUtterance(u, computedOptions)).join(``)

  return { data, html }

}
