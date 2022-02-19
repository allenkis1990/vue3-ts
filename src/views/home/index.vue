<template>
  <div class="home">
    <ul>
      <li>{{$route.meta.keepAlive}}</li>
      <li><a href="javascript:void(0)" @click="goRouter('homeIndex')">home</a></li>
      <li><a href="javascript:void(0)" @click="goRouter('homePage2')">page2</a></li>
    </ul>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive"/>
    </router-view>
  </div>
</template>

<script>


export default {
  name: 'Home',
  methods:{
    goRouter(goWhere){
      this.$router.push({
        name: goWhere,
      });
    }
  },
  components: {

  }
}
</script>
