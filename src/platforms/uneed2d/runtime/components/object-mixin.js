import createFakeElement from './createFakeElement'
import UN from 'uneed2d/engine'

/**
 * 需要直接set到$object的props
 */
const objectProps = {
  x: {
    type: Number
  },
  y: {
    type: Number
  },
  scale: {
    type: Number
  },
  scaleX: {
    type: Number
  },
  scaleY: {
    type: Number
  },
  rotation: {
    type: Number
  },
  pivot: {
    type: Number
  },
  pivotX: {
    type: Number
  },
  pivotY: {
    type: Number
  },
  skew: {
    type: Number
  },
  skewX: {
    type: Number
  },
  skewY: {
    type: Number
  },
  alpha: {
    type: Number,
    default: 1
  },
  interactive: {
    type: Boolean
  },
  hitArea: [Object, String, Number],
  tint: {
    type: Number,
    default: 0xFFFFFF
  },
  active: {
    type: Boolean,
    default: true
  },
  visible: {
    type: Boolean,
    default: true
  }
}

const propKeys = Object.keys(objectProps)

export default function (name) {
  const mixin = {

    props: objectProps,

    created () {
      switch (name) {
        case 'entity':
          this.$object = new UN.Entity()
          break
        case 'sprite':
          this.$object = new UN.Sprite()
          break
        case 'text':
          this.$object = new UN.Text()
          break
        case 'animatedSprite':
          const textures = this.textures.map(id => UN.utils.TextureCache[id])
          this.$object = new UN.extras.AnimatedSprite(textures)
          break
        case 'i18n-text':
          this.$object = new UN.i18n.Text(this.i18nKey)
          break
        case 'i18n-sprite':
          this.$object = new UN.i18n.Sprite(this.i18nKey)
          break
      }
      this.updatePropsByKeys(propKeys)
      this.watchKeys(propKeys)
      this.listenEvents()
    },

    mounted () {
      this.$getParentObject().addChild(this.$object)
    },

    render (createElement) {
      return createFakeElement(name, createElement, this.$slots.default)
    },

    methods: {

      updatePropsByKeys (keys, func) {
        func = func || ((key, val) => this.setPropIfNotVoid0(key, val))
        if (typeof keys === 'string') {
          func(keys, this[keys])
        } else {
          keys.forEach(key => func(key, this[key]))
        }
      },

      watchKeys (keys, onChange) {
        onChange = onChange || ((key, val, old) => this.setPropIfNotVoid0(key, val))
        if (typeof keys === 'string') {
          keys = [keys]
        }
        keys.forEach(key => {
          this.$watch(key, (val, old) => onChange(key, val, old))
        })
      },

      setPropIfNotVoid0 (key, val) {
        if (val != void 0) {
          this.setProp(key, val)
        }
      },

      setProp (key, val) {
        switch (key) {
          case 'anchor':
          case 'scale':
          case 'skew':
          case 'pivot':
            this.$object[key].set(val)
            break
          case 'text':
            this.$object.setText(val)
            break
          case 'texture':
            this.$object.texture = UN.Texture.fromImage(val)
            break
          case 'hitArea':
            if (typeof val === 'string') {
              const values = val.split(',').map(val => parseInt(val))
              this.$object.hitArea = new UN.Rectangle(...values)
            } else if (val === Infinity) {
              this.$object.hitArea = UN.infinityRectangle()
            } else {
              this.$object.hitArea = new UN.Rectangle(val.x, val.y, val.width, val.height)
            }
            break
          default:
            this.$object[key] = val
        }
      },

      listenEvents () {
        this.$object.on('pointerdown', (e) => {
          this.$emit('pointerdown', e)
        })
        this.$object.on('pointermove', (e) => {
          this.$emit('pointermove', e)
        })
        this.$object.on('pointerup', (e) => {
          this.$emit('pointerup', e)
        })
        this.$object.on('pointerout', (e) => {
          this.$emit('pointerout', e)
        })
        this.$object.on('pointerover', (e) => {
          this.$emit('pointerover', e)
        })
      }

    }

  }

  return mixin
}
