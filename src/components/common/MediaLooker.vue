<template>
  <teleport to="body">
    <div class="dialog" v-if="visible">
      <div class="mask"></div>
      <div class="close" @click="cancel">
        <img src="@/assets/img/big-close.png" alt="" />
      </div>
      <div class="prev" @click="prev"></div>
      <div class="next" @click="next"></div>
<!--      <button style="position: fixed;z-index: 9999;top:0;left:0" @click="fn">click</button>-->
      <div class="imgLooker" v-if="curMediaObj.mediaType == 1"
           @click="enlarge"
           :class="{ in: enlargeStatus === 'in', out: enlargeStatus === 'out' }">
        <img :src="curMediaObj.url"
             :style="{'width':curMediaObj.width+'px','height':curMediaObj.height+'px'}"
             alt="">
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRef, toRefs, watch} from 'vue'
import {mediaLookerItemInterF} from '@src/types/home/home.ts'
import fun from '@src/assets/js/fun.js'
interface mediaLookerItemInterF2 extends mediaLookerItemInterF{
  width:number,
  height:number
}
interface dataInterface<T>{
  curMediaObj:T,
  curMediaCount:number,
  imgCompressWidth:number,
  imgCompressHeight:number,
  imgNativeWidth:number,
  imgNativeHeight:number,
  enlargeStatus:string,
  canEnlarge:boolean
}
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mediaLookerList: {
      type: Array,
      default: []
    },
    mediaCount:{
      type: Number,
      default:0
    }
  },
  setup(props, context) {
    let data:dataInterface<mediaLookerItemInterF2> = reactive({
      curMediaObj: {} as mediaLookerItemInterF2,
      curMediaCount:0,
      imgCompressWidth:0,
      imgCompressHeight:0,
      imgNativeWidth:0,
      imgNativeHeight:0,
      enlargeStatus: "in", //in:放大图标 out:缩小图标
      canEnlarge:false
    })

    function cancel(){
      context.emit("update:visible", false);
    }


    function getCurMedia(index:number){
      data.curMediaCount = index
      data.curMediaObj = fun.copyDeepObject(props.mediaLookerList[index]) as mediaLookerItemInterF2
      let newImg = new Image()
      newImg.src = data.curMediaObj.url
      let root = document.documentElement || document.body
      let rootW = root.clientWidth
      let rootH = root.clientHeight
      data.canEnlarge = false
      data.enlargeStatus = 'in'
      newImg.addEventListener('load',()=>{
        let imgW = newImg.width;
        let imgH = newImg.height;
        let bili, compressW, compressH;
        data.imgNativeWidth = imgW;
        data.imgNativeHeight = imgH;
        //缩放规则：
        //如果（原图得宽度和窗口得宽度差）>（原图得高度和窗口得高度差）用宽度比利来缩放
        //如果（原图得宽度和窗口得宽度差） <（原图得高度和窗口得高度差）用高度比利来缩放
        if (imgW >= rootW || imgH >= rootH) {
          let w = imgW - rootW;
          let h = imgH - rootH;
          let bili, compressW, compressH;
          if (w > h) {
            compressW = rootW * 0.9;
            bili = compressW / imgW;
            compressH = imgH * bili;
            data.curMediaObj.width = compressW;
            data.curMediaObj.height = compressH;
            data.imgCompressWidth = compressW;
            data.imgCompressHeight = compressH;
          } else {
            compressH = rootH * 0.9;
            bili = compressH / imgH;
            compressW = imgW * bili;
            data.curMediaObj.width = compressW;
            data.curMediaObj.height = compressH;
            data.imgCompressWidth = compressW;
            data.imgCompressHeight = compressH;
          }
          data.canEnlarge = true;
        } else {
          data.curMediaObj.width = imgW;
          data.curMediaObj.height = imgH;
          data.imgCompressWidth = imgW;
          data.imgCompressHeight = imgH;
        }
        // if(newImg.width >= rootW * 0.9){
        //   data.curMediaObj.width = rootW * 0.9
        // }else{
        //   data.curMediaObj.width = newImg.width
        // }
      })
    }


    function enlarge() {
      if (data.canEnlarge) {
        if (data.enlargeStatus === "in") {
          data.curMediaObj.width = data.imgNativeWidth;
          data.curMediaObj.height = data.imgNativeHeight;
        } else {
          data.curMediaObj.width = data.imgCompressWidth;
          data.curMediaObj.height = data.imgCompressHeight;
        }
        data.enlargeStatus = data.enlargeStatus === "in" ? "out" : "in";
        window.console.log(
            data.imgNativeWidth,
            data.imgNativeHeight,
            data.imgCompressWidth,
            data.imgCompressHeight
        );
      }
    }


    function next(){
      if(data.curMediaCount === props.mediaLookerList.length -1){
        data.curMediaCount = 0
      }else{
        data.curMediaCount++
      }
      getCurMedia(data.curMediaCount)
    }
    function prev(){
      if(data.curMediaCount === 0){
        data.curMediaCount = props.mediaLookerList.length -1
      }else{
        data.curMediaCount--
      }
      getCurMedia(data.curMediaCount)
    }

    watch(props.mediaLookerList,(nv)=>{
      if(nv && nv.length){
        console.log(nv,3333);
        getCurMedia(props.mediaCount)
        // console.log(props.mediaCount,11113);
      }
    },{immediate:true,deep:true})

    return {
      cancel,
      next,
      prev,
      enlarge,
      ...toRefs(data)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.dialog{
  .mask{
    z-index:1001;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.6;
  }
  .prev,.next{
    position: fixed;z-index: 1003;top:50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .prev{
    left:10px;
    background: url("~@src/assets/img/big-pre.png") no-repeat center;
    background-size: cover;
  }
  .next{
    right:10px;
    background: url("~@src/assets/img/big-next.png") no-repeat center;
    background-size: cover;
  }
  .close{
    position: fixed;
    z-index:1003;
    top:10px;
    right:30px;
    color:#fff;
    cursor: pointer;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    img{
      width: 100%;
      height: 100%;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
  .imgLooker{
    width: 100%;
    height: 100%;
    z-index:1002;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    &.out {
      display: inherit;
      text-align: center;
      overflow: auto;
      cursor: zoom-out;
    }
    &.in {
      cursor: zoom-in;
    }
  }
}



/*定义滑块颜色、内阴影及圆角*/
.imgLooker::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #fff;
  &:hover {
    background-color: #fff;
  }
}
</style>
