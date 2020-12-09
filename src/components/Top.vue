<template>
  <el-container>
    <el-header>
      <div id="left">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-search" style="margin: 9px"
          >搜索</el-button
        >
      </div>
      <div id="right">
        <el-dropdown
          trigger="click"
          @command="handleCommand"
          style="margin:10px"
        >
          <el-avatar
            icon="el-icon-user-solid"
            class="el-dropdown-link"
          ></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="修改信息">修改信息</el-dropdown-item>
            <el-dropdown-item command="登出">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form v-model="modifyUserForm">
        <el-form-item label="username">
          <el-input
            v-model="modifyUserForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input
            v-model="modifyUserForm.password"
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
export default {
  data() {
    return {
      input: "",
      modifyUserForm: {
        username: "",
        password: "",
      },
      dialogFormVisible: false,
      visible: "password",
    };
  },
  methods: {
    initModifyUserForm() {
      var username = sessionStorage.getItem("username");
      console.log(username);
      this.$axios({
        url: "getUserList",
        params: {
          username: username,
        },
        method: "get",
      })
        .then( res => {
          console.log(res.data);
          this.modifyUserForm = res.data.data[0];
        })
        .catch();
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    /* eslint-disable */

    confirm() {
      this.$axios
        .post("modifyUserInfo", {
          usernameNew: this.modifyUserForm.username,
          passwordNew: this.modifyUserForm.password,
          usernameOld: sessionStorage.getItem("username"),
        })
        .then((res) => {
          // this.modifyUserForm = res.data.data
          sessionStorage.setItem("username", this.modifyUserForm.username);
          alert(res.data.msg);
          this.dialogFormVisible = false;
        })
        .catch();
    },

    handleCommand(command) {
      if (command === "登出") {
        localStorage.clear();
        this.$router.replace({
          path: "/",
        });
      }
      if (command === "修改信息") {
        this.dialogFormVisible = true;
        this.initModifyUserForm();
      }
    },
  },
}
</script>

<style>
</style>
