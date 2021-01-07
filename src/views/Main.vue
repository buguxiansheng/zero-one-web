<template>
  <el-container style="height: 100%">
    <!-- <Menu v-for="item in menuList" :item="item" :key="item.path"/> -->

    <el-menu router>
      <Menu :menuList="menuList" />
    </el-menu>
    <el-container>
      <el-header>
        <Top />
      </el-header>
      <el-main> 
        <router-view /> 
      </el-main>
    </el-container>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form v-model="modifyUserForm">
        <el-form-item label="userName">
          <el-input
            v-model="modifyUserForm.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="passWord">
          <el-input
            v-model="modifyUserForm.passWord"
            :type="visible"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import Menu from "../components/Menu";
import Top from "../components/Top";
export default {
  created() {
    this.menuList = JSON.parse(sessionStorage.getItem("menuList"));
  },
  components: {
    Menu,
    Top,
  },
  data() {
    return {
      input: "",
      modifyUserForm: {
        userName: "",
        passWord: "",
      },
      dialogFormVisible: false,
      visible: "passWord",
      isCollapse: false,
      menuList: [],
    };
  },
  methods: {},
  // 监控路由的变化
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#left {
  flex-grow: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#right {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
