import addEmphasis from '../utilities/addEmphasis.js'

export default function createPhonetic(phonetic, { language, targetLang }) {

  if (!phonetic) return ``

  let lang = ``

  if (language || targetLang) lang = `lang='${language || targetLang }-fonipa'`

  // NB: Don't add phonetic brackets. These can be added with CSS.
  return `<p class=phon ${ lang }>${ addEmphasis(phonetic) }</p>`

}
