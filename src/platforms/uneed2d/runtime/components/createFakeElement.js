export default function(name, createElement, children) {
  let elt = createElement('un-' + name, children && children.filter(c => c.tag) || null)
  elt.fakeName = name || 'unknow'
  return elt
}