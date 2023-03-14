<template>
  <div class="home">
    <ul>
      <!--<li>{{$route.meta.keepAlive}}</li>-->
      <li>hahahahahhawawhahahaa</li>
      <li><a href="javascript:void(0)" @click="goRouter('homeIndex')">home</a></li>
      <li><a href="javascript:void(0)" @click="goRouter('homePage2')">page2</a></li>
      <li><a href="javascript:void(0)" @click="goRouter('homeExam')">exam</a></li>
    </ul>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"
                   :key="Component"
                   v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component"
                 :key="Component"
                 v-if="!$route.meta.keepAlive"/>
    </router-view>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue'
export default defineComponent({
  name: 'Home',
  methods: {
    goRouter(goWhere: string) {
      this.$router.push({
        name: goWhere,
      });
    }
  },
  components: {
  }
})
</script>
