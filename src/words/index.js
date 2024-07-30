import createGlosses       from './glosses.js'
import createLiteral       from './literal.js'
import createMorphemes     from './morphemes.js'
import createTranscription from './transcription.js'

export default function createWords(words, options) {

  if (!(words && words.length)) return ``

  let html = ``

  for (const word of words) {

    const glosses       = createGlosses(word.gloss, options)
    const literal       = createLiteral(word.literal, options)
    const morphemes     = createMorphemes(word.analysis, options)
    const transcription = createTranscription(word.transcription, options)

    const lines = [transcription, morphemes, glosses, literal]
    .filter(Boolean)
    .join(``)

    html += `<li class=word>${ lines }</li>`

  }

  return `<ol class=words>${ html }</ol>`

}
