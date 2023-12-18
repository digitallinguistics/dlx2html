import addEmphasis from '../utilities/addEmphasis.js'

export default function createPhonetic(phonetic) {
  if (!phonetic) return ``
  return `<p class=phon>${ addEmphasis(phonetic) }</p>`
}
