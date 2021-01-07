<template>
  <el-card class="box-card">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <el-form-item>
        <el-select
          style="width:200px"
          v-model="versionOfSelect"
          filterable
          multiple
          :placeholder="$t('Query Info')"
          @change="changeMethod"
        >
          <el-option
            v-for="item in versions"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="user_name" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="menu_name" label="菜单名" width="180">
      </el-table-column>
      <el-table-column prop="parent_id" label="上级菜单名"> </el-table-column>
      <el-table-column prop="path" label="路由" width="180"> </el-table-column>
      <el-table-column prop="icon" label="图标" width="180"> </el-table-column>
      <el-table-column prop="order" label="顺序"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-if="dialogVisible" title="修改" :visible.sync="dialogVisible">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="年龄"
          prop="age"
          :rules="[
            { required: true, message: '年龄不能为空' },
            { type: 'number', message: '年龄必须为数字值' },
          ]"
        >
          <el-input
            type="age"
            v-model.number="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          user_name: "will",
          menu_name: "用户管理",
          parent_id: "1",
          path: "",
          icon: "",
          order: "",
        },
      ],
      versions: [
        {
          id: "1",
          label: "will",
          value: "will",
        },
      ],
      dialogVisible: false,
      numberValidateForm: {
        age: "",
      },
    };
  },
  methods: {
    handleEdit() {
      this.dialogVisible = true;
    },
    handleDelete() {},
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style></style>
