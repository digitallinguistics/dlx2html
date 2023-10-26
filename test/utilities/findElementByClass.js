import parseClassString from './parseClassString.js'

import { findElement, getAttribute, hasAttribute } from '@web/parse5-utils'

export default function findElementByClass(dom, cls) {
  return findElement(dom, el => hasAttribute(el, `class`) && parseClassString(getAttribute(el, `class`)).includes(cls))
}
