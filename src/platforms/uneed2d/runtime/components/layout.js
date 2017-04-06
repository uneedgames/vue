import UN from 'uneed2d/engine'
import createFakeElement from './createFakeElement'

const REGEX_PERCENT = /\d%$/
const REGEX_POSITION = /^((left|center|right) (top|middle|bottom))$/i

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
      let pos = this.position.split(' ')
      let align = pos[0]
      let valign = pos[1]
      if(align === 'left') {
        this.$object.x = 0
      } else if(align === 'center') {
        this.$object.x = UN.stage.width/2
      } else {
        this.$object.x = UN.stage.width
      }
      if(valign === 'top') {
        this.$object.y = 0
      } else if(valign === 'middle') {
        this.$object.y = UN.stage.height/2
      } else {
        this.$object.y = UN.stage.height
      }
    }

  }

}