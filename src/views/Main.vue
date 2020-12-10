<template>
  <el-container style="height: 100%">
    <Menu :menuList="menuList"/>
    <el-container>
      <el-header>
        <Top/>
      </el-header>
      <el-main> <router-view /> </el-main>
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

  created(){
    this.menuList = this.$store.state.menuList
  },
  components: {
    Menu,
    Top
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
      menuList: [   
      ],
    };
  }
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

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
