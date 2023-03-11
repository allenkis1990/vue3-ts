<template>
  <div class="editor-textarea">
    <textarea v-model="textareaStr"
              maxlength="5000"
              id="editor-textarea">33333</textarea>
    <div class="len">{{textareaStr.length}}/5000</div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted,onUnmounted, reactive, ref, toRef, toRefs, watch,onActivated,onDeactivated} from 'vue'
interface dataInterface{
  textareaStr:string
}
export default defineComponent({
  props: {

  },
  setup(props, context) {
    let data:dataInterface = reactive({
      textareaStr:'',
    })

    let observer:any
    onMounted(()=>{
      let textareaInitH = 300
      let ele = document.getElementById('editor-textarea') as HTMLElement
      const MutationObserver = window.MutationObserver|| window.WebKitMutationObserver || window.MozMutationObserver
      const config = { attributes: true, childList: false, subtree: true, attributeFilter:['style'],attributeOldValue:true };
      observer = new MutationObserver( (mutationsList, observer) => {
        let appNode = document.getElementById('app')
        if(appNode){
          let height = parseInt(getComputedStyle(ele).getPropertyValue('height'))
          let scrollDistance = height - textareaInitH
          if(scrollDistance > 0){
            appNode.scrollTop = appNode.scrollTop + scrollDistance
          }
          textareaInitH = height
        }
      });
      observer.observe(ele, config);
    })

    onUnmounted(()=>{
      observer && observer.disconnect()
    })

    watch(() => data.textareaStr, (nv) => {
      console.log(nv);
      context.emit("getTextareaStr", nv);
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.editor-textarea{
  margin-left: 15px;
  margin-top: 15px;
  position: relative;
  display: inline-block;
  textarea{
    font-size: 18px;min-width: 800px;max-width: 1600px;min-height: 300px;
    padding: 10px 15px 15px 15px;
    outline-color: deepskyblue;
  }
  .len{
    right: 15px;
    bottom: 4px;
    position: absolute;
    color:blue;
    font-weight: bold;

  }
}


</style>
