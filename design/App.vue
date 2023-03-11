<template>
  <div style="padding:10px 10px">
    <div class="tree-tit">静态页面列表</div>
    <el-tree :data="treeData"
             :props="defaultProps"
             @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<style lang="postcss">
@import "~@src/assets/scss/index.scss";
</style>

<style>
.tree-tit {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}

.el-tree-node__label {
  font-size: 22px !important;
}

.el-tree-node__expand-icon {
  font-size: 20px !important;
}
</style>
<script>
import {defineComponent} from 'vue'
import treeData from './vueMapperTree.js'

export default defineComponent({
  data() {
    return {
      treeData: treeData,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  components: {},
  mounted() {

  },
  methods: {
    handleNodeClick(data) {
      if (!(data.children && data.children.length)) {
        console.log(data.name);
        window.open(`/?page=${data.name}`)
      } else {
        console.log('不是叶子节点无法点击');
      }
    }
  }
});
</script>

