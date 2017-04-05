export default class Element {

  constructor (tagName) {
    this.tagName = tagName
    this.fakeName = null
    this.attrs = null
    this.textContent = null
    this.parentNode = null
    this.children = null
    this.object = null
  }

  setAttribute (key, value) {
    if (!this.attrs) {
      this.attrs = {}
    }
    this.attrs[key] = value
  }

  insertBefore (newNode, referenceNode) {
    const idx = this.children.indexOf(referenceNode)
    if (idx === -1) {
      throw new Error('can not find child node: ' + referenceNode)
    }
    this.children.splice(idx, 0, newNode)
    newNode.parentNode = this
  }

  appendChild (childNode) {
    if (!this.children) {
      this.children = []
    }
    this.children.push(childNode)
    childNode.parentNode = this
  }

  removeChild (childNode) {
    const idx = this.children.indexOf(childNode)
    if (idx === -1) {
      throw new Error('can not find child node: ' + childNode)
    }
    this.children.splice(idx, 1)
    childNode.parentNode = null
  }

  nextSibling () {
    if (!this.children) return null
    const idx = this.parentNode.indexOf(this)
    return this.parentNode.children[idx]
  }

  indexOf (childNode) {
    return this.children.indexOf(childNode)
  }

}
