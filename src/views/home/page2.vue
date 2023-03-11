<template>
  <button @click="goHome">回到首页</button>
  <div>page2</div>
  <div>{{ count }}</div>
  <div>{{ name }}-{{ msg }}</div>
  <button @click="fn">click</button>
  <HelloWorld @propClick="pclick"/>
  {{nickName}}
</template>

<script lang="ts">
import a1 from '@src/composable/home/a1'
import HelloWorld from '@src/components/common/HelloWorld.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Home',
  methods: {},
  components: {
    HelloWorld
  },
  setup(props) {
    console.log(a1(),99);
    const {refsObj, count, fn, goHome, pclick,nickName} = a1()
    type o = {name:string,age:number}
    let obj:Array<o> = [{name:'allen',age:18},{name:'jack',age:28}]
    return {
      ...refsObj,
      count,
      nickName,
      fn,
      goHome,
      pclick
    }
  }
})
</script>
<style lang="postcss">

</style>
