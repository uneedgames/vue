import Vue from 'uneed2d/runtime/index'
import * as CONST from './const'

const layoutMixin = {
  data() {
    return {
      contentSize: {
        width: stage.width,
        height: stage.height
      }
    }
  },
  created() {
    this.$object = stage
    stage.on('resize', this.onStageResize, this)
  },
  destroyed() {
    stage.off('resize', this.onStageResize, this)
  },

  methods: {
    onStageResize() {
      this.contentSize.width = stage.width
      this.contentSize.height = stage.height
    },
  }
}

Vue.initWith = function (container, options) {
  let stage = container.stage
  let view = stage.view || stage.renderer.view
  let parent = view.parentNode
  let vueStage = document.createElement('div')
  vueStage.id = CONST.ROOT
  vueStage.style.display = 'none'
  parent.appendChild(vueStage)
  stage.vue = new Vue(Object.assign(options, {
    el: vueStage,
    replace: false,
    mixins: [layoutMixin].concat(options.mixins || [])
  }))
}

if(typeof window !== 'undefined' && window.UN) {
  UN.vue = Vue.initWith
}

export default Vue