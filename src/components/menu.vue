<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <el-submenu index="previlige_manage">
        <template slot="title">
          <i class="el-icon-cpu"></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="user_manage"><i class="el-icon-user-solid"></i>用户管理</el-menu-item>
          <el-menu-item index="group_manage"><i class="el-icon-s-data"></i>组织架构</el-menu-item>
          <el-menu-item index="model_manage"><i class="el-icon-user"></i>角色管理</el-menu-item>
          <el-menu-item index="data_manage"><i class="el-icon-s-data"></i>数据权限</el-menu-item>
          <el-menu-item index="model_group_manage"><i class="el-icon-bank-card"></i>角色组</el-menu-item>
          <el-menu-item index="order_manage"><i class="el-icon-menu"></i>菜单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>