<template>
  <span class="Question_1">
    判断题
  </span>
</template>

<script lang="ts">
import {defineComponent, ref, toRef, toRefs} from 'vue'

export default defineComponent({
  name: 'Question_1',
  props: {
    // msg: {
    //   type: String,
    //   default: ''
    // },
  },
  setup(props, context) {
    function getAnswer(){
      return 'Question_1'
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
