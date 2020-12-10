<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <template v-for="item in menuList">
        <el-submenu
          v-if="item.childMenus && item.childMenus.length > 0"
          :key="item.url"
          :index="item.url === null ? 'null': item.url"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.menuName }}</span>
          </template>
          <Menu :menuList="item.childMenus" />
        </el-submenu>
        <el-menu-item v-else :key="item.url" :index="item.url === null ? 'null': item.url">{{
          item.menuName
        }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import Menu from "../components/Menu"
export default {
  name:"Menu",
  components:{
    Menu
  },
  props:{
    menuList: {}
  },
  data(){
    return{
      isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
