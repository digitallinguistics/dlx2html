/**
 * Replaces regular hyphens (U+2010) with non-breaking hyphens (U+2011).
 * @param {String} data
 * @returns String
 */
export default function replaceHyphens(data) {
  return data.replaceAll(`-`, `\u{2011}`)
}
