/**
 * Created by Allen Liu on 2022/1/23.
 */
export {}
import {ref, toRefs, reactive, watch, computed, onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'

import {createNamespacedHelpers} from 'vuex-composition-helpers';

export default function () {
  //要用vuex-composition-helpers工具替代mapState mapActions mapMutations mapGetter那些，否则找不到this
  // import { useState, useActions } from 'vuex-composition-helpers';根store
  //store里拿出来的方法 变量不要手动去改变，要用store里的方法去改变
  //子store
  const {useState, useActions,useMutations} = createNamespacedHelpers('home'); // specific module name
  const {getCodeFreeCreationGoToUrlActions} = useActions(['getCodeFreeCreationGoToUrlActions'])
  const {changeName} = useMutations(['changeName'])
  setTimeout(()=>{
    changeName('jack')
  },3000)
  const {nickName} = useState(['nickName'])

  // const store = useStore()
  // store.dispatch('home/getCodeFreeCreationGoToUrlActions')触发两次？


  const router = useRouter()
  onMounted(() => {
    console.log('page2 mounted!');
    let route = useRoute()
    console.log(route.query,'route');
  })
  //ref注册简单数据 要加.value
  let count = ref(0)

  //reactive注册复杂对象数据 不用加.value
  let obj = reactive({
    oriName: 'allen',
    msg: '我要拿龙！！',
    name: 'allen'
  })

  //把方法整到一起输出
  let methods = {
    pclick(res: string){
      console.log(res, 3333)
    },
    fn(){
      count.value++
      obj.name = obj.oriName + count.value
    },
    goHome(){
      router.push({
        name: 'homeIndex',
      })
    }
  }


  watch(count,(nv)=>{
    console.log(nv,'watch!!!');
  })

  return {
    refsObj: toRefs(obj),
    count,
    nickName,
    ...methods
  }
}