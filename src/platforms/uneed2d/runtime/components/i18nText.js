import objectMixin from './object-mixin'
import UN from 'uneed2d/engine'

const props = {
  anchor: Number,
  anchorX: Number,
  anchorY: Number,
  i18nKey: String,
  textStyle: Object
}

const propKeys = Object.keys(props)

export default {
  mixins: [objectMixin('i18n-text')],
  props: props,
  created () {
    this.updatePropsByKeys(propKeys, (key, val) => this.updateTextProp(key, val))
    this.watchKeys(propKeys, (key, val, oldVal) => this.updateTextProp(key, val))
  },
  methods: {
    updateTextProp (key, val) {
      if (key === 'textStyle') {
        this.$object.style = val
      } else {
        this.setPropIfNotVoid0(key, val)
      }
    }
  }
}
