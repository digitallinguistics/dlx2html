import createHeader     from './lines/metadata.js'
import createSource     from './lines/source.js'
import createTranscript from './lines/transcript.js'

export default function convertUtterance(u, { classes, tag }) {

  const classString = classes.join(` `)
  const header      = createHeader(u.metadata)
  const transcript  = createTranscript(u.transcript)
  const source      = createSource(u.speaker, u.source)

  return `<${ tag } class='${ classString }'>
    ${ header }
    ${ transcript }
    ${ source }
  </${ tag }>`

}
