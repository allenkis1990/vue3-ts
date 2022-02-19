<template>
  <div style="padding:10px 10px">
    <div class="tree-tit">鹿优课学生端静态页面列表</div>
    <el-tree :data="data"
             :props="defaultProps"
             @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<style lang="postcss">
  @import "~@src/assets/pcss/global.pcss";
</style>

<style>
  .tree-tit{text-align: center;font-size: 30px;font-weight: bold;margin-bottom: 10px;}
  .el-tree-node__label{font-size: 22px !important;}
  .el-tree-node__expand-icon{font-size: 20px !important;}
</style>
<script>
  import treeData from './vueMapperTree.js'
  export default {
    data() {
      return {
        data: treeData,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        if(!(data.children && data.children.length)){
          console.log(data.name);
          window.open(`/?page=${data.name}`)
        }else{
          console.log('不是叶子节点无法点击');
        }
      }
    }
  };
</script>

