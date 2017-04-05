import Vue from 'uneed2d/runtime/index'
import * as CONST from './const'

const layoutMixin = {
  data() {
    return {
      contentSize: {
        width: UN.stage.width,
        height: UN.stage.height
      }
    }
  },
  created() {
    UN.stage.on('resize', this.onStageResize, this)
  },
  destroyed() {
    UN.stage.off('resize', this.onStageResize, this)
  },

  methods: {
    onStageResize() {
      this.contentSize.width = UN.stage.width
      this.contentSize.height = UN.stage.height
    },
  }
}

function containerMixin(container) {
  return {
    created() {
      this.$object = container
    },
    destroyed() {
      this.$object.destroy()
    }
  }
}

Vue.initWith = function (container, Component) {
  let stage = container.stage
  let view = stage.view || stage.renderer.view
  let parent = view.parentNode
  let vueStage = document.createElement('div')
  vueStage.id = CONST.ROOT
  vueStage.style.display = 'none'
  parent.appendChild(vueStage)
  stage.vue = new Vue({
    mixins: [layoutMixin, containerMixin(container)],
    render(createElement) {
      console.log('render')
      return createElement(Component)
    }
  })
  stage.vue.$mount(vueStage)
}

if(typeof window !== 'undefined' && window.UN) {
  UN.vue = Vue.initWith
}

export default Vue