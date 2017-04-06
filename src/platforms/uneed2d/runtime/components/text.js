import objectMixin from './object-mixin'
import UN from 'uneed2d/engine'

const textProps = {
  anchor: Number,
  anchorX: Number,
  anchorY: Number,
  text: String,
  style: Object
}

const propKeys = Object.keys(textProps)

export default {
  mixins: [objectMixin('text')],
  props: textProps,
  created () {
    this.updatePropsByKeys(propKeys)
    this.watchKeys(propKeys)
  }
}
