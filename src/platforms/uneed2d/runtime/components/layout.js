import UN from 'uneed2d/engine'
import createFakeElement from './createFakeElement'

const REGEX_PERCENT = /\d%$/
const REGEX_POSITION = /((top left)|(top right)|(bottom left)|(bottom right))/i

function numberAndPecentProp() {
  return {
    type: [Number, String],
    default: 0,
    validator: (val) => {
      if(typeof val === 'string') {
        return REGEX_PERCENT.test(val)
      } else {
        return true
      }
    }
  }
}

export default {

  props: {
    position: {
      type: String,
      default: 'top left',
      validator: (val) => {
        return REGEX_POSITION.test(val)
      }
    }
  },

  beforeCreate() {
    this.isLayout = true
    this.$object = new UN.Entity()
  },

  created() {
    this.doLayout()
    UN.stage.on('resize', this.onStageResize, this)
  },

  mounted() {
    this.$getParentObject().addChild(this.$object)
  },

  beforeDestroy() {
    this.$getParentObject().removeChild(this.$object)
  },
  
  destroyed() {
    UN.stage.off('resize', this.onStageResize, this)
    this.$object.destroy()
  },

  render(createElement) {
    return createFakeElement(name, createElement, this.$slots.default)
  },

  methods: {

    onStageResize() {
      this.doLayout()
    },

    doLayout() {
      switch(this.position) {
        case 'top left':
          this.$object.position.set(0)
        break
        case 'top right':
          this.$object.position.set(UN.stage.width, 0)
        break
        case 'bottom left':
          this.$object.position.set(0, UN.stage.height)
        break
        case 'bottom right':
          this.$object.position.set(UN.stage.width, UN.stage.height)
        break
      }
    }

  }

}