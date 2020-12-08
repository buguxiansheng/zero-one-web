<template>
  <el-container style="height: 100%">
    <!-- <el-aside width="200px"> 
      <orders ref="orders"></orders> 
    </el-aside> -->
    <orders ref="orders"></orders> 
    <el-container>
      <el-container>
        <el-header>
          <div id="left">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            <el-button type="primary" icon="el-icon-search" style="margin: 9px"
              >搜索</el-button
            >
          </div>
          <div id="right">
            <el-dropdown  trigger="click" @command="handleCommand" style="margin:10px">
              <el-avatar icon="el-icon-user-solid" class="el-dropdown-link" ></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="修改信息">修改信息</el-dropdown-item>
                <el-dropdown-item command="登出">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main> <router-view /> </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form v-model="modifyUserForm">
        <el-form-item label="username" >
          <el-input v-model="modifyUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="password" >
          <el-input v-model="modifyUserForm.password" :type="visible" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>
<script>

import orders from '../components/menu'
export default {
  data() {
    return {
      input: "",
      modifyUserForm:{
        username: '',
        password: ''
      },
      dialogFormVisible:false,
      visible: 'password'
    };
  },
  components:{
    orders
  },
  methods: {
    visibleOrNot(){
      this.visible == "password" ? "text":"password"
    },
    initModifyUserForm(){
      var username = sessionStorage.getItem("username")
      console.log(username)
      this.$axios({
        url:'getUserList',
        params:{
          username:username
        },
        method:'get'
      }).then(
        res=>{
          this.modifyUserForm=res.data.data[0]
        }
      ).catch()
    },
    cancel(){
      this.dialogFormVisible = false
    },
    /* eslint-disable */ 
    confirm(){
      this.$axios
          .post("modifyUserInfo", { 
            usernameNew:this.modifyUserForm.username,
            passwordNew:this.modifyUserForm.password,
            usernameOld:sessionStorage.getItem('username')
          })
          .then((res) => {
            // this.modifyUserForm = res.data.data
            sessionStorage.setItem('username',this.modifyUserForm.username)
            alert(res.data.msg)  
            this.dialogFormVisible = false
          })
          .catch()
    },

    handleCommand(command) {
      if (command === "登出") {
        localStorage.clear();
        this.$router.replace({
          path: "/",
        });
      }
      if (command === "修改信息") {
        this.dialogFormVisible = true
        this.initModifyUserForm()
      }
    },
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
