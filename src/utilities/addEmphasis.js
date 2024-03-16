const strongRegExp = /\*{3}(?<text>.*?)\*{3}/gsu
const emRegExp     = /\*{2}(?<text>.*?)\*{2}/gsu
const bRegExp      = /\*(?<text>.*?)\*/gsu
const uRegExp      = /_(?<text>.*?)_/gsu

export default function addEmphasis(text) {
  return text
  .replaceAll(strongRegExp, `<strong>$<text></strong>`)
  .replaceAll(emRegExp, `<em>$<text></em>`)
  .replaceAll(bRegExp, `<b>$<text></b>`)
  .replaceAll(uRegExp, `<u>$<text></u>`)
}
