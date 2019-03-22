<template>
  <section>
      <el-form ref="form" :model="intentForm" label-width="80px" size="mini">
        <el-form-item label="意图名称">
          <el-input v-model="intentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="英文别名">
          <el-input v-model="intentForm.ename"></el-input>
        </el-form-item>
        <el-form-item label="意图描述">
          <el-input type="textarea" :rows="4" v-model="intentForm.description"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="onDelete">取消</el-button>
        </el-form-item>
      </el-form>
  </section>
</template>

<script>
import axios from 'axios'
import data from '@/assets/intent.json'
  export default {
    data() {
      return {
        intentForm: {
          name: '',
          ename: ''
        }
      };
    },
    // mounted(){
    //   console.log(data)
    // },
    methods: {
      onSubmit() {
        this.$http.get('apis/test').then(response => {
             alert(response.data);
        }, response => {
            console.log("error");
        });
        alert("立即创建");
        console.log('submit!');
      },
      onDelete() {
        this.intentForm.name = '';
        this.intentForm.ename = '';
        alert("取消");
      }
    }
  };
</script>