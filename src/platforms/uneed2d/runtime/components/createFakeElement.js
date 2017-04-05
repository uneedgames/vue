export default function(name, createElement, children) {
  let elt = createElement('fake-element', children)
  elt.fakeName = name || 'unknow'
  return elt
}