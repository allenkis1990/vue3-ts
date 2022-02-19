import {createStore} from 'vuex'
import home from './home'

interface RootState {
  name: string;
}


export default createStore({
  state: {
    name: 'rootName'
  } as RootState,
  mutations: {},
  actions: {},
  modules: {
    home
  }
})
