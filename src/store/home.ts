let api = {
  getCodeFreeCreationGoToUrl: '/trainingCamp/getCodeFreeCreationGoToUrl'
}
import {postWeb} from "@src/assets/js/http.js";

/**
 * user模块
 */
interface HomeState {
  nickName: string
}

const state: HomeState = {
  nickName: 'allen'
}

export default {
  namespaced: true,
  state,
  getters: {},
  mutations: {
    changeName(state: HomeState, payload: string) {
      state.nickName = payload
    },
  },
  actions: {
    // getCodeFreeCreationGoToUrlActions({commit,dispatch}){
    getCodeFreeCreationGoToUrlActions() {
      return new Promise((resolve, reject) => {
        postWeb(api.getCodeFreeCreationGoToUrl).then((res) => {
          resolve(res)
        }, (err) => {
          reject(err)
        })
      })
    }
  }
}
  