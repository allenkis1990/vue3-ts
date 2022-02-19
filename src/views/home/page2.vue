<template>
  <button @click="goHome">回到首页</button>
  <div>page2</div>
  <div>{{ count }}</div>
  <div>{{ name }}-{{ msg }}</div>
  <button @click="fn">click</button>
  <HelloWorld @propClick="pclick"/>
</template>

<script lang="ts">
import a1 from '@src/composable/home/a1'
import HelloWorld from '@src/components/HelloWorld.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Home',
  methods: {},
  components: {
    HelloWorld
  },
  setup(props) {
    const {refsObj, count, fn, goHome, pclick} = a1()
    return {
      ...refsObj,
      count,
      fn,
      goHome,
      pclick
    }
  }
})
</script>
<style lang="postcss">

</style>
