/* @flow */
import { makeMap } from 'shared/util'

export const isReservedTag = function(tag: string) {
  return /^un\-/.test(tag)
}

// Elements that you can, intentionally, leave open (and which close themselves)
// more flexable than web
export const canBeLeftOpenTag = makeMap(
  '',
  true
)

export const mustUseProp = (tag: string, type: ?string, attr: string): boolean => {
  return false
}
export function getTagNamespace (): ?string {}
export function isUnknownElement (tag: string): boolean {
  return !isReservedTag(tag)
}

/**
 * Query an element selector if it's not an element already.
 */
export function query (el: any) {
  if (typeof el === 'string') {
    return document.querySelector(el)
  } else {
    return el
  }
}
