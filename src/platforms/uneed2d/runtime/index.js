/* @flow */

import Vue from 'core/index'
import { patch } from 'uneed2d/runtime/patch'
import { mountComponent } from 'core/instance/lifecycle'
import platformDirectives from 'uneed2d/runtime/directives/index'
import platformComponents from 'uneed2d/runtime/components/index'
import UN from 'uneed2d/engine'

import {
  mustUseProp,
  isReservedTag,
  isUnknownElement
} from 'uneed2d/util/index'

// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives and components
Vue.options.directives = platformDirectives
Vue.options.components = platformComponents

// install platform patch function
Vue.prototype.__patch__ = patch

// wrap mount
Vue.prototype.$mount = function (
  el?: any,
  hydrating?: boolean
): Component {
  return mountComponent(
    this,
    el,
    hydrating
  )
}

Vue.prototype.$getParentObject = function() {
  let parent = this.$parent
  while(parent && !parent.$object) {
    parent = parent.$parent
  }
  return parent && parent.$object
}

Vue.prototype.emitBus = function() {
  let bus = UN.stage.eventBus
  bus.emit.apply(bus, arguments)
}


export default Vue
