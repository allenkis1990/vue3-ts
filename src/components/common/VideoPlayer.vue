<template>
  <div style="padding: 10px 0 0;" :style="{width: width +util,height: height +util}">
    <video ref="videoPlayer" class="video-js" :src="src" :sources="sources"></video>
  </div>
</template>

<script>
import VideoJS from 'video.js';
import 'video.js/dist/video-js.min.css';

export default {
  data() {
    return {}
  },
  props: {
    util:{
      type: String,
      default: 'px'
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 360
    },
    poster: String,
    src: String,
    sources: {
      type: [Array,String],
      require: true
    },
    method: {
      type: String,
      default: "play"
    },
    options: {
      type: Object,
      default() {
        return {
          autoplay: true,
          controls: true
        }
      }
    }
  },
  watch: {
    poster(newValue) {
      let self = this;
      //self.initVideoJS();
    },
    src(newValue) {
      let self = this;
      self.initVideoJS();
    },
    sources(newValue) {
      let self = this;
      self.initVideoJS();
    },
    method(name){
      let self = this;
      switch(name){
        case "play":
          self.player.play();
          break;
        case "pause":
          self.player.pause();
          break;
      }
    }
  },
  methods: {
    initVideoJS() {
      let self = this;
      let options = Object.assign({}, self.options);
      let width;
      let height
      if(self.util==='rem'){
        width = self.width * 12;
        height = self.height * 12;
      }else {
        width = self.width;
        height = self.height;
      }
      options.width = width;
      options.height = height;
      options.poster = self.poster;
      options.src = self.src;
      options.sources = self.sources;
      if(self.player) {
        self.player.src(options.src);
        self.player.src(options.sources);
      }else{
        self.player = VideoJS(self.$refs.videoPlayer, options, function() {
          console.log('onPlayerReady', this);
        })
      }
    }
  },
  mounted() {
    let self = this;
    self.initVideoJS();
  },
  updated(){
    let self = this;
  },
  beforeDestroy() {
    let self = this;
    if(self.player) {
      self.player.dispose();
    }
  }
}
</script>

<style>

</style>
