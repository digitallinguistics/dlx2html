export default function createWords(words) {

  if (!(words && words.length)) return ``

  let html = ``

  for (const word of words) {
    html += `\n<li class=word></li>`
  }

  return `<ol class=words>${ html }\n</ol>`

}
