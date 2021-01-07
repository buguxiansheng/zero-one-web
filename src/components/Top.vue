<template>
  <el-container>
    <el-header>
      <div id="left">
        <el-input v-model="input" :placeholder="$t('info')"></el-input>
        <el-button type="primary" icon="el-icon-search" style="margin: 9px"
          >搜索</el-button
        >
      </div>
      <div id="right">


        <el-dropdown @command="languange">
          <span class="el-dropdown-link">
            {{$t('lan')}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">简体中文</el-dropdown-item>
            <el-dropdown-item command="b">繁体中文</el-dropdown-item>
            <el-dropdown-item command="c">英文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>



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
        <span class="el-dropdown-link">{{ userName }}</span>
      </div>
    </el-header>
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
export default {
  data() {
    return {
      input: "",
      modifyUserForm: {
        userName: "",
        passWord: "",
      },
      dialogFormVisible: false,
      visible: "passWord",
      userName: "",
    };
  },
  created() {
    this.userName = sessionStorage.getItem("userName");
  },
  //   watch: {
  //       userName(val){
  //           this.userName = val
  //       },
  //       immediate: true
  //   },
  methods: {
    initModifyUserForm() {
      var userName = sessionStorage.getItem("userName");
      this.$axios({
        url: "getUserList",
        params: {
          userName: userName,
        },
        method: "get",
      })
        .then((res) => {
          console.log(res.data);
          this.modifyUserForm = res.data.data;
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
          userNameNew: this.modifyUserForm.userName,
          passWordNew: this.modifyUserForm.passWord,
          userNameOld: sessionStorage.getItem("userName"),
        })
        .then((res) => {
          sessionStorage.setItem("userName", this.modifyUserForm.userName);
          this.userName = this.modifyUserForm.userName;
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
    languange(command) {
      if (command === "a") {
        this.$i18n.locale = "zh-CN";
      }
      if (command === "b") {
        this.$i18n.locale = "zh-TW";
      }
      if (command === "c") {
        this.$i18n.locale = "en-US";
      }
    },
  },
};
</script>

<style></style>
