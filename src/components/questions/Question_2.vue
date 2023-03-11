<template>
  <span class="Question_2">
    多选题
  </span>
</template>

<script lang="ts">
import {defineComponent, ref, toRef, toRefs} from 'vue'

export default defineComponent({
  name: 'Question_2',
  props: {
    // msg: {
    //   type: String,
    //   default: 'HelloWorld'
    // },
  },
  setup(props, context) {
    function getAnswer(){
      return 'Question_2'
    }
    return {
      getAnswer
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
