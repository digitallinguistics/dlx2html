import addEmphasis from '../utilities/addEmphasis.js'

export default function createPhonetic(phonetic, { targetLang }) {
  if (!phonetic) return ``
  const lang = targetLang ? `lang='${ targetLang }-fonipa'` : ``
  // NB: Don't add phonetic brackets. These can be added with CSS.
  return `<p class=phon ${ lang }>${ addEmphasis(phonetic) }</p>`
}
