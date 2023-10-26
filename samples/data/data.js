import { fileURLToPath } from 'node:url'
import path              from 'node:path'
import { readFile }      from 'node:fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const Algonquian   = await readFile(path.resolve(__dirname, `./Algonquian.txt`), `utf8`)
const Chitimacha   = await readFile(path.resolve(__dirname, `./Chitimacha.txt`), `utf8`)
const Nuuchahnulth = await readFile(path.resolve(__dirname, `./Nuuchahnulth.txt`), `utf8`)
const OldLatin     = await readFile(path.resolve(__dirname, `./OldLatin.txt`), `utf8`)
const Swahili      = await readFile(path.resolve(__dirname, `./Swahili.txt`), `utf8`)

export {
  Algonquian,
  Chitimacha,
  Nuuchahnulth,
  OldLatin,
  Swahili,
}
