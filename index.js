import convert from '@digitallinguistics/scription2dlx'

function convertUtterance(u, { tag }) {
  return `<${ tag } class=igl>${ JSON.stringify(u, null, 2) }</${ tag }>`
}

const defaultOptions = {
  tag: `div`,
}

export default function scription2html(input, userOptions = {}) {

  if (!input) return ``

  const trimmed = input.trim()

  if (!trimmed) return ``

  // Ignore the YAML header.
  const { utterances } = convert(input)

  const computedOptions = Object.assign(defaultOptions, userOptions)

  return utterances.map(u => convertUtterance(u, computedOptions)).join(``)

}
