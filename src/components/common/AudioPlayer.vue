<template>
  <div ref="videoPlayer" class="audioPlayer" @click="playBtnClick" v-show="canPlay">
    <audio :src="src" ref="audioPlayer" controls="controls" style="display: none"></audio>
    <div class="audio-ico" :class="{'playing':playing}"></div>
    <div class="audio-time">5"</div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      playing:false,
      canPlay:false,
      lastDateTime:0
    }
  },
  props: {
    src: String
  },
  watch: {
    src(newValue) {
      let self = this;
      self.initAudio();
    }
  },
  methods: {
    playBtnClick() {
      let curTime = new Date().getTime();
      if (curTime - this.lastDateTime < 100) {
        return;
      }
      // 改变播放/暂停图片
      if (this.audio.paused) {
        // 开始播放当前点击的音频
        window.audiosContainer.forEach((item)=>{
          if(this._.uid !== item.uid){
            item.node.pause();
          }
        })
        this.audio.play();
      } else {
        this.audio.pause();
      }
      this.lastDateTime = new Date().getTime();
    },
    initAudio() {
      this.bindEvents()
      window.audiosContainer.push({uid:this._.uid,node:this.audio})
    },
    bindEvents(){
      this.audio = this.$refs.audioPlayer
      this.audio.addEventListener("playing", this.audioPlaying);
      this.audio.addEventListener("pause", this.audioPause);
      this.audio.addEventListener("canplay", this.audioCanPlay);
      this.audio.addEventListener("ended", this.audioEnded, false);
    },
    unbindEvents(){
      !this.audio.paused && this.audio.pause();
      this.audio.removeEventListener("playing", this.audioPlaying);
      this.audio.removeEventListener("pause", this.audioPause);
      this.audio.removeEventListener("canplay", this.audioCanPlay);
      this.audio.removeEventListener("ended", this.audioEnded);
    },
    audioPlaying(){
      this.playing = true
    },
    audioPause(){
      this.playing = false
    },
    audioCanPlay(){
      this.canPlay = true
    },
    audioEnded(){
      this.playing = false
    }
  },
  mounted() {
    let self = this;
    self.initAudio();
  },
  updated(){
    let self = this;
  },
  beforeUnmount () {
    this.unbindEvents()
  }
}
</script>

<style lang="scss" scoped>
.audioPlayer{
  border-radius: 10px;
  width: 200px;
  height: 40px;
  padding: 10px;
  background: deepskyblue;
  position: relative;
  display: flex;
  justify-content: space-between;
  .audio-ico{
    width: 28px;
    height: 21px;
    background: url("~@src/assets/img/audio-ico.png") no-repeat center center;
    background-size: contain;
    &.playing{
      background: url("~@src/assets/img/audio-ico.gif") no-repeat center center;
      background-size: contain;
    }
  }
  .audio-time{
    color:purple;
  }
}
</style>
