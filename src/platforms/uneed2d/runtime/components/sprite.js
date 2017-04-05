import objectMixin from './object-mixin'
import UN from 'uneed2d/engine'

const spriteProps = {
  texture: UN.Texture,
  anchor: Number,
  anchorX: Number,
  anchorY: Number
}

const propKeys = Object.keys(spriteProps)

export default {
  mixins: [objectMixin('sprite')],
  props: spriteProps,
  created () {
    this.updatePropsByKeys(propKeys)
    this.watchKeys(propKeys)
  }
}
