import {ComponentCustomProperties} from 'vue'
import {Store} from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    //添加modulesState
    home: any
  }

  interface ComponentCustomProperties {
    //this.xxx this的扩展属性需要在这里声明
    $store: Store<State>
  }
}