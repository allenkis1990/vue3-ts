/**
 * Created by Allen Liu on 2022/1/23.
 */
import { ref, toRefs , reactive, watch , computed , onMounted  } from 'vue'
import {useRouter} from 'vue-router'
export default function(){
  const router = useRouter()
  onMounted(()=>{
    console.log('page2 mounted!');
  })
  //ref注册简单数据 要加.value
  let count = ref(0)
  //reactive注册复杂对象数据 不用加.value
  let obj = reactive({
    oriName : 'allen',
    msg:'我要拿龙！！',
    name:'allen'
  })
  function fn(){
    count.value ++
    obj.name = obj.oriName + count.value
  }
  function pclick(res){
    console.log(res,3333);
  }
  function goHome(){
    router.push({
      name: 'homeIndex',
    })
  }
  return {
    refsObj:toRefs(obj),
    count,
    fn,
    goHome,
    pclick
  }
}