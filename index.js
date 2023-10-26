export default function scription2html(input) {

  if (!input) return ``

  const trimmed = input.trim()

  if (!trimmed) return ``

  return `<div class=igl>${ input }</div>`

}
