import objectMixin from './object-mixin'
import UN from 'uneed2d/engine'

const props = {
  i18nKey: String,
  anchor: Number,
  anchorX: Number,
  anchorY: Number
}

const propKeys = Object.keys(props)

export default {
  mixins: [objectMixin('i18n-sprite')],
  props: propKeys,
  created () {
    this.updatePropsByKeys(propKeys)
    this.watchKeys(propKeys)
  }
}
