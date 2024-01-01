import createHeader        from './metadata.js'
import createLiteral       from './literal.js'
import createPhonetic      from './phonetic.js'
import createSource        from './source.js'
import createTimespan      from './timespan.js'
import createTranscript    from './transcript.js'
import createTranscription from './transcription.js'
import createTranslation   from './translation.js'
import createWords         from '../words/index.js'

export default function convertUtterance(u, options) {

  const header        = createHeader(u.metadata, options)
  const literal       = createLiteral(u.literal, options)
  const phonetic      = createPhonetic(u.phonetic, options)
  const source        = createSource(u.speaker, u.source)
  const timespan      = createTimespan(u.startTime, u.endTime)
  const transcript    = createTranscript(u.transcript, options)
  const transcription = createTranscription(u.transcription, options)
  const translation   = createTranslation(u.translation, options)
  const words         = createWords(u.words, options)

  const { classes, tag } = options
  const classString      = classes.join(` `)

  return `<${ tag } class='${ classString }'>
    ${ header }
    ${ transcript }
    ${ transcription }
    ${ phonetic }
    ${ words }
    ${ translation }
    ${ literal }
    ${ source }
    ${ timespan }
  </${ tag }>`

}
