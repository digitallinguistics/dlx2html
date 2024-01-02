import createLiteral       from './literal.js'
import createTranscription from './transcription.js'

export default function createWords(words, options) {

  if (!(words && words.length)) return ``

  let html = ``

  for (const word of words) {

    const literal       = createLiteral(word.literal, options)
    const transcription = createTranscription(word.transcription, options)

    html += `\n<li class=word>
      ${ transcription }
      ${ literal }
    </li>`

  }

  return `<ol class=words>${ html }\n</ol>`

}
