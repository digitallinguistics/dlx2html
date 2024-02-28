import convert           from '../src/index.js'
import esbuild           from 'esbuild'
import { fileURLToPath } from 'node:url'
import path              from 'path'

import { readdir, readFile, writeFile } from 'node:fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const stylesDir  = path.resolve(__dirname, `../node_modules/@digitallinguistics/styles/components`)
const contentTag = `<!-- CONTENT -->`
const styleTag   = `<!-- STYLES -->`

// Bundle JavaScript for browsers

await esbuild.build({
  bundle:      true,
  entryPoints: [path.resolve(__dirname, `../src/index.js`)],
  minify:      true,
  outfile:     `dlx2html.js`,
})

// Build samples

const template = await readFile(path.resolve(__dirname, `./template.html`), `utf8`)
const files    = await readdir(path.resolve(__dirname, `../samples/data`))

const interlinearStyles = await readFile(path.resolve(stylesDir, `interlinear/interlinear.css`), `utf8`)
const exampleStyles     = await readFile(path.resolve(stylesDir, `example/example.css`), `utf8`)
const examplesStyles    = await readFile(path.resolve(stylesDir, `examples/examples.css`), `utf8`)
const styles            = `${ interlinearStyles }\n${ exampleStyles }\n${ examplesStyles }`

for (const file of files) {

  if (!file.endsWith(`.txt`)) continue

  const scription    = await readFile(path.resolve(__dirname, `../samples/data`, file), `utf8`)
  const filename     = path.basename(file, `.txt`)
  let   content      = `<h1>${ filename }</h1>`
  const { html }     = convert(scription, { classes: [`ex`, `igl`], tag: `li` })
  const interlinears = `<ul class=examples>${ html }</ul>`

  content += `\n${ interlinears }`

  const sample = template
  .replace(styleTag, styles)
  .replace(contentTag, content)

  await writeFile(path.resolve(__dirname, `../samples/html`, `${ filename }.html`), sample)

}
