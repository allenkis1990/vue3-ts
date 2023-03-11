<template>
  <div>
    循环出的题目：
    <ul>
      <li v-for="(item,index) in componentList" style="margin-bottom: 10px;">
        <component :is="item.question_name"
                   :key="'question'+ index"
                   :ref="'question'+ index"/>
      </li>
    </ul>
    <div><button @click="fn">提交</button></div>
  </div>
  <div>
    <div>视频</div>
    <button @click="openContentDialog">打开内容弹窗</button>
    <div class="video-box" style="margin-top:0rem;">
      <img v-if="!isShowVideo" src="~@src/assets/logo.png" alt="" />
      <a
          v-if="!isShowVideo"
          href="javascript:void(0)"
          @click="clickVideoBtn()"
          class="play-btn"
      ></a>
      <VideoPlayer
          v-if="isShowVideo"
          :method="playStatus"
          :width="600"
          :height="400"
          :util="unil"
          :sources="videoUrl"
      >
      </VideoPlayer>
    </div>
  </div>
  <div>
    <div>音频</div>
    <AudioPlayer :src="'https://pre-dc-s.thedeer.cn/static/media/music.36db08f7.mp3'"></AudioPlayer>
    <AudioPlayer v-if="isShowAudio" :src="'https://pre-dc-s.thedeer.cn/static/media/music.36db08f7.mp3'"></AudioPlayer>
    <button @click="hideAudio">隐藏音频</button>
  </div>

  <ContentDialog v-model:visible="visible"
                 :width="1000"
                 :height="500">
    <template #content>
      <div style="text-align: center">
        <img src="~@src/assets/img/afei.jpg" alt="">
      </div>
    </template>
  </ContentDialog>

  <div>
<!--    <button @click="openMediaLooker">打开图片查看器</button>-->
    <div v-html="htmlData" class="htmlContent"></div>
    <MediaLooker v-model:visible="visible2"
                 v-if="visible2"
                 :mediaCount="curMediaCount"
                 :mediaLookerList="mediaLookerList"></MediaLooker>
  </div>

  <div>
    富文本：<div v-html="textareaHtml" style="font-size: 18px;"></div>
  </div>
  <TextAreaEditor @getTextareaStr="getTextareaStr"></TextAreaEditor>
</template>

<script lang="ts">
import {defineComponent, ref, toRefs, reactive, watch, computed, onMounted,getCurrentInstance} from 'vue'
import QuestionReader from '@src/components/questions/QuestionReader.js'
import VideoPlayer from '@src/components/common/VideoPlayer.vue'
import AudioPlayer from '@src/components/common/AudioPlayer.vue'
import ContentDialog from '@src/components/common/ContentDialog.vue'
import MediaLooker from '@src/components/common/MediaLooker.vue'
import TextAreaEditor from '@src/components/common/TextAreaEditor.vue'

import {mediaLookerItemInterF} from '@src/types/home/home.ts'

interface componentListInterF{
  type:number,
  question_name:string
}


interface dataInterface {
  componentList:Array<componentListInterF>,
  playStatus:string,
  isShowVideo:boolean,
  unil:string,
  videoUrl:string,
  isShowAudio:boolean,
  visible:boolean,
  visible2:boolean,
  htmlData:string,
  mediaCount:number,
  curMediaCount:number,
  mediaLookerList:Array<mediaLookerItemInterF>,
  textareaHtml:string,
  textareaHeight:number
}

export default defineComponent({
  name: 'Exam',
  methods: {},
  components: {
    ...QuestionReader,
    VideoPlayer,
    AudioPlayer,
    ContentDialog,
    MediaLooker,
    TextAreaEditor
  },
  setup(props,context) {
    // htmlContent
    let data:dataInterface = reactive({
      componentList:[
        {type:1,question_name:'Question_1'},
        {type:2,question_name:'Question_2'}
      ],
      playStatus: "pause",
      isShowVideo:false,
      unil:'px',
      videoUrl:'https://dev-media.thedeer.cn/video/79734153f7f48b8113306d365777afb5oxhihnicm2cehzlz.mp4',
      isShowAudio:true,
      visible:false,
      visible2:false,
      mediaLookerList:[],
      mediaCount:0,
      curMediaCount:0,
      textareaHtml:'',
      textareaHeight:300,
      htmlData:'123 sss   <audio></audio><video></video><img src="https://pre-jsl-s.thedeer.cn/static/img/biancheng-bg2.fac4cde8.jpg" style="cursor:pointer;width: 100px;height: 200px;display: block" />  <img src="https://pre-jsl-s.thedeer.cn/static/img/ico-guide-one.69d73f97.png" style="cursor: pointer;width: 100px;height: 150px;display: block;margin-top: 20px;">'
    })
    const currentInstance:any = getCurrentInstance()
    let _this = currentInstance.proxy

    function fn(){
      data.componentList.forEach((item,index)=>{
        // console.log(item);
        let refDom = _this.$refs['question'+index][0]
        let answer = refDom.getAnswer()
        console.log(answer);
      })
    }
    function clickVideoBtn() {
      data.isShowVideo = true;
    }
    function hideAudio(){
      data.isShowAudio = false;
    }
    function openContentDialog(){
      data.visible = true
    }

    function openMediaLooker(){
      data.visible2 = true
    }

    function getTextareaStr(str:string){
      let reg = /\n/ig
      console.log(`textarea长度:${str.length}`);
      data.textareaHtml = str.replace(reg, '<br>')
    }


    let nodeParser = {
      img(child:HTMLElement){
        console.log(child.getAttribute('src'));
        let url = child.getAttribute('src') as string
        child.setAttribute('media-index',data.mediaCount+'')
        data.mediaCount ++;
        data.mediaLookerList.push({
          url,
          mediaType:1
        })
        child.addEventListener('click',(e)=>{
          let target = e.target as HTMLElement
          let mediaIndex = Number(target.getAttribute('media-index'))
          data.curMediaCount = mediaIndex
          openMediaLooker()
        })
      }
    }

    onMounted(()=>{
      let htmlContent:any = document.querySelector('.htmlContent')
      let childs = htmlContent.childNodes
      childs.forEach(function(child:HTMLElement){
        if(child.nodeType === 1){
          // console.dir(child);
          let nodeName = child.nodeName.toLowerCase()
          if(nodeName === 'img'){
            nodeParser[nodeName](child)
          }
        }
      })
      // console.log(htmlContent.childNodes);
      // console.log(data.mediaLookerList,123);
    })


    return {
      ...toRefs(data),
      fn,
      getTextareaStr,
      clickVideoBtn,
      hideAudio,
      openContentDialog,
      openMediaLooker
    }
  }
})
</script>
<style lang="scss" scoped>
.video-box {
  margin-top: 20px;
  width: 600px;
  height: 400px;
  position: relative;
  img {
    border: none;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .play-btn {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: url("~@src/assets/img/video-play-btn.png") no-repeat center;
    background-size: cover;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -20px;
    margin-top: -20px;
  }
}
</style>
