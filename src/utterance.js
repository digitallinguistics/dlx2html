import createHeader        from './lines/metadata.js'
import createLiteral       from './lines/literal.js'
import createPhonetic      from './lines/phonetic.js'
import createSource        from './lines/source.js'
import createTranscript    from './lines/transcript.js'
import createTranscription from './lines/transcription.js'
import createTranslation   from './lines/translation.js'

export default function convertUtterance(u, { classes, tag }) {

  const classString   = classes.join(` `)
  const header        = createHeader(u.metadata)
  const literal       = createLiteral(u.literal)
  const phonetic      = createPhonetic(u.phonetic)
  const source        = createSource(u.speaker, u.source)
  const transcript    = createTranscript(u.transcript)
  const transcription = createTranscription(u.transcription)
  const translation   = createTranslation(u.translation)

  return `<${ tag } class='${ classString }'>
    ${ header }
    ${ transcript }
    ${ transcription }
    ${ phonetic }
    ${ translation }
    ${ literal }
    ${ source }
  </${ tag }>`

}
