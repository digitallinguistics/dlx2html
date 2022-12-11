/* eslint-env mocha */

import { expect }        from 'chai'
import { fileURLToPath } from 'url'
import { readFile }      from 'fs/promises'

import {
  dirname as getDirname,
  join as joinPath,
} from 'path'

describe(`license`, function() {

  it(`has the correct year`, async function() {

    const __dirname       = getDirname(fileURLToPath(import.meta.url))
    const licensePath     = joinPath(__dirname, `LICENSE`)
    const license         = await readFile(licensePath, `utf8`)
    const yearRegExp      = /(?<licenseYear>\d{4})/u
    const { licenseYear } = yearRegExp.exec(license).groups
    const currentYear     = String(new Date().getFullYear())

    expect(licenseYear).to.eql(currentYear)

  })

})
