
let api = {
  getCodeFreeCreationGoToUrl:'/trainingCamp/getCodeFreeCreationGoToUrl'
}
import {postWeb} from "@src/assets/js/http";

/**
 * user模块
 */
export default {
    namespaced: true,
    state: {
      nickName:'allen'
    },
    getters: {

    },
    mutations: {

    },
    actions: {
      // getCodeFreeCreationGoToUrlActions({commit,dispatch}){
      getCodeFreeCreationGoToUrlActions(){
        return new Promise((resolve,reject)=>{
          postWeb(api.getCodeFreeCreationGoToUrl).then((res)=>{
            resolve(res)
          },(err)=>{
            reject(err)
          })
        })
      }
    }
}
  