<template>
  <div id="login">
    <el-form
        v-loading="loading"
        element-loading-text="进入中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input
          style="margin-left: 0px"
          placeholder="用户名"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="密码"
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
      loading:false
    };
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
            this.loading = true
            this.$axios
                .post("login", this.ruleForm)
                .then((res) => {
                this.loading = false
                if (res.data.msg ==="登录成功") {
                    alert(res.data.msg)
                    sessionStorage.setItem("token", res.data.data);
                    sessionStorage.setItem("username", this.ruleForm.username);
                    this.$router.replace({
                    path: "/home",
                    });
                }else{
                    alert(res.data.msg)
                }
                })
                .catch();
        } else {
          alert("用户名或密码不能为空");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style >
#login {
  width: 350px;
  height: 250px;
  text-align: center;
  filter: alpha(opacity=50);

  /* 阴影 */
  -moz-box-shadow: 2px 2px 10px #909090; /*firefox*/
  -webkit-box-shadow: 2px 2px 10px #909090; /*safari或chrome*/
  box-shadow: 2px 2px 10px #909090; /*opera或ie9*/
}

.el-form-item__content {
  margin: 0 !important;
}

.el-form {
  margin-top: 15px;
  padding: 20px;
}
</style>
