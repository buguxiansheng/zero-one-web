<template>
  <div>
    <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
    >
    </el-tree>
    <el-button @click="getCheckedNodes">通过 node 获取</el-button>
    <!-- <el-button @click="getCheckedKeys">通过 key 获取</el-button>
    <el-button @click="setCheckedNodes">通过 node 设置</el-button>
    <el-button @click="setCheckedKeys">通过 key 设置</el-button> -->
    <el-button @click="resetChecked">清空</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    
    // 清除选中的
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },


    // 转换成有效数据
      
  },

  created(){
    this.data = JSON.parse(sessionStorage.getItem("menuList"))
  },
  data() {
    return {
      data: [
      ],
      defaultProps: {
        children: "childMenus",
        label: "menuName",
        
      },
      order:[]
    };
  },

};
</script>

<style></style>
