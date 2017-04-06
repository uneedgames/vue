import objectMixin from './object-mixin'
import UN from 'uneed2d/engine'

const textProps = {
  anchor: Number,
  anchorX: Number,
  anchorY: Number,
  text: String,
  textStyle: Object
}

const propKeys = Object.keys(textProps)

export default {
  mixins: [objectMixin('text')],
  props: textProps,
  created () {
    this.updatePropsByKeys(propKeys, (key, val) => this.updateTextProp(key, val))
    this.watchKeys(propKeys, (key, val, oldVal) => this.updateTextProp(key, val))
  },
  methods: {
    updateTextProp(key, val) {
      if(key === 'textStyle') {
        this.$object.style = val
      } else {
        this.setPropIfNotVoid0(key, val)
      }
    }
  }
}
