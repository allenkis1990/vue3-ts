<template>
  {{nickName}}
  <div class="mod1"></div>
  <div class="mod2"></div>
  <div class="mod3">
    <span>mod3</span>
  </div>
</template>

<script>

import {mapActions,mapState} from 'vuex'
export default {
  name: 'Home',
  data: () => ({
    haha:'haha'
  }),
  methods:{
    ...mapActions("home", [
      "getCodeFreeCreationGoToUrlActions"
    ]),
    getCodeFreeCreationGoToUrl(){
      this.getCodeFreeCreationGoToUrlActions().then((res) => {
        let { error_code, data } = res;
        if (!error_code) {
          console.log(data);
        }
      });
    }
  },
  mounted(){
    console.log(1);
    this.getCodeFreeCreationGoToUrl()
    setTimeout(()=>{
      this.$store.state.home.nickName = 'tom'
    },3000)
  },
  computed:{
    ...mapState('home',{
      nickName: 'nickName'
    })
  },
  components: {

  }
}
</script>
<style lang="postcss">
  .mod3{
    width: 100px;
    height: 100px;
    background: paleturquoise;
    & span{
      color:#fff;
    }
  }
</style>
