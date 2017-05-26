import UN from './engine'
import Vue from 'uneed2d/runtime/index'
import * as CONST from './const'

const layoutMixin = {
  data () {
    return {
      contentSize: {
        width: 0,
        height: 0
      }
    }
  },
  created () {
    this.contentSize.width = UN.stage.width
    this.contentSize.height = UN.stage.height
    UN.stage.on('resize', this.onStageResize, this)
  },
  destroyed () {
    UN.stage.off('resize', this.onStageResize, this)
  },

  methods: {
    onStageResize () {
      this.contentSize.width = UN.stage.width
      this.contentSize.height = UN.stage.height
    }
  }
}

function containerMixin (container) {
  return {
    created () {
      this.$object = container
    }
  }
}

Vue.initWith = function (container, Component) {
  const stage = container.stage
  const view = stage.view || stage.renderer.view
  const parent = view.parentNode
  const vueStage = document.createElement('div')
  vueStage.id = CONST.ROOT
  vueStage.style.display = 'none'
  parent.appendChild(vueStage)
  container.vue = new Vue({
    mixins: [layoutMixin, containerMixin(container)],
    render (createElement) {
      return createElement(Component)
    },
    mounted () {
      const refs = this.$children[0].$refs
      Object.keys(refs).forEach(key => {
        if (container[key] == void 0) {
          if (refs[key].$object) {
            container[key] = refs[key].$object
          } else {
            container[key] = refs[key]
          }
        }
      })
    }
  })
  container.vue.$mount(vueStage)
}

if (typeof window !== 'undefined' && window.UN) {
  UN.vue = Vue.initWith
}

export default Vue
