<template>
  {{ nickName }}
  <div class="mod1"></div>
  <div class="mod2"></div>
  <div class="mod3">
    <span>mod3</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapState, mapMutations} from 'vuex'

interface dataInterface {
  haha: string
}

export default defineComponent({
  name: 'Home',
  data: () => ({
    haha: 'haha'
  } as dataInterface),
  methods: {
    ...mapActions("home", [
      "getCodeFreeCreationGoToUrlActions"
    ]),
    ...mapMutations('home', ["changeName"]),
    getCodeFreeCreationGoToUrl() {
      this.getCodeFreeCreationGoToUrlActions().then((res) => {
        let {error_code, data} = res;
        if (!error_code) {
          console.log(data);
        }
      });
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
  components: {}
})
</script>
<style lang="postcss">
.mod3 {
  width: 100px;
  height: 100px;
  background: paleturquoise;

&
span {
  color: #fff;
}

}
</style>
