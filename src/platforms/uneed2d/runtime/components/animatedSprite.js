import objectMixin from './object-mixin'
import UN from 'uneed2d/engine'

const animatedSpriteProps = {
  textures: Array,
  anchor: Number,
  anchorX: Number,
  anchorY: Number,
  animationSpeed: {
    type: Number,
    default: 1,
    required: false
  },
  autoplay: {
    type: Boolean,
    default: true,
    required: false
  }
}

const propKeys = Object.keys(animatedSpriteProps).filter(key => key !== 'textures')

export default {
  mixins: [objectMixin('animatedSprite')],
  props: animatedSpriteProps,
  created () {
    this.updatePropsByKeys(propKeys)
    this.watchKeys(propKeys)
    if (this.autoplay) {
      this.$object.play()
    }
  }
}
