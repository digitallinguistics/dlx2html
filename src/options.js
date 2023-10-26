export default function validateOptions(opts) {

  if (`classes` in opts) {
    if (!Array.isArray(opts.classes)) throw new TypeError(`The 'classes' option must be an array.`)
    if (!opts.classes.every(cls => typeof cls === `string`)) throw new TypeError(`Each of the values of the 'classes' array must be a string.`)
  }

  if (`scription` in opts && typeof opts.scription !== `object`) throw new TypeError(`The 'scription' option must be an object.`)

  if (`tag` in opts && typeof opts.tag !== `string`) throw new TypeError(`The 'tag' option must be a string.`)

}
