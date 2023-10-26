import createHeader from './lines/metadata.js'
import createSource from './lines/source.js'

export default function convertUtterance(u, { classes, tag }) {

  const classString = classes.join(` `)
  const header      = createHeader(u.metadata)
  const source      = createSource(u.speaker, u.source)

  return `<${ tag } class='${ classString }'>
    ${ header }
    ${ source }
  </${ tag }>`

}
