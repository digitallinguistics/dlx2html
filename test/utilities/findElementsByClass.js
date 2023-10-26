import parseClassString from './parseClassString.js'

import { findElements, getAttribute, hasAttribute } from '@web/parse5-utils'

export default function findElementsByClass(dom, cls) {
  return findElements(dom, el => hasAttribute(el, `class`) && parseClassString(getAttribute(el, `class`)).includes(cls))
}
