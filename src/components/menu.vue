<template>
  <div>
    <template v-for="item in menuList">
      <el-submenu
        v-if="item.childMenus && item.childMenus.length > 0"
        :key="item.path"
        index="null"
      >
        <template slot="title">
          <span>{{ item.menuName }}</span>
        </template>
        <Menu :menuList="item.childMenus" />
      </el-submenu>
      <el-menu-item v-else :key="item.path" :index="item.path"
        >{{ item.menuName }}
      </el-menu-item>
    </template>
  </div>
  <!-- </el-menu> -->
</template>

<script>
import Menu from "../components/Menu.vue";
export default {
  name: "Menu",
  components: {
    Menu,
  },
  props: {
    menuList: {},
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {},
};
</script>

<style></style>
