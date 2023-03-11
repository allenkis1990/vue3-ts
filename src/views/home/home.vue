<template>
  {{ nickName }}
  <div class="mod1"></div>
  <div class="mod2"></div>
  <div class="mod3">
    <span>mod3</span>
  </div>
  <button @click="openConfirm">打开弹窗</button>
  <ContentDialog v-model:visible="visible">
    <template #content>
      我是传进来的内容~~~~
    </template>
  </ContentDialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ContentDialog from '@src/components/common/ContentDialog.vue'
import {mapActions, mapState, mapMutations} from 'vuex'


interface dataInterface {
  haha: string,
  visible: boolean
}

export default defineComponent({
  name: 'Home',
  data: () => ({
    haha: 'haha',
    visible:false
  } as dataInterface),
  methods: {
    ...mapActions("home", [
      "getCodeFreeCreationGoToUrlActions"
    ]),
    ...mapMutations('home', ["changeName"]),
    getCodeFreeCreationGoToUrl() {
      let params = {"page_num":1, "page_size": 5}
      this.getCodeFreeCreationGoToUrlActions(params).then((res) => {
        let {error_code, data} = res;
        if (!error_code) {
          console.log(data);
        }
      });
    },
    openConfirm(){
      this.visible = true
    }
  },
  mounted() {
    console.log(1);
    this.getCodeFreeCreationGoToUrl()
    setTimeout(() => {
      this.$store.state.home.nickName = 'tom'
    }, 3000)
//    setTimeout(()=>{
//      this.changeName('TOM')
//    },3000)
  },
  computed: {
    ...mapState('home', {
      nickName: 'nickName'
    })
  },
  components: {
    ContentDialog
  }
})
</script>
<style lang="postcss">
.mod3 {
  width: 100px;
  height: 100px;
  background: paleturquoise;
  & span {
    color: #fff;
  }
}
</style>
