<template>
  <div>
    <el-input :placeholder="$t('loading')" clearable></el-input>
    <el-button @click="change_CN"></el-button>
    <el-button @click="change_TW"></el-button>
    <el-button @click="change_US"></el-button>
  </div>
</template>

<script>
export default {
  methods:{
    data(){
      return{
        change: false
      }
      
    },
    change_CN(){
      this.$i18n.locale ='zh-CN'
    },
    change_TW(){
      this.$i18n.locale ='zh-TW'
    },
    change_US(){
      this.$i18n.locale ='en-US'
    }
  }

}
</script>

<style>

</style>