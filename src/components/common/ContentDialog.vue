<template>
  <teleport to="body">
    <div class="dialog" v-if="visible">
      <div class="mask"></div>
      <div class="contentDialog pt50 pb50"
           :style="{'width':width+unit,'height':height+unit,'margin-left':'-'+(width/2)+unit,'margin-top':'-'+(height/2)+unit}">
        <div class="header">{{title}}
          <div class="close" @click="cancel">x</div>
        </div>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <div class="footer" v-if="hideFooter">
          <button @click="cancel">取消</button>
          <button @click="confirm">确认</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {defineComponent, ref, toRef, toRefs} from 'vue'

export default defineComponent({
  name: 'ContentDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    hideFooter:{
      type: Boolean,
      default: true
    },
    title:{
      type: String,
      default: '标题'
    },
    height:{
      type: Number,
      default: 300
    },
    width:{
      type: Number,
      default: 500
    },
    unit:{
      type: String,
      default: 'px'
    }
  },
  setup(props, context) {
    function confirm(){
      context.emit("update:visible", false);
    }
    function cancel(){
      context.emit("update:visible", false);
    }
    return {
      confirm,
      cancel
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.dialog{
  & .mask{
    z-index:1001;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.6;
  }
  & .contentDialog{
    &.pt50{padding-top: 50px;}
    &.pb50{padding-bottom: 50px;}
    z-index:1001;
    background: #fff;
    position: fixed;
    left:50%;
    top:50%;
    .header{
      height: 50px;
      line-height: 50px;
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      .close{
        position: absolute;
        right:0;
        top:0;
        font-weight: bold;
        font-size: 30px;
        cursor: pointer;
      }
    }
    .content{
      height: 100%;
      overflow: auto;
    }
    .footer{
      height: 50px;
      line-height: 50px;
      width: 100%;
      position: absolute;
      left:0;
      bottom: 0;
    }
  }
}
</style>
