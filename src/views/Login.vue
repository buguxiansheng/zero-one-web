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
      <el-form-item prop="userName">
        <el-input
          style="margin-left: 0px"
          placeholder="用户名"
          v-model="ruleForm.userName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passWord">
        <el-input
          placeholder="密码"
          type="passWord"
          v-model="ruleForm.passWord"
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
import { routes }  from '@/router'
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
        userName: "",
        passWord: "",
      },
      rules: {
        userName: [{ validator: validateUser, trigger: "blur" }],
        passWord: [{ validator: validatePass, trigger: "blur" }],
      },
      loading: false,
      dynamicRoute: [],
      menuList: [],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$axios
            .post("login", this.ruleForm)
            .then((res) => {
              this.loading = false;
              if (res.data.msg === "登录成功") {
                this.menuList = res.data.data.menuList;
                this.$store.commit("changeMenuList", res.data.data.menuList);

                sessionStorage.setItem(
                  "menuList",
                  JSON.stringify(res.data.data.menuList)
                );

                sessionStorage.setItem("token", res.data.data.token);
                sessionStorage.setItem("userName", this.ruleForm.userName);
                // 动态路由添加
                this.formateRoutes(this.menuList);
                console.log(this.dynamicRoute);
                sessionStorage.setItem(
                  "asideList",
                  JSON.stringify(this.dynamicRoute)
                );
                console.log(this.dynamicRoute)
                this.$router.addRoutes([
                  {
                    name: "Main",
                    path: "/main",
                    component: () =>
                      import(
                        /* webpackChunkName: "about" */ "../views/Main.vue"
                      ),
                    children: this.dynamicRoute,
                  },
                ])
                this.$router.replace({
                  path: "/main",
                })
                alert(res.data.msg)
              } else {
                alert(res.data.msg)
              }
            })
            .catch();
        } else {
          alert("用户名或密码不能为空")
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    formateRoutes(menuList) {
      menuList.forEach((item) => {
        //不存在  或者长度为 0 
        if (!item.childMenus || item.childMenus.length === 0) {
          var path = item.path;
          let route = {
            path: item.path,
            name: item.path,
            component: () =>
              // 动态导入  截取字符串的一部分 给出View名
              import(`@/views/modules/sys${path}.vue`),
          };
          this.dynamicRoute.push(route);
        } else {
          this.formateRoutes(item.childMenus);
        }
      });
    },
  },
};
</script>
<style>
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
