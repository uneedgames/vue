import * as CONST from '../const'
import U2DElement from './element'

const rootNode = new U2DElement('root')

function isRootNode (node) {
  return node.id && node.id === CONST.ROOT
}

function isHTMLElement (node) {
  return !(node instanceof U2DElement)
}

export function createElement (tagName, vnode) {
  if (process.env.NODE_ENV !== 'production' || UN.vue.DEBUG) {
    return document.createElement(tagName)
  }
  return new U2DElement(tagName)
}

export function createElementNS (namespace, tagName) {
  if (process.env.NODE_ENV !== 'production' || UN.vue.DEBUG) {
    return document.createElementNS(tagName)
  }
  return new U2DElement(namespace + ':' + tagName)
}

export function createTextNode (text) {
  if (process.env.NODE_ENV !== 'production' || UN.vue.DEBUG) {
    return document.createTextNode(text)
  }
  return new U2DElement('TextNode:' + text)
}

export function createComment (text) {
  if (process.env.NODE_ENV !== 'production' || UN.vue.DEBUG) {
    return document.createComment(text)
  }
  return new U2DElement('CommentNode:' + text)
}

export function insertBefore (parentNode, newNode, referenceNode) {
  if (isHTMLElement(parentNode) && !isHTMLElement(newNode)) {
    rootNode.insertBefore(newNode, referenceNode)
  } else {
    parentNode.insertBefore(newNode, referenceNode)
  }
}

export function removeChild (node, child) {
  if (isHTMLElement(node) && !isHTMLElement(child)) {
    rootNode.removeChild(child)
  } else {
    node.removeChild(child)
  }
}

export function appendChild (node, child) {
  if (isHTMLElement(node) && !isHTMLElement(child)) {
    rootNode.appendChild(child)
  } else {
    node.appendChild(child)
  }
}

export function parentNode (node) {
  return node.parentNode
}

export function nextSibling (node) {
  return node.nextSibling
}

export function tagName (node) {
  return node.tagName
}

export function setTextContent (node, text) {
  node.textContent = text
}

export function setAttribute (node, key, val) {
  node.setAttribute(key, val)
}
