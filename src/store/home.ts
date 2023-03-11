let api = {
  // getCodeFreeCreationGoToUrl: '/student/goods/used/list'
  getCodeFreeCreationGoToUrl: '/list'
}
import {postWeb} from "@src/assets/js/http.js";
import {actionFnObj} from "@src/types/common/index.ts";
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
    getCodeFreeCreationGoToUrlActions({commit,dispatch}:actionFnObj,params:any){
    // getCodeFreeCreationGoToUrlActions(storeObj:any,params:any) {
      return new Promise((resolve, reject) => {
        postWeb(api.getCodeFreeCreationGoToUrl,params).then((res) => {
          resolve(res)
        }, (err) => {
          reject(err)
        })
      })
    }
  }
}
  