import Vue from 'core/index'
import createFakeElement from './createFakeElement'


export default {
  name: 'tween',

  props: {
    show: {
      type: Function,
      required: false
    },
    hide: {
      type: Function,
      required: false
    },
    onEnter: {
      type: Function,
      required: false
    },
    onLeft: {
      type: Function,
      required: false
    }
  },

  render(h) {
    return createFakeElement('tween', h, this.$slots.default)
  },

  mounted() {
    this.performEnter()
  },

  beforeDestroy() {
    setDontDestroyBySelf(this)
  },

  destroyed() {
    this.performLeave()
  },

  data() {
    return {
      __isTween: true,
      entered: false,
      left: false,
      resolveTweenPromise: null,
      resolve: null
    }
  },

  methods: {

    resolveTween() {
      if(this.left) return
      this.resolveTweenPromise = this.resolveTweenPromise || new Promise((resolve) => {
        if(this.left) {
          resolve()
          return
        }
        this.resolve = resolve
      })
    },

    performEnter() {
      return Promise.all(this.$children.map(child => {
        let obj = getChildObject(child)
        if(!obj) return
        obj.tween.clear()
        return this.show && this.show(obj)
      })).then(() => {
        this.entered = true
        this.onEnter && this.onEnter()
      })
    },

    performLeave() {
      return Promise.all(this.$children.map(child => {
        let obj = getChildObject(child)
        if(!obj) return
        obj.tween.clear()
        return this.hide && this.hide(obj).then(() => {
          obj.destroy({
            children: true
          })
        })
      })).then(() => {
        this.left = true
        this.resolve && this.resolve()
        this.onLeft && this.onLeft()
      })
    }
  }
}


function setDontDestroyBySelf(vm) {
  vm.$children.forEach(child => {
    child.__dontDestroyBySelf = true
    setDontDestroyBySelf(child)
  })
}


function searchTweenComps(vm, tweenComps) {
  vm.$children.forEach(child => {
    if(child.__isTween) {
      tweenComps.push(child)
    }
    searchTweenComps(child, tweenComps)
  })
}

function getChildObject(vm) {
  if(!vm) return null
  if(vm.$object) return vm.$object
  return getChildObject(vm.$children[0])
}


Vue.mixin({

  data() {
    return {
      __dontDestroyBySelf: false
    }
  },

  destroyed () {
    if(this.__dontDestroyBySelf) {
      return
    }
    // resolve children tweens
    const tweenComps = []
    searchTweenComps(this, tweenComps)
    if(tweenComps.length === 0) {
      this.$object && this.$object.destroy()
      return
    }
    return Promise.all(tweenComps.map(tweenCom => {
      return tweenCom.resolveTween()
    })).then(() => {
      this.$object && this.$object.destroy()
    })
  }

})

Vue.prototype.$tween = function() {
  return new TweenBuilder()
}

class TweenBuilder {

  delay(time) {
    this.delayTime = time
    return this
  }

  from(key, value, time=1000, func="quadIn") {
    return (obj) => {
      let target = {}
      target[key] = obj[key]
      obj[key] = value
      if(this.delayTime) {
        let scheduler = obj.scheduler || obj.stage.scheduler
        return scheduler.wait(this.delayTime).then(() => obj.tween[func](target, time).promise())
      }
      return obj.tween[func](target, time).promise()
    }
  }

  slideDown(fromY=-500, time=500) {
    return this.from('y', fromY, time)
  }

  slideUp(fromY=2500, time=500) {
    return this.from('y', fromY, time)
  }

  scaleOut(fromScale=0, time=500) {
    return this.from('scaleXY', fromScale, time, 'backOut')
  }

}

