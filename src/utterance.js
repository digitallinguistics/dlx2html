import createHeader from './lines/metadata.js'

export default function convertUtterance(u, { classes, tag }) {

  const classString = classes.join(` `)
  const header      = createHeader(u.metadata)

  return `<${ tag } class='${ classString }'>
    ${ header }
  </${ tag }>`

}
