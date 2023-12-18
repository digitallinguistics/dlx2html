const emRegExp = /\*(?<text>.*?)\*/gsu

export default function addEmphasis(text) {
  return text.replaceAll(emRegExp, `<b>$<text></b>`)
}
