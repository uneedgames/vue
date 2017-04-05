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
  scaleX: {
    type: Number
  },
  scaleY: {
    type: Number
  },
  rotation: {
    type: Number
  },
  pivotX: {
    type: Number
  },
  pivotY: {
    type: Number
  },
  skewX: {
    type: Number
  },
  skewY: {
    type: Number
  },
  alpha: {
    type: Number
  },
  interactive: {
    type: Boolean
  }
}

const propKeys = Object.keys(objectProps)

export default function (name) {
  return {
    props: objectProps,

    beforeCreate () {
      switch (name) {
        case 'entity':
          this.$object = new UN.Entity()
          break
        case 'sprite':
          this.$object = new UN.Sprite()
          break
      }
    },

    created () {
      this.updatePropsByKeys(propKeys)
      this.watchKeys(propKeys)
      this.listenEvents()
    },

    mounted () {
      this.$parent.$object.addChild(this.$object)
    },

    beforeDestroy () {
      this.$parent.$object.removeChild(this.$object)
    },

    destroyed () {
      this.$object.destroy()
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
        this.$object[key] = val
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
      }

    }

  }
}
